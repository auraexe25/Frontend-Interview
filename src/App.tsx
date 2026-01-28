import { useState } from 'react';
import Header from '@/components/Header';
import BlogList from '@/components/BlogList';
import BlogDetail from '@/components/BlogDetail';
import CreateBlogForm from '@/components/CreateBlogForm';
import './App.css';

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-3">CA Monk Blog</h1>
          <p className="text-muted-foreground text-lg">
            Stay updated with the latest trends in finance, accounting, and career growth
          </p>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Blog List */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-4 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Latest Articles</h2>
              </div>
              <CreateBlogForm />
              <div className="overflow-y-auto max-h-[calc(100vh-300px)] pr-2">
                <BlogList
                  onSelectBlog={setSelectedBlogId}
                  selectedBlogId={selectedBlogId}
                />
              </div>
            </div>
          </div>

          {/* Right Content - Blog Detail */}
          <div className="lg:col-span-8 xl:col-span-9">
            <BlogDetail blogId={selectedBlogId} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-sm">CM</span>
                </div>
                <span className="font-bold text-lg">CA MONK</span>
              </div>
              <p className="text-sm text-gray-400">
                Empowering the next generation of financial leaders with tools, community, and knowledge.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">RESOURCES</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">PLATFORM</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Job Board</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Practice Tests</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentorship</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">CONNECT</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2026 CA Monk. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
