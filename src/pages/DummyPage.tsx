import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Home, LayoutDashboard, BookOpen, TrendingUp, Settings, Bell, Grid } from 'lucide-react';

const iconMap = {
  Home: <Home className="w-5 h-5 text-white" />,
  Dashboard: <LayoutDashboard className="w-5 h-5 text-white" />,
  Projects: <BookOpen className="w-5 h-5 text-white" />,
  Reports: <TrendingUp className="w-5 h-5 text-white" />,
  Settings: <Settings className="w-5 h-5 text-white" />,
  Help: <Bell className="w-5 h-5 text-white" />,
  Apps: <Grid className="w-5 h-5 text-white" />,
};

const onlineContentMap = {
  Home: (
    <div className="space-y-6">
      <ul className="text-white/80 text-base space-y-2">
        <li>Welcome to your dashboard! Here you can access all your main features.</li>
        <li>Tip: Use the left menu to navigate between sections.</li>
        <li>Check out the latest updates in your projects and reports.</li>
        <li>Recent Activity: <span className="text-green-300">You completed 3 tasks today!</span></li>
        <li>Popular Link: <a href="https://www.producthunt.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">Product Hunt</a></li>
      </ul>
      <div className="bg-white/5 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2">Quick Links</h3>
        <ul className="text-white/70 space-y-1">
          <li><a href="https://calendar.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Calendar</a></li>
          <li><a href="https://drive.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Drive</a></li>
          <li><a href="https://slack.com/" target="_blank" rel="noopener noreferrer" className="underline">Slack</a></li>
        </ul>
      </div>
    </div>
  ),
  Dashboard: (
    <div className="space-y-6">
      <ul className="text-white/80 text-base space-y-2">
        <li>Latest News: <a href="https://news.ycombinator.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">Hacker News</a></li>
        <li>Quick Stats: 5 new tasks, 2 meetings today, 1 report due.</li>
        <li>Tip: Review your dashboard every morning for updates.</li>
        <li>Upcoming Event: <span className="text-yellow-300">Team Standup at 10:00 AM</span></li>
        <li>Popular Tool: <a href="https://trello.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">Trello</a></li>
      </ul>
      <div className="bg-white/5 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2">Pinned Reports</h3>
        <ul className="text-white/70 space-y-1">
          <li>Q2 Sales Analysis</li>
          <li>Customer Feedback Summary</li>
          <li>Weekly Progress Chart</li>
        </ul>
      </div>
    </div>
  ),
  Projects: (
    <div className="space-y-6">
      <ul className="text-white/80 text-base space-y-2">
        <li>Project Alpha: Design phase completed.</li>
        <li>Project Beta: Development in progress.</li>
        <li>Project Gamma: Review scheduled for next week.</li>
        <li>Project Delta: <span className="text-green-300">Launched!</span></li>
        <li>See more at <a href="https://github.com/trending" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">GitHub Trending</a></li>
      </ul>
      <div className="bg-white/5 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2">Team Members</h3>
        <ul className="text-white/70 space-y-1">
          <li>Alice (Lead Designer)</li>
          <li>Bob (Frontend Dev)</li>
          <li>Charlie (Backend Dev)</li>
          <li>Dana (QA)</li>
        </ul>
      </div>
    </div>
  ),
  Reports: (
    <div className="space-y-6">
      <ul className="text-white/80 text-base space-y-2">
        <li>Monthly Sales Report: <span className="text-green-400">+12%</span> growth</li>
        <li>Customer Feedback: 4.8/5 average rating</li>
        <li>Quarterly Review: <span className="text-yellow-300">Due next week</span></li>
        <li>See analytics at <a href="https://datastudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">Google Data Studio</a></li>
      </ul>
      <div className="bg-white/5 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2">Recent Reports</h3>
        <ul className="text-white/70 space-y-1">
          <li>Annual Financial Overview</li>
          <li>Customer Satisfaction Survey</li>
          <li>Employee Engagement Results</li>
        </ul>
      </div>
    </div>
  ),
  Settings: (
    <div className="space-y-6">
      <ul className="text-white/80 text-base space-y-2">
        <li>Profile: Update your information and preferences.</li>
        <li>Security: Change your password regularly.</li>
        <li>Integrations: Connect with Slack, GitHub, and more.</li>
        <li>Notifications: <span className="text-blue-300">Enabled</span></li>
        <li>Theme: <span className="text-yellow-300">Dark Mode</span></li>
      </ul>
      <div className="bg-white/5 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2">Account Actions</h3>
        <ul className="text-white/70 space-y-1">
          <li>Change Email</li>
          <li>Manage Devices</li>
          <li>Delete Account</li>
        </ul>
      </div>
    </div>
  ),
  Help: (
    <div className="space-y-6">
      <ul className="text-white/80 text-base space-y-2">
        <li>Need assistance? Visit our <a href="https://support.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">Help Center</a>.</li>
        <li>Contact support: support@example.com</li>
        <li>FAQ: Find answers to common questions.</li>
        <li>Community Forum: <a href="https://stackoverflow.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">Stack Overflow</a></li>
        <li>Live Chat: <span className="text-green-300">Available 24/7</span></li>
      </ul>
      <div className="bg-white/5 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2">Popular Topics</h3>
        <ul className="text-white/70 space-y-1">
          <li>Reset Password</li>
          <li>API Documentation</li>
          <li>Billing & Invoices</li>
        </ul>
      </div>
    </div>
  ),
  Apps: (
    <div className="space-y-6">
      <ul className="text-white/80 text-base space-y-2">
        <li>Explore productivity apps: <a href="https://zapier.com/apps/" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">Zapier Apps</a></li>
        <li>Connect your favorite tools for seamless workflow.</li>
        <li>Tip: Use integrations to automate your tasks.</li>
        <li>Featured App: <a href="https://www.notion.so/" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">Notion</a></li>
        <li>App Marketplace: <a href="https://workspace.google.com/marketplace" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">Google Workspace Marketplace</a></li>
      </ul>
      <div className="bg-white/5 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2">Recommended Integrations</h3>
        <ul className="text-white/70 space-y-1">
          <li>Slack</li>
          <li>Google Drive</li>
          <li>Asana</li>
          <li>Jira</li>
        </ul>
      </div>
    </div>
  ),
};

const DummyPage = ({ title, onHome }) => {
  const icon = iconMap[title] || <Home className="w-5 h-5 text-white" />;
  const content = onlineContentMap[title] || onlineContentMap['Home'];
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 max-w-4xl w-full min-h-[500px] mx-auto">
        <CardHeader className="mb-2 pb-0">
          <div className="flex items-center gap-1">
            <span className="w-7 h-7 text-white flex items-center justify-center leading-none">{icon}</span>
            <h2 className="text-2xl font-semibold text-white mb-0 pb-0 flex items-center leading-none">{title}</h2>
          </div>
        </CardHeader>
        <CardContent className="py-8">
          {content}
        </CardContent>
      </Card>
    </div>
  );
};

export default DummyPage; 