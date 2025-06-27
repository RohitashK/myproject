
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Book, 
  Rocket, 
  Settings, 
  Code, 
  Users, 
  HelpCircle,
  FileText,
  Zap,
  Shield,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WikiSidebarProps {
  selectedPage: string;
  onSelectPage: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    category: 'Getting Started',
    items: [
      { id: 'getting-started', title: 'Welcome', icon: Rocket },
      { id: 'quick-start', title: 'Quick Start Guide', icon: Zap },
      { id: 'installation', title: 'Installation', icon: Code },
    ]
  },
  {
    category: 'User Guide',
    items: [
      { id: 'user-management', title: 'User Management', icon: Users },
      { id: 'permissions', title: 'Permissions', icon: Shield },
      { id: 'settings', title: 'Settings', icon: Settings },
    ]
  },
  {
    category: 'Documentation',
    items: [
      { id: 'api-reference', title: 'API Reference', icon: Book },
      { id: 'tutorials', title: 'Tutorials', icon: FileText },
      { id: 'faq', title: 'FAQ', icon: HelpCircle },
    ]
  }
];

export const WikiSidebar: React.FC<WikiSidebarProps> = ({
  selectedPage,
  onSelectPage,
  isOpen,
  onClose
}) => {
  return (
    <>
      <aside className={cn(
        "fixed top-0 left-0 z-50 w-64 h-full bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Knowledge Base</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-6">
            {menuItems.map((section) => (
              <div key={section.category}>
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {section.category}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => {
                            onSelectPage(item.id);
                            onClose();
                          }}
                          className={cn(
                            "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                            selectedPage === item.id
                              ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                          )}
                        >
                          <Icon className="mr-3 h-4 w-4" />
                          {item.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
};
