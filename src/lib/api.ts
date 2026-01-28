import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Blog, CreateBlogInput } from '@/types/blog';

const API_URL = 'http://localhost:3001';

export const useBlogs = () => {
  return useQuery<Blog[]>({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/blogs`);
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      return response.json();
    },
  });
};

export const useBlog = (id: string | null) => {
  return useQuery<Blog>({
    queryKey: ['blog', id],
    queryFn: async () => {
      if (!id) throw new Error('Blog ID is required');
      const response = await fetch(`${API_URL}/blogs/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog');
      }
      return response.json();
    },
    enabled: !!id,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBlog: CreateBlogInput) => {
      const response = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });
      if (!response.ok) {
        throw new Error('Failed to create blog');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};
