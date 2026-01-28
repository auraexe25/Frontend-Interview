import { useBlog } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { calculateReadTime } from '@/lib/utils';

interface BlogDetailProps {
  blogId: string | null;
}

export default function BlogDetail({ blogId }: BlogDetailProps) {
  const { data: blog, isLoading, isError, error } = useBlog(blogId);

  if (!blogId) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-50 rounded-lg">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="mt-4 text-muted-foreground">Select an article to read</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Card className="overflow-hidden animate-pulse">
        <div className="w-full h-80 bg-gray-200"></div>
        <div className="p-8">
          <div className="h-4 bg-gray-200 rounded w-20 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="flex gap-4 mb-6">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-red-50 rounded-lg">
        <div className="text-center text-red-600">
          <p className="font-medium">Error loading blog</p>
          <p className="text-sm mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-50 rounded-lg">
        <p className="text-muted-foreground">Blog not found</p>
      </div>
    );
  }

  const readTime = calculateReadTime(blog.content);

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-96 bg-gray-900 overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      {/* Content */}
      <div className="px-8 py-8 max-w-4xl">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-semibold rounded bg-primary/10 text-primary uppercase tracking-wide">
            {blog.category[0]}
          </span>
          <span className="text-sm text-muted-foreground">{readTime} min read</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-foreground mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Share Button */}
        <div className="mb-8">
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share Article
          </Button>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Category</p>
            <p className="text-sm font-medium">{blog.category.join(' & ')}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Read Time</p>
            <p className="text-sm font-medium">{readTime} Mins</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Date</p>
            <p className="text-sm font-medium">
              {new Date(blog.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {blog.content.split('\n\n').map((paragraph, index) => {
            // Check if paragraph is a heading (starts with specific patterns)
            if (paragraph.trim().length < 50 && !paragraph.includes('.')) {
              return (
                <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">
                  {paragraph}
                </h2>
              );
            }
            
            // Check for quote-like content
            if (paragraph.trim().startsWith('"') || paragraph.includes('accountant of the future')) {
              return (
                <div key={index} className="my-6 pl-4 border-l-4 border-primary bg-primary/5 py-4 px-6 italic">
                  <p className="text-foreground">{paragraph}</p>
                </div>
              );
            }

            // Check for bullet points
            if (paragraph.includes('Strategic') || paragraph.includes('Risk') || paragraph.includes('Advisory')) {
              const items = paragraph.split('\n').filter(item => item.trim());
              return (
                <ul key={index} className="my-6 space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="text-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{item.replace(/^[•\-]\s*/, '')}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={index} className="text-foreground leading-relaxed mb-6">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Author Section */}
        <div className="mt-12 pt-8 border-t flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-semibold">AM</span>
            </div>
            <div>
              <p className="font-semibold text-foreground">Written by Arjun Mehta</p>
              <p className="text-sm text-muted-foreground">Senior Financial Analyst</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
            </Button>
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
