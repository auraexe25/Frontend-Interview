import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CreateBlogInput } from '@/types/blog';

const API_URL = 'http://localhost:3001';

export default function CreateBlogForm() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CreateBlogInput>({
    title: '',
    category: [],
    description: '',
    coverImage: '',
    content: '',
  });
  const [categoryInput, setCategoryInput] = useState('');

  const queryClient = useQueryClient();

  const createBlogMutation = useMutation({
    mutationFn: async (newBlog: CreateBlogInput) => {
      const response = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newBlog,
          date: new Date().toISOString(),
          id: Date.now().toString(),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create blog');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setOpen(false);
      resetForm();
    },
  });

  const resetForm = () => {
    setFormData({
      title: '',
      category: [],
      description: '',
      coverImage: '',
      content: '',
    });
    setCategoryInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.content) {
      alert('Please fill in all required fields');
      return;
    }
    createBlogMutation.mutate(formData);
  };

  const addCategory = () => {
    if (categoryInput.trim() && !formData.category.includes(categoryInput.trim().toUpperCase())) {
      setFormData({
        ...formData,
        category: [...formData.category, categoryInput.trim().toUpperCase()],
      });
      setCategoryInput('');
    }
  };

  const removeCategory = (cat: string) => {
    setFormData({
      ...formData,
      category: formData.category.filter((c) => c !== cat),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Create New Blog</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Blog Post</DialogTitle>
          <DialogDescription>Fill in the details to create a new blog post.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Categories</Label>
            <div className="flex gap-2">
              <Input
                id="category"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                placeholder="Add category (e.g., TECH, FINANCE)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCategory();
                  }
                }}
              />
              <Button type="button" onClick={addCategory} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.category.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium flex items-center gap-1"
                >
                  {cat}
                  <button
                    type="button"
                    onClick={() => removeCategory(cat)}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the blog"
              required
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="https://example.com/image.jpg"
              type="url"
            />
          </div>

          <div>
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your blog content here..."
              required
              rows={8}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createBlogMutation.isPending}>
              {createBlogMutation.isPending ? 'Creating...' : 'Create Blog'}
            </Button>
          </div>

          {createBlogMutation.isError && (
            <p className="text-sm text-red-500">
              Error: {createBlogMutation.error.message}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
