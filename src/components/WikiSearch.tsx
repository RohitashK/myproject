
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface WikiSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const WikiSearch: React.FC<WikiSearchProps> = ({
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="relative max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder="Search documentation..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
};
