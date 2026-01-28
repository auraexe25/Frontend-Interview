import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CM</span>
            </div>
            <span className="font-bold text-lg">CA MONK</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Tools
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Practice
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Events
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Job Board
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Points
            </a>
          </nav>

          {/* Profile Button */}
          <Button className="bg-primary hover:bg-primary/90">Profile</Button>
        </div>
      </div>
    </header>
  );
}
