
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  User, 
  Star, 
  ArrowRight, 
  CheckCircle,
  Code2,
  Download,
  ExternalLink
} from 'lucide-react';

interface WikiContentProps {
  selectedPage: string;
  searchQuery: string;
}

const pageContent = {
  'getting-started': {
    title: 'Welcome to the Knowledge Base',
    lastUpdated: '2024-06-20',
    author: 'Admin Team',
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Get Started in Minutes</h2>
          <p className="text-gray-700 mb-4">
            Welcome to our comprehensive knowledge base! This platform contains everything you need to get up and running quickly.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Beginner Friendly</Badge>
            <Badge variant="secondary">Comprehensive</Badge>
            <Badge variant="secondary">Always Updated</Badge>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                Quick Setup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">Get your environment ready in under 5 minutes.</p>
              <Button variant="outline" size="sm">
                View Guide <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code2 className="mr-2 h-5 w-5 text-blue-600" />
                Code Examples
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">Ready-to-use code snippets and examples.</p>
              <Button variant="outline" size="sm">
                Browse Examples <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">What you'll learn</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              How to set up your development environment
            </li>
            <li className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              Core concepts and best practices
            </li>
            <li className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              Advanced configuration options
            </li>
            <li className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              Troubleshooting common issues
            </li>
          </ul>
        </div>
      </div>
    )
  },
  'quick-start': {
    title: 'Quick Start Guide',
    lastUpdated: '2024-06-19',
    author: 'Development Team',
    content: (
      <div className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            ⚡ This guide will have you up and running in less than 10 minutes!
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Step 1: Installation</h3>
          <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
            npm install @your-package/cli<br />
            # or<br />
            yarn add @your-package/cli
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Step 2: Initialize Project</h3>
          <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
            npx your-package init my-project<br />
            cd my-project
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Step 3: Start Development</h3>
          <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
            npm run dev
          </div>
          <p className="text-gray-600">
            Your application will be available at <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3000</code>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>🎉 Congratulations!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              You've successfully set up your development environment. Check out the tutorials section for more advanced topics.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  },
  'installation': {
    title: 'Installation Guide',
    lastUpdated: '2024-06-18',
    author: 'Technical Writers',
    content: (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">System Requirements</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <ul className="space-y-2 text-gray-700">
            <li>• Node.js 16.0 or higher</li>
            <li>• npm 7.0 or higher (or yarn 1.22+)</li>
            <li>• 4GB RAM minimum</li>
            <li>• 10GB free disk space</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900">Installation Methods</h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="mr-2 h-5 w-5" />
                NPM Installation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded p-3 text-green-400 font-mono text-sm mb-3">
                npm install -g @your-package/cli
              </div>
              <p className="text-sm text-gray-600">Recommended for most users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ExternalLink className="mr-2 h-5 w-5" />
                Direct Download
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="mb-3">
                Download Binary
              </Button>
              <p className="text-sm text-gray-600">For systems without Node.js</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
  'user-management': {
    title: 'User Management',
    lastUpdated: '2024-06-17',
    author: 'Admin Team',
    content: (
      <div className="space-y-6">
        <p className="text-gray-700">
          Learn how to manage users, roles, and permissions in your application.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>User Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">Admin</span>
                <Badge>Full Access</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">Editor</span>
                <Badge variant="secondary">Read/Write</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">Viewer</span>
                <Badge variant="outline">Read Only</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
  'permissions': {
    title: 'Permissions System',
    lastUpdated: '2024-06-16',
    author: 'Security Team',
    content: (
      <div className="space-y-6">
        <p className="text-gray-700">
          Understand how the permission system works and how to configure access controls.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">🔒 Security First</h4>
          <p className="text-blue-800">
            Our permission system follows the principle of least privilege, ensuring users only have access to what they need.
          </p>
        </div>
      </div>
    )
  },
  'settings': {
    title: 'Application Settings',
    lastUpdated: '2024-06-15',
    author: 'Config Team',
    content: (
      <div className="space-y-6">
        <p className="text-gray-700">
          Configure your application settings for optimal performance and user experience.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
              DATABASE_URL=postgresql://...<br />
              API_KEY=your_api_key_here<br />
              PORT=3000
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
  'api-reference': {
    title: 'API Reference',
    lastUpdated: '2024-06-14',
    author: 'API Team',
    content: (
      <div className="space-y-6">
        <p className="text-gray-700">
          Complete API documentation with examples and response formats.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
              curl -H "Authorization: Bearer YOUR_TOKEN" \<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://api.example.com/v1/users
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
  'tutorials': {
    title: 'Tutorials',
    lastUpdated: '2024-06-13',
    author: 'Education Team',
    content: (
      <div className="space-y-6">
        <p className="text-gray-700">
          Step-by-step tutorials to help you master the platform.
        </p>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Building Your First App</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-3">30 min tutorial</p>
              <Button size="sm">Start Tutorial</Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Advanced Configurations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-3">45 min tutorial</p>
              <Button size="sm">Start Tutorial</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
  'faq': {
    title: 'Frequently Asked Questions',
    lastUpdated: '2024-06-12',
    author: 'Support Team',
    content: (
      <div className="space-y-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How do I reset my password?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                You can reset your password by clicking the "Forgot Password" link on the login page and following the instructions sent to your email.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What browsers are supported?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We support the latest versions of Chrome, Firefox, Safari, and Edge. Internet Explorer is not supported.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How do I contact support?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                You can reach our support team at support@example.com or through the chat widget in the bottom-right corner.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
};

export const WikiContent: React.FC<WikiContentProps> = ({
  selectedPage,
  searchQuery
}) => {
  const page = pageContent[selectedPage as keyof typeof pageContent];
  
  if (!page) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page not found</h2>
        <p className="text-gray-600">The page you're looking for doesn't exist.</p>
      </div>
    );
  }

  // Simple search functionality
  const isSearching = searchQuery.length > 0;
  const pageMatches = isSearching ? 
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;

  if (isSearching && !pageMatches) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">No results found</h2>
        <p className="text-gray-600">Try adjusting your search terms.</p>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <header className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{page.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            Updated {page.lastUpdated}
          </div>
          <div className="flex items-center">
            <User className="mr-1 h-4 w-4" />
            {page.author}
          </div>
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 text-yellow-500" />
            4.8/5
          </div>
        </div>
      </header>
      
      <div className="px-6 py-6">
        {page.content}
      </div>
    </article>
  );
};
