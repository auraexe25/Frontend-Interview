import { useBlogs } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Blog } from '@/types/blog';
import { formatDate } from '@/lib/utils';

interface BlogListProps {
  onSelectBlog: (blogId: string) => void;
  selectedBlogId: string | null;
}

export default function BlogList({ onSelectBlog, selectedBlogId }: BlogListProps) {
  const { data: blogs, isLoading, isError, error } = useBlogs();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse border-l-4 border-l-transparent">
            <CardHeader className="pb-3">
              <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-16 mt-1"></div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-6 bg-gray-200 rounded w-16 mt-3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 p-4 text-sm">
        <p>Error loading blogs: {error.message}</p>
      </div>
    );
  }

  // Mark first blog as featured for demo
  const blogsWithFeatured = blogs?.map((blog, index) => ({
    ...blog,
    featured: index === 0,
  }));

  return (
    <div className="space-y-4">
      {blogsWithFeatured?.map((blog: Blog & { featured?: boolean }) => (
        <Card
          key={blog.id}
          className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${
            selectedBlogId === blog.id
              ? 'border-l-primary bg-primary/5'
              : 'border-l-transparent hover:border-l-primary/50'
          }`}
          onClick={() => onSelectBlog(blog.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium flex items-center gap-1">
                {blog.category[0] && (
                  <>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    {blog.category[0]}
                  </>
                )}
              </span>
              <span className="text-xs text-muted-foreground">{formatDate(blog.date)}</span>
            </div>
            <CardTitle className="text-base font-semibold leading-tight hover:text-primary transition-colors">
              {blog.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {blog.description}
            </p>
            {blog.featured && (
              <span className="inline-block px-2 py-1 text-xs rounded bg-primary/10 text-primary font-medium">
                Featured
              </span>
            )}
            {!blog.featured && blog.category[1] && (
              <span className="inline-block px-2 py-1 text-xs rounded bg-muted text-muted-foreground">
                {blog.category[1]}
              </span>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
