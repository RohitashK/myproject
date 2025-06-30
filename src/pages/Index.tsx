import { useState, useEffect, useRef } from 'react';
import { Search, Bell, Settings, Share2, BookOpen, Users, TrendingUp, Calendar, Plus, ThumbsUp, MessageCircle, User, ChevronDown, Eye, Edit, Trash2, Menu, Circle, X, Home, Grid, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faThumbsUp, faUsers, faChartLine, faCalendarAlt, faCog, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import DummyPage from './DummyPage';

const Index = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileAppsOpen, setMobileAppsOpen] = useState(false);

  const tabOrder = ['feed', 'kudos', 'people', 'revenue', 'work', 'plan'];
  const [disableAnimation, setDisableAnimation] = useState(false);
  const [isAutoLooping, setIsAutoLooping] = useState(true);
  const autoLoopRef = useRef<NodeJS.Timeout | null>(null);

  const [isKudosDialogOpen, setIsKudosDialogOpen] = useState(false);
  const [kudosName, setKudosName] = useState('');
  const [kudosComment, setKudosComment] = useState('');
  const [kudosData] = useState([
    {
      id: 1,
      author: "Riya Mehra",
      recognizers: ["Suresh Kumar"],
      avatar: "/profile.png",
      date: "2025-05-29",
      kudos: 8,
      content: "Amazing work on the new feature implementation! Your attention to detail and problem-solving skills really made a difference.",
      likes: 45,
      comments: 3,
      recipients: ["Amit Sharma", "Priya Singh", "Rahul Verma"]
    },
    {
      id: 2,
      author: "Vikas Patel",
      recognizers: ["Neha Joshi"],
      avatar: "/profile.png",
      date: "2025-05-28",
      kudos: 5,
      content: "Outstanding presentation skills during the client meeting. You handled all the questions with confidence!",
      likes: 32,
      comments: 2
    },
    {
      id: 3,
      author: "Sneha Rao",
      recognizers: ["Manish Gupta"],
      avatar: "/profile.png",
      date: "2025-05-26",
      kudos: 6,
      content: "Thank you for going above and beyond to help the team meet the deadline. Your dedication is truly appreciated!",
      likes: 38,
      comments: 4,
      recipients: ["Karan Singh", "Pooja Nair", "Deepak Chawla"]
    }
  ]);
  const [kudosList, setKudosList] = useState(kudosData);

  const sitesMenuData = {
    expo: [
      { name: "Expo", url: "https://expo.dev" },
      { name: "ChatGPT", url: "https://chat.openai.com" },
      { name: "Claude", url: "https://claude.ai" },
      { name: "Gemini", url: "https://gemini.google.com" },
      { name: "Copilot", url: "https://copilot.microsoft.com" },
      { name: "Midjourney", url: "https://www.midjourney.com" },
      { name: "DALL-E", url: "https://openai.com/dall-e-2" },
      { name: "Stable Diffusion", url: "https://stability.ai" }
    ],
    client: [
      { name: "Client", url: "#" },
      { name: "Salesforce Einstein", url: "https://www.salesforce.com/products/einstein/" },
      { name: "HubSpot AI", url: "https://www.hubspot.com/products/ai" },
      { name: "Zoho CRM", url: "https://www.zoho.com/crm/" },
      { name: "Pipedrive", url: "https://www.pipedrive.com" },
      { name: "Freshsales", url: "https://www.freshworks.com/crm/" },
      { name: "Sales Navigator", url: "https://business.linkedin.com/sales-solutions/sales-navigator" }
    ],
    finance: [
      { name: "Finance", url: "#" },
      { name: "Plaid", url: "https://plaid.com" },
      { name: "Stripe", url: "https://stripe.com" },
      { name: "QuickBooks AI", url: "https://quickbooks.intuit.com" },
      { name: "Xero", url: "https://www.xero.com" },
      { name: "FreshBooks", url: "https://www.freshbooks.com" },
      { name: "Wave", url: "https://www.waveapps.com" }
    ],
    collaboration: [
      { name: "Collaboration", url: "#" },
      { name: "Notion AI", url: "https://www.notion.so" },
      { name: "Miro AI", url: "https://miro.com" },
      { name: "Figma AI", url: "https://www.figma.com" },
      { name: "Slack AI", url: "https://slack.com" },
      { name: "Microsoft Teams", url: "https://www.microsoft.com/en-us/microsoft-teams" },
      { name: "Zoom AI", url: "https://zoom.us" }
    ],
    office: [
      { name: "Office", url: "#" },
      { name: "Microsoft 365 Copilot", url: "https://www.microsoft.com/en-us/microsoft-365/copilot" },
      { name: "Google Workspace AI", url: "https://workspace.google.com" },
      { name: "Grammarly", url: "https://www.grammarly.com" },
      { name: "Jasper", url: "https://www.jasper.ai" },
      { name: "Copy.ai", url: "https://www.copy.ai" },
      { name: "Writesonic", url: "https://writesonic.com" }
    ],
    people: [
      { name: "People", url: "#" },
      { name: "BambooHR", url: "https://www.bamboohr.com" },
      { name: "Workday", url: "https://www.workday.com" },
      { name: "Greenhouse", url: "https://www.greenhouse.io" },
      { name: "Lever", url: "https://www.lever.co" },
      { name: "SmartRecruiters", url: "https://www.smartrecruiters.com" },
      { name: "iCIMS", url: "https://www.icims.com" }
    ],
    it: [
      { name: "IT", url: "#" },
      { name: "Okta", url: "https://www.okta.com" },
      { name: "1Password", url: "https://1password.com" },
      { name: "LastPass", url: "https://www.lastpass.com" },
      { name: "Dashlane", url: "https://www.dashlane.com" },
      { name: "NordVPN", url: "https://nordvpn.com" },
      { name: "ExpressVPN", url: "https://www.expressvpn.com" },
      { name: "CrowdStrike", url: "https://www.crowdstrike.com" }
    ],
    dev: [
      { name: "Dev", url: "#" },
      { name: "GitHub Copilot", url: "https://github.com/features/copilot" },
      { name: "Tabnine", url: "https://www.tabnine.com" },
      { name: "CodeWhisperer", url: "https://aws.amazon.com/codewhisperer/" },
      { name: "Replit", url: "https://replit.com" },
      { name: "Cursor", url: "https://cursor.sh" },
      { name: "Codeium", url: "https://codeium.com" }
    ],
    devices: [
      { name: "Devices", url: "#" },
      { name: "Laptop Windows", url: "https://www.microsoft.com/en-us/windows" },
      { name: "Laptop macOS", url: "https://www.apple.com/macos/" },
      { name: "iPhone", url: "https://www.apple.com/iphone/" },
      { name: "Android", url: "https://www.android.com" },
      { name: "iPad", url: "https://www.apple.com/ipad/" },
      { name: "Surface", url: "https://www.microsoft.com/en-us/surface" }
    ]
  };

  const appsMenuData = {
    expo: [
      { name: "Expo", url: "https://expo.dev" },
      { name: "ChatGPT", url: "https://chat.openai.com" },
      { name: "Claude", url: "https://claude.ai" },
      { name: "Gemini", url: "https://gemini.google.com" },
      { name: "Copilot", url: "https://copilot.microsoft.com" },
      { name: "Midjourney", url: "https://www.midjourney.com" },
      { name: "DALL-E", url: "https://openai.com/dall-e-2" },
      { name: "Stable Diffusion", url: "https://stability.ai" }
    ],
    client: [
      { name: "Client", url: "#" },
      { name: "Salesforce Einstein", url: "https://www.salesforce.com/products/einstein/" },
      { name: "HubSpot AI", url: "https://www.hubspot.com/products/ai" },
      { name: "Zoho CRM", url: "https://www.zoho.com/crm/" },
      { name: "Pipedrive", url: "https://www.pipedrive.com" },
      { name: "Freshsales", url: "https://www.freshworks.com/crm/" },
      { name: "Sales Navigator", url: "https://business.linkedin.com/sales-solutions/sales-navigator" }
    ],
    finance: [
      { name: "Finance", url: "#" },
      { name: "Plaid", url: "https://plaid.com" },
      { name: "Stripe", url: "https://stripe.com" },
      { name: "QuickBooks AI", url: "https://quickbooks.intuit.com" },
      { name: "Xero", url: "https://www.xero.com" },
      { name: "FreshBooks", url: "https://www.freshbooks.com" },
      { name: "Wave", url: "https://www.waveapps.com" }
    ],
    collaboration: [
      { name: "Collaboration", url: "#" },
      { name: "Notion AI", url: "https://www.notion.so" },
      { name: "Miro AI", url: "https://miro.com" },
      { name: "Figma AI", url: "https://www.figma.com" },
      { name: "Slack AI", url: "https://slack.com" },
      { name: "Microsoft Teams", url: "https://www.microsoft.com/en-us/microsoft-teams" },
      { name: "Zoom AI", url: "https://zoom.us" }
    ],
    office: [
      { name: "Office", url: "#" },
      { name: "Microsoft 365 Copilot", url: "https://www.microsoft.com/en-us/microsoft-365/copilot" },
      { name: "Google Workspace AI", url: "https://workspace.google.com" },
      { name: "Grammarly", url: "https://www.grammarly.com" },
      { name: "Jasper", url: "https://www.jasper.ai" },
      { name: "Copy.ai", url: "https://www.copy.ai" },
      { name: "Writesonic", url: "https://writesonic.com" }
    ],
    people: [
      { name: "People", url: "#" },
      { name: "BambooHR", url: "https://www.bamboohr.com" },
      { name: "Workday", url: "https://www.workday.com" },
      { name: "Greenhouse", url: "https://www.greenhouse.io" },
      { name: "Lever", url: "https://www.lever.co" },
      { name: "SmartRecruiters", url: "https://www.smartrecruiters.com" },
      { name: "iCIMS", url: "https://www.icims.com" }
    ],
    it: [
      { name: "IT", url: "#" },
      { name: "Okta", url: "https://www.okta.com" },
      { name: "1Password", url: "https://1password.com" },
      { name: "LastPass", url: "https://www.lastpass.com" },
      { name: "Dashlane", url: "https://www.dashlane.com" },
      { name: "NordVPN", url: "https://nordvpn.com" },
      { name: "ExpressVPN", url: "https://www.expressvpn.com" },
      { name: "CrowdStrike", url: "https://www.crowdstrike.com" }
    ],
    dev: [
      { name: "Dev", url: "#" },
      { name: "GitHub Copilot", url: "https://github.com/features/copilot" },
      { name: "Tabnine", url: "https://www.tabnine.com" },
      { name: "CodeWhisperer", url: "https://aws.amazon.com/codewhisperer/" },
      { name: "Replit", url: "https://replit.com" },
      { name: "Cursor", url: "https://cursor.sh" },
      { name: "Codeium", url: "https://codeium.com" }
    ],
    devices: [
      { name: "Devices", url: "#" },
      { name: "Laptop Windows", url: "https://www.microsoft.com/en-us/windows" },
      { name: "Laptop macOS", url: "https://www.apple.com/macos/" },
      { name: "iPhone", url: "https://www.apple.com/iphone/" },
      { name: "Android", url: "https://www.android.com" },
      { name: "iPad", url: "https://www.apple.com/ipad/" },
      { name: "Surface", url: "https://www.microsoft.com/en-us/surface" }
    ]
  };

  const feedData = [
    {
      id: 1,
      type: "revenue",
      title: "Weekly Team Update - June 2025",
      description: "Latest updates from our team members and project progress",
      date: "2025-06-03",
      likes: 42,
      comments: 5,
      icon: <TrendingUp className="w-5 h-5 text-white" />,
      starred: true
    },
    {
      id: 2,
      type: "meeting", 
      title: "Design System Workshop",
      description: "Join us for a deep dive into our new design system implementation",
      date: "2025-06-02",
      likes: 35,
      comments: 8,
      icon: <BookOpen className="w-5 h-5 text-white" />,
    },
    {
      id: 3,
      type: "announcement",
      title: "New Office Location",
      description: "We're excited to announce our new office space in downtown!",
      date: "2025-05-29",
      likes: 56,
      comments: 12,
      icon: <Users className="w-5 h-5 text-white" />,
      starred: true
    },
    {
      id: 4,
      type: "event",
      title: "Summer Team Building Event",
      description: "Save the date for our annual summer team building activities",
      date: "2025-05-22",
      likes: 78,
      comments: 15,
      icon: <Calendar className="w-5 h-5 text-white" />,
      starred: true
    }
  ];

  const peopleData = {
    workAnniversaries: [
      { name: "Amit Sharma", years: 5, date: "Jun 03", avatar: "/profile.png", likes: 42, comments: 8 },
      { name: "Priya Singh", years: 3, date: "Jun 06", avatar: "/profile.png", likes: 35, comments: 6 },
      { name: "Rahul Verma", years: 7, date: "Jun 04", avatar: "/profile.png", likes: 48, comments: 10 },
      { name: "Sneha Patel", years: 2, date: "Jun 09", avatar: "/profile.png", likes: 28, comments: 4 }
    ],
    birthdays: [
      { name: "Vikram Desai", date: "Jun 05", avatar: "/profile.png", likes: 32, comments: 5 },
      { name: "Ananya Iyer", date: "Jun 08", avatar: "/profile.png", likes: 29, comments: 3 },
      { name: "Rohan Mehra", date: "Jun 08", avatar: "/profile.png", likes: 25, comments: 2 },
      { name: "Meera Nair", date: "Jun 08", avatar: "/profile.png", likes: 27, comments: 4 }
    ],
    announcements: [
      { 
        title: "New Team Member - Saurabh Gupta", 
        description: "Welcome to our newest team member who will be joining the Design team!", 
        date: "2025-06-03", 
        likes: 45, 
        comments: 8,
        starred: true 
      },
      { 
        title: "Office Renovation Complete", 
        description: "Our newly renovated office space is now open for everyone!", 
        date: "2025-05-27", 
        likes: 56, 
        comments: 12,
        starred: true 
      }
    ]
  };

  const revenueData = [
    {
      category: "Design Projects",
      amount: "₹3.75 Cr",
      people: [
        { name: "Arjun Desai", company: "PixelCraft India", amount: "₹2.5 Cr", date: "2025-06-03" },
        { name: "Meera Kapoor", company: "Creative Minds Pvt Ltd", amount: "₹1.25 Cr", date: "2025-06-02" }
      ]
    },
    {
      category: "Development Services", 
      amount: "₹2.33 Cr",
      people: [
        { name: "Rohit Sinha", company: "TechNova Solutions", amount: "₹1.5 Cr", date: "2025-05-29" },
        { name: "Anjali Menon", company: "DevWorks India", amount: "₹83.3 L", date: "2025-05-29" }
      ]
    },
    {
      category: "Consulting", 
      amount: "₹1.46 Cr", 
      people: [
        { name: "Siddharth Jain", company: "ConsultPro India", amount: "₹1.46 Cr", date: "2025-05-29" }
      ]
    }
  ];

  const myWorkData = {
    recentlyWorkedOn: [
      { title: "UI/UX Design System Implementation", category: "Design", type: "Today" },
      { title: "Mobile App Development Sprint", category: "Development", type: "Last week" },
      { title: "Client Presentation Deck", category: "Marketing", type: "Older" },
      { title: "Team Training Workshop", category: "HR", type: "Older" },
      { title: "Product Roadmap Planning", category: "Strategy", type: "Older" },
      { title: "Annual Performance Review", category: "HR", type: "Older" }
    ],
    recentlyVisited: [
      { title: "Project Dashboard", category: "Development", type: "Today" },
      { title: "Design System Documentation", category: "Design", type: "Today" },
      { title: "Team Calendar", category: "Planning", type: "Today" },
      { title: "Client Meeting Notes", category: "Sales", type: "Today" },
      { title: "Code Review Guidelines", category: "Development", type: "Today" },
      { title: "Marketing Strategy Document", category: "Marketing", type: "Last week" }
    ],
    favourites: [
      "Project Timeline",
      "Design Resources", 
      "Team Guidelines",
      "Client Presentations",
      "Development Standards",
      "Marketing Templates"
    ]
  };

  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const [planDialogMode, setPlanDialogMode] = useState('add'); // 'add', 'edit', 'view'
  const [currentPlan, setCurrentPlan] = useState(null);
  const [weeklyPlans, setWeeklyPlans] = useState([
    { week: "2025-06-03 to 06-09", createdDate: "2025-06-03", status: "Published", owner: "Amit Sharma", description: "Completed sprint and planning for next week." },
    { week: "2025-05-27 to 06-02", createdDate: "2025-05-27", status: "Published", owner: "Priya Singh", description: "Reviewed quarterly goals and set new targets." }
  ]);

  const myPlanData = [
    { week: "2025-06-02 to 06-08", createdDate: "2025-06-03", status: "Published", owner: "Amit Sharma" },
    { week: "2025-05-26 to 06-01", createdDate: "2025-05-27", status: "Published", owner: "Priya Singh" },
    { week: "2025-05-19 to 05-25", createdDate: "2025-05-27", status: "Published", owner: "Rahul Verma" },
    { week: "2025-04-28 to 05-04", createdDate: "2025-04-28", status: "Published", owner: "Sneha Patel" },
    { week: "2025-04-21 to 04-27", createdDate: "2025-04-16", status: "Published", owner: "Vikram Desai" },
    { week: "2025-04-14 to 04-20", createdDate: "2025-04-16", status: "Published", owner: "Ananya Iyer" }
  ];

  const [planView, setPlanView] = useState('weekly'); // 'weekly' or 'quarterly'
  const [quarterlyPlans, setQuarterlyPlans] = useState([
    { quarter: 'Q2 2025', createdDate: '2025-04-01', status: 'Published', owner: 'Amit Sharma', description: 'Quarterly review and planning.' },
    { quarter: 'Q1 2025', createdDate: '2025-01-01', status: 'Published', owner: 'Priya Singh', description: 'Q1 goals and achievements.' }
  ]);
  const [quarterForm, setQuarterForm] = useState({
    quarter: '',
    createdDate: '',
    status: 'Published',
    owner: '',
    description: ''
  });
  const [quarterDialogOpen, setQuarterDialogOpen] = useState(false);
  const [quarterDialogMode, setQuarterDialogMode] = useState('add'); // 'add', 'edit', 'view'
  const [currentQuarterPlan, setCurrentQuarterPlan] = useState(null);
  const [quarterAlertMsg, setQuarterAlertMsg] = useState('');

  const [alertMsg, setAlertMsg] = useState('');
  const weekStartRef = useRef(null);

  // Restore planForm and setPlanForm for weekly logic
  const [planForm, setPlanForm] = useState({
    week: '',
    createdDate: '',
    status: 'Published',
    owner: '',
    description: ''
  });

  const [dummyPage, setDummyPage] = useState(null);

  // Helper to get Monday from a date
  const getMonday = (d) => {
    d = new Date(d);
    const day = d.getDay(), diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };
  const format = (d) => d.toISOString().slice(0, 10);

  // On week start change, update week range in form
  const handleWeekStartChange = (e) => {
    const start = new Date(e.target.value);
    const end = new Date(start.getTime() + 6 * 86400000);
    setPlanForm(f => ({
      ...f,
      week: `${format(start)} to ${format(end)}`
    }));
  };

  // In handleWeeklyButton, set createdDate to today
  const handleWeeklyButton = (e) => {
    // Prevent any default zoom behavior on mobile
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setPlanDialogMode('add');
    setCurrentPlan(null);
    setPlanForm({
      week: '',
      createdDate: format(new Date()),
      status: 'Published',
      owner: '',
      description: ''
    });
    setAlertMsg('');
    setPlanDialogOpen(true);
  };

  // Handle edit plan
  const handleEditPlan = (plan, index) => {
    setPlanDialogMode('edit');
    setCurrentPlan({ ...plan, index });
    setPlanForm({ ...plan });
    setAlertMsg('');
    setPlanDialogOpen(true);
  };

  // Handle view plan
  const handleViewPlan = (plan) => {
    setPlanDialogMode('view');
    setCurrentPlan({ ...plan });
    setPlanForm({ ...plan });
    setAlertMsg('');
    setPlanDialogOpen(true);
  };

  // Handle delete plan
  const handleDeletePlan = (index) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      setWeeklyPlans(plans => plans.filter((_, i) => i !== index));
    }
  };

  // Update handlePlanSubmit to handle both add and edit
  const handlePlanSubmit = (e) => {
    e.preventDefault();
    if (planDialogMode === 'add') {
      if (weeklyPlans.some(p => p.week === planForm.week)) {
        setAlertMsg('A plan for this week already exists!');
        return;
      }
      setWeeklyPlans(plans => [
        { ...planForm },
        ...plans
      ]);
    } else if (planDialogMode === 'edit' && currentPlan) {
      // Check for duplicates excluding the current plan being edited
      if (weeklyPlans.some((p, i) => i !== currentPlan.index && p.week === planForm.week)) {
        setAlertMsg('A plan for this week already exists!');
        return;
      }
      setWeeklyPlans(plans => plans.map((p, i) => i === currentPlan.index ? { ...planForm } : p));
    }
    setPlanDialogOpen(false);
  };

  useEffect(() => {
    if (mobileAppsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileAppsOpen]);

  useEffect(() => {
    if (disableAnimation) {
      document.body.classList.add('no-animation');
      document.documentElement.classList.add('no-animation');
    } else {
      document.body.classList.remove('no-animation');
      document.documentElement.classList.remove('no-animation');
    }
  }, [disableAnimation]);

  useEffect(() => {
    if (isAutoLooping) {
      autoLoopRef.current = setInterval(() => {
        setActiveTab((prevTab) => {
          const currentIndex = tabOrder.indexOf(prevTab);
          const nextIndex = (currentIndex + 1) % tabOrder.length;
          return tabOrder[nextIndex];
        });
      }, 5000);
    }
    return () => {
      if (autoLoopRef.current) clearInterval(autoLoopRef.current);
    };
  }, [isAutoLooping]);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    setIsAutoLooping(false);
    setDisableAnimation(true);
  };

  // Open dialog and set form for add/edit/view
  const openPlanDialog = (mode, plan = null) => {
    setPlanDialogMode(mode);
    setCurrentPlan(plan);
    if (plan) {
      setPlanForm({
        week: plan.week || '',
        createdDate: plan.createdDate || '',
        status: plan.status || 'Published',
        owner: plan.owner || '',
        description: plan.description || ''
      });
    } else {
      setPlanForm({ week: '', createdDate: '', status: 'Published', owner: '', description: '' });
    }
    setPlanDialogOpen(true);
  };

  // Handle form field changes
  const handlePlanFormChange = (e) => {
    const { name, value } = e.target;
    setPlanForm(f => ({ ...f, [name]: value }));
  };

  // Helper to get previous, current, and next week data for dialog
  const getWeekSections = () => {
    const today = new Date();
    const prevMonday = new Date(getMonday(today)); prevMonday.setDate(prevMonday.getDate() - 7);
    const currMonday = getMonday(today);
    const nextMonday = new Date(getMonday(today)); nextMonday.setDate(nextMonday.getDate() + 7);
    const prevWeek = `${format(prevMonday)} to ${format(new Date(prevMonday.getTime() + 6 * 86400000))}`;
    const currWeek = `${format(currMonday)} to ${format(new Date(currMonday.getTime() + 6 * 86400000))}`;
    const nextWeek = `${format(nextMonday)} to ${format(new Date(nextMonday.getTime() + 6 * 86400000))}`;
    return { prevWeek, currWeek, nextWeek };
  };

  // Helper for quarter options
  const getQuarterOptions = () => {
    const year = new Date().getFullYear();
    const options = [];
    for (let y = year - 2; y <= year + 2; y++) {
      for (let q = 1; q <= 4; q++) {
        options.push({ label: `Q${q} ${y}`, value: `Q${q} ${y}` });
      }
    }
    return options.reverse();
  };

  const handleQuarterlyButton = (e) => {
    // Prevent any default zoom behavior on mobile
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setQuarterDialogMode('add');
    setCurrentQuarterPlan(null);
    setQuarterForm({
      quarter: '',
      createdDate: new Date().toISOString().slice(0, 10),
      status: 'Published',
      owner: '',
      description: ''
    });
    setQuarterAlertMsg('');
    setQuarterDialogOpen(true);
  };

  const handleQuarterFormChange = (e) => {
    const { name, value } = e.target;
    setQuarterForm(f => ({ ...f, [name]: value }));
  };

  const handleQuarterSelect = (e) => {
    setQuarterForm(f => ({ ...f, quarter: e.target.value }));
  };

  const handleQuarterPlanSubmit = (e) => {
    e.preventDefault();
    if (quarterDialogMode === 'add') {
      if (quarterlyPlans.some(p => p.quarter === quarterForm.quarter)) {
        setQuarterAlertMsg('A plan for this quarter already exists!');
        return;
      }
      setQuarterlyPlans(plans => [
        { ...quarterForm },
        ...plans
      ]);
    } else if (quarterDialogMode === 'edit' && currentQuarterPlan) {
      if (quarterlyPlans.some((p, i) => i !== currentQuarterPlan.index && p.quarter === quarterForm.quarter)) {
        setQuarterAlertMsg('A plan for this quarter already exists!');
        return;
      }
      setQuarterlyPlans(plans => plans.map((p, i) => i === currentQuarterPlan.index ? { ...quarterForm } : p));
    }
    setQuarterDialogOpen(false);
  };

  const handleEditQuarterPlan = (plan, index) => {
    setQuarterDialogMode('edit');
    setCurrentQuarterPlan({ ...plan, index });
    setQuarterForm({ ...plan });
    setQuarterAlertMsg('');
    setQuarterDialogOpen(true);
  };

  const handleViewQuarterPlan = (plan) => {
    setQuarterDialogMode('view');
    setCurrentQuarterPlan({ ...plan });
    setQuarterForm({ ...plan });
    setQuarterAlertMsg('');
    setQuarterDialogOpen(true);
  };

  const handleDeleteQuarterPlan = (index) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      setQuarterlyPlans(plans => plans.filter((_, i) => i !== index));
    }
  };

  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen relative" 
      style={{ 
        backgroundImage: 'url(/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Black tint overlay */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />
      
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between min-h-12">
            {/* Logo on the left */}
            <div className="flex items-center space-x-2 shrink-0 min-w-16 max-w-24">
              <a href="https://www.linkedin.com/in/rohitash-kumar-78508520/" target="_blank" rel="noopener noreferrer">
                <img src="/logo.png" alt="Techbook Logo" className="object-contain min-w-16 max-w-24" style={{ width: '100%', height: 'auto' }} />
              </a>
            </div>
            {/* Mobile/Tablet: Hamburger and Profile Pic on right */}
            <div className="flex items-center justify-end space-x-2 flex-1 lg:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => setDummyPage(null)}>
                <Home className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <a href="https://www.linkedin.com/in/rohitash-kumar-78508520/" target="_blank" rel="noopener noreferrer">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/profile.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </a>
            </div>

            {/* Desktop: Menu Items and Profile Pic on right */}
            <div className="hidden lg:flex items-center justify-end space-x-4">
              {/* Menu Items */}
              <NavigationMenu className="relative z-50">
                <NavigationMenuList className="space-x-6">
                  {/* Static Nav Items */}
                  <NavigationMenuItem>
                    <button className="text-white bg-transparent border-0 rounded-md px-2 py-2 text-base font-medium transition-colors focus:outline-none hover:bg-white hover:text-blue-600 focus:bg-white focus:text-blue-600 flex items-center gap-1" onClick={() => setDummyPage(null)}>
                      <Home className="w-5 h-5" /> Home
                    </button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <button className="text-white bg-transparent border-0 rounded-md px-2 py-2 text-base font-medium transition-colors focus:outline-none hover:bg-white hover:text-blue-600 focus:bg-white focus:text-blue-600 flex items-center gap-1" onClick={() => setDummyPage('Dashboard')}>
                      <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <button className="text-white bg-transparent border-0 rounded-md px-2 py-2 text-base font-medium transition-colors focus:outline-none hover:bg-white hover:text-blue-600 focus:bg-white focus:text-blue-600 flex items-center gap-1" onClick={() => setDummyPage('Projects')}>
                      <BookOpen className="w-5 h-5" /> Projects
                    </button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <button className="text-white bg-transparent border-0 rounded-md px-2 py-2 text-base font-medium transition-colors focus:outline-none hover:bg-white hover:text-blue-600 focus:bg-white focus:text-blue-600 flex items-center gap-1" onClick={() => setDummyPage('Reports')}>
                      <TrendingUp className="w-5 h-5" /> Reports
                    </button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <button className="text-white bg-transparent border-0 rounded-md px-2 py-2 text-base font-medium transition-colors focus:outline-none hover:bg-white hover:text-blue-600 focus:bg-white focus:text-blue-600 flex items-center gap-1" onClick={() => setDummyPage('Settings')}>
                      <Settings className="w-5 h-5" /> User Settings
                    </button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <button className="text-white bg-transparent border-0 rounded-md px-2 py-2 text-base font-medium transition-colors focus:outline-none hover:bg-white hover:text-blue-600 focus:bg-white focus:text-blue-600 flex items-center gap-1" onClick={() => setDummyPage('Help')}>
                      <Bell className="w-5 h-5" /> Help
                    </button>
                  </NavigationMenuItem>

                  {/* Apps Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-white bg-transparent border-0 rounded-md px-2 py-2 text-base font-medium transition-colors focus:outline-none hover:bg-white hover:text-blue-600 focus:bg-white focus:text-blue-600 data-[state=open]:bg-white data-[state=open]:text-blue-600 flex items-center gap-1">
                      <Grid className="w-5 h-5" /> Apps
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white shadow-lg border border-gray-200 rounded-lg p-4 min-w-[600px] max-w-[90vw] z-50">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2 text-base leading-tight">Expo</h3>
                          <div className="space-y-[2px] text-base leading-tight">
                            {appsMenuData.expo.map((app, index) => (
                              <a 
                                key={index} 
                                href={app.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-blue-600 cursor-pointer py-1 text-base font-medium leading-tight block"
                              >
                                {app.name}
                              </a>
                            ))}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2 mt-4 text-base leading-tight">Client</h3>
                          <div className="space-y-[2px] text-base leading-tight">
                            {appsMenuData.client.map((app, index) => (
                              <a 
                                key={index} 
                                href={app.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-blue-600 cursor-pointer py-1 text-base font-medium leading-tight block"
                              >
                                {app.name}
                              </a>
                            ))}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2 mt-4 text-base leading-tight">Finance</h3>
                          <div className="space-y-[2px] text-base leading-tight">
                            {appsMenuData.finance.map((app, index) => (
                              <a 
                                key={index} 
                                href={app.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-blue-600 cursor-pointer py-1 text-base font-medium leading-tight block"
                              >
                                {app.name}
                              </a>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2 text-base leading-tight">Collaboration</h3>
                          <div className="space-y-[2px] text-base leading-tight">
                            {appsMenuData.collaboration.map((app, index) => (
                              <a 
                                key={index} 
                                href={app.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-blue-600 cursor-pointer py-1 text-base font-medium leading-tight block"
                              >
                                {app.name}
                              </a>
                            ))}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2 mt-4 text-base leading-tight">Office</h3>
                          <div className="space-y-[2px] text-base leading-tight">
                            {appsMenuData.office.map((app, index) => (
                              <a 
                                key={index} 
                                href={app.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-blue-600 cursor-pointer py-1 text-base font-medium leading-tight block"
                              >
                                {app.name}
                              </a>
                            ))}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2 mt-4 text-base leading-tight">People</h3>
                          <div className="space-y-[2px] text-base leading-tight">
                            {appsMenuData.people.map((app, index) => (
                              <a 
                                key={index} 
                                href={app.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-blue-600 cursor-pointer py-1 text-base font-medium leading-tight block"
                              >
                                {app.name}
                              </a>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2 text-base leading-tight">IT</h3>
                          <div className="space-y-[2px] text-base leading-tight">
                            {appsMenuData.it.map((app, index) => (
                              <a 
                                key={index} 
                                href={app.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-blue-600 cursor-pointer py-1 text-base font-medium leading-tight block"
                              >
                                {app.name}
                              </a>
                            ))}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2 mt-4 text-base leading-tight">Dev</h3>
                          <div className="space-y-[2px] text-base leading-tight">
                            {appsMenuData.dev.map((app, index) => (
                              <a 
                                key={index} 
                                href={app.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-blue-600 cursor-pointer py-1 text-base font-medium leading-tight block"
                              >
                                {app.name}
                              </a>
                            ))}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2 mt-4 text-base leading-tight">Devices</h3>
                          <div className="space-y-[2px] text-base leading-tight">
                            {appsMenuData.devices.map((app, index) => (
                              <a 
                                key={index} 
                                href={app.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-blue-600 cursor-pointer py-1 text-base font-medium leading-tight block"
                              >
                                {app.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              {/* Profile Picture */}
              <a href="https://www.linkedin.com/in/rohitash-kumar-78508520/" target="_blank" rel="noopener noreferrer">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/profile.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </a>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-white/20">
              <div className="space-y-2">
                {/* Static Nav Items */}
                <Button variant="ghost" className="w-full text-left text-white hover:bg-white/20 justify-start" asChild>
                  <button onClick={() => setDummyPage('Dashboard')}><LayoutDashboard className="w-5 h-5 mr-2 inline" />Dashboard</button>
                </Button>
                <Button variant="ghost" className="w-full text-left text-white hover:bg-white/20 justify-start" asChild>
                  <button onClick={() => setDummyPage('Projects')}><BookOpen className="w-5 h-5 mr-2 inline" />Projects</button>
                </Button>
                <Button variant="ghost" className="w-full text-left text-white hover:bg-white/20 justify-start" asChild>
                  <button onClick={() => setDummyPage('Reports')}><TrendingUp className="w-5 h-5 mr-2 inline" />Reports</button>
                </Button>
                <Button variant="ghost" className="w-full text-left text-white hover:bg-white/20 justify-start" asChild>
                  <button onClick={() => setDummyPage('Settings')}><Settings className="w-5 h-5 mr-2 inline" />User Settings</button>
                </Button>
                <Button variant="ghost" className="w-full text-left text-white hover:bg-white/20 justify-start" asChild>
                  <button onClick={() => setDummyPage('Help')}><Bell className="w-5 h-5 mr-2 inline" />Help</button>
                </Button>

                {/* Apps Mobile Dropdown */}
                <div>
                  <Button 
                    variant="ghost" 
                    className="w-full text-left text-white hover:bg-white/20 justify-between"
                    onClick={() => setMobileAppsOpen(!mobileAppsOpen)}
                  >
                    <span className="flex items-center"><Grid className="w-5 h-5 mr-2 inline" />Apps</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileAppsOpen ? 'rotate-180' : ''}`} />
                  </Button>
                  {mobileAppsOpen && (
                    <div className="ml-4 mt-2 space-y-4 bg-white/10 rounded-lg p-3 max-h-96 overflow-y-auto">
                      {Object.entries(appsMenuData).map(([category, apps]) => (
                        <div key={category}>
                          <h3 className="font-semibold text-white mb-2 capitalize">{category}</h3>
                          <div className="space-y-1 pl-2 text-sm">
                            {apps.map((app, index) => (
                              <a 
                                key={index} 
                                href={app.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white/70 hover:text-white cursor-pointer py-1 text-sm block"
                              >
                                {app.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-14 sm:pt-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6">
          {dummyPage ? (
            <DummyPage title={dummyPage} onHome={() => setDummyPage(null)} />
          ) : (
            <Tabs value={activeTab} onValueChange={handleTabClick} className="flex flex-col md:flex-row w-full">
              {/* Tab Navigation - Horizontal on mobile, Vertical on desktop */}
              <TabsList className={`liquid-tabs-list flex flex-row md:flex-col items-center bg-white/10 backdrop-blur-md border border-white/30 rounded-lg sm:rounded-xl p-0.5 sm:p-1 gap-2 md:gap-3 w-full md:w-[280px] md:min-w-[280px] md:max-w-[280px] md:mr-8 mt-2 shadow-lg overflow-x-auto overflow-y-hidden md:overflow-y-auto md:overflow-x-hidden h-auto md:h-[360px] no-scrollbar${disableAnimation ? ' no-animation' : ''}`}>
                {/* Navigation Items */}
                <TabsTrigger 
                  value="feed" 
                  className="liquid-tab-trigger flex flex-row items-center justify-center gap-[2px] sm:gap-1 text-[8px] sm:text-xs md:text-sm text-white/90 px-1 py-0.5 h-6 sm:h-8 w-auto md:w-full whitespace-nowrap rounded-md sm:rounded-lg hover:text-white focus:text-white font-medium text-center min-w-[52px] sm:min-w-[80px]"
                >
                  <FontAwesomeIcon icon={faBookOpen} className="fa-icon w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white/90" />
                  <span>My Feed</span>
                </TabsTrigger>
                <hr className="hidden md:block w-4/5 border-t border-white/20 my-0.5" />
                
                <TabsTrigger 
                  value="kudos" 
                  className="liquid-tab-trigger flex flex-row items-center justify-center gap-[2px] sm:gap-1 text-[8px] sm:text-xs md:text-sm text-white/90 px-1 py-0.5 h-6 sm:h-8 w-auto md:w-full whitespace-nowrap rounded-md sm:rounded-lg hover:text-white focus:text-white font-medium text-center min-w-[52px] sm:min-w-[80px]"
                >
                  <FontAwesomeIcon icon={faThumbsUp} className="fa-icon w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white/90" />
                  <span>Kudos</span>
                </TabsTrigger>
                <hr className="hidden md:block w-4/5 border-t border-white/20 my-0.5" />
                
                <TabsTrigger 
                  value="people" 
                  className="liquid-tab-trigger flex flex-row items-center justify-center gap-[2px] sm:gap-1 text-[8px] sm:text-xs md:text-sm text-white/90 px-1 py-0.5 h-6 sm:h-8 w-auto md:w-full whitespace-nowrap rounded-md sm:rounded-lg hover:text-white focus:text-white font-medium text-center min-w-[52px] sm:min-w-[80px]"
                >
                  <FontAwesomeIcon icon={faUsers} className="fa-icon w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white/90" />
                  <span>People</span>
                </TabsTrigger>
                <hr className="hidden md:block w-4/5 border-t border-white/20 my-0.5" />
                
                <TabsTrigger 
                  value="revenue" 
                  className="liquid-tab-trigger flex flex-row items-center justify-center gap-[2px] sm:gap-1 text-[8px] sm:text-xs md:text-sm text-white/90 px-1 py-0.5 h-6 sm:h-8 w-auto md:w-full whitespace-nowrap rounded-md sm:rounded-lg hover:text-white focus:text-white font-medium text-center min-w-[52px] sm:min-w-[80px]"
                >
                  <FontAwesomeIcon icon={faChartLine} className="fa-icon w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white/90" />
                  <span>Revenue</span>
                </TabsTrigger>
                <hr className="hidden md:block w-4/5 border-t border-white/20 my-0.5" />
                
                <TabsTrigger 
                  value="work" 
                  className="liquid-tab-trigger flex flex-row items-center justify-center gap-[2px] sm:gap-1 text-[8px] sm:text-xs md:text-sm text-white/90 px-1 py-0.5 h-6 sm:h-8 w-auto md:w-full whitespace-nowrap rounded-md sm:rounded-lg hover:text-white focus:text-white font-medium text-center min-w-[52px] sm:min-w-[80px]"
                >
                  <FontAwesomeIcon icon={faCalendarAlt} className="fa-icon w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white/90" />
                  <span>My Work</span>
                </TabsTrigger>
                <hr className="hidden md:block w-4/5 border-t border-white/20 my-0.5" />
                
                <TabsTrigger 
                  value="plan" 
                  className="liquid-tab-trigger flex flex-row items-center justify-center gap-[2px] sm:gap-1 text-[8px] sm:text-xs md:text-sm text-white/90 px-1 py-0.5 h-6 sm:h-8 w-auto md:w-full whitespace-nowrap rounded-md sm:rounded-lg hover:text-white focus:text-white font-medium text-center min-w-[52px] sm:min-w-[80px]"
                >
                  <FontAwesomeIcon icon={faCog} className="fa-icon w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white/90" />
                  <span>My Plan</span>
                </TabsTrigger>
              </TabsList>

              {/* Content Area */}
              <div className="flex-1 w-full px-0 lg:px-4 mt-4 sm:mt-6 md:mt-0">
                <TabsContent value="feed" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-white" />
                        <h2 className="text-xl font-semibold text-white">My Feed</h2>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {feedData.map((item) => (
                        <div key={item.id} className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                          <div className="text-2xl flex-shrink-0">{item.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2 flex-wrap">
                              <h3 className="text-white font-medium break-words">{item.title}</h3>
                              {item.starred && <span className="text-yellow-400 flex-shrink-0">⭐</span>}
                            </div>
                            <p className="text-white/70 text-sm mb-2 break-words">{item.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-white/60 flex-wrap gap-2">
                              <span>{item.date}</span>
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="w-4 h-4" />
                                <span>{item.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="w-4 h-4" />
                                <span>{item.comments}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="kudos" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ThumbsUp className="w-5 h-5 text-white" />
                        <h2 className="text-2xl font-bold text-white">Kudos</h2>
                      </div>
                      <Dialog open={isKudosDialogOpen} onOpenChange={setIsKudosDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/20 border-white/30 text-white"
                            onClick={() => setIsKudosDialogOpen(true)}
                          >
                            <Plus className="w-5 h-5 mr-2" />
                            Give Kudos
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Give Kudos</DialogTitle>
                          </DialogHeader>
                          <form
                            onSubmit={e => {
                              e.preventDefault();
                              if (!kudosName.trim() || !kudosComment.trim()) return;
                              setKudosList([
                                {
                                  id: Date.now(),
                                  author: kudosName,
                                  recognizers: [],
                                  avatar: "/profile.png",
                                  date: new Date().toISOString().slice(0, 10),
                                  kudos: 1,
                                  content: kudosComment,
                                  likes: 0,
                                  comments: 0
                                },
                                ...kudosList
                              ]);
                              setKudosName('');
                              setKudosComment('');
                              setIsKudosDialogOpen(false);
                            }}
                            className="space-y-4"
                          >
                            <div>
                              <label className="block text-sm font-medium mb-1">Name:</label>
                              <Input value={kudosName} onChange={e => setKudosName(e.target.value)} placeholder="Your name" required />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Comments:</label>
                              <Input value={kudosComment} onChange={e => setKudosComment(e.target.value)} placeholder="Your comments" required />
                            </div>
                            <DialogFooter>
                              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Submit</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {kudosList.map((kudo) => (
                          <div key={kudo.id} className="flex items-center space-x-4 p-4 rounded-lg bg-white/5">
                            <Avatar className="w-12 h-12 flex-shrink-0 bg-white">
                              <AvatarFallback className="flex items-center justify-center w-full h-full rounded-full bg-white">
                                <User className="w-6 h-6 text-gray-700" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-2 flex-wrap">
                                <h3 className="text-white font-medium break-words">{kudo.author}</h3>
                              </div>
                              <p className="text-white/70 text-sm mb-2 break-words">{kudo.content}</p>
                              <div className="flex items-center space-x-4 text-sm text-white/60 flex-wrap gap-2">
                                <span>{kudo.date}</span>
                                <div className="flex items-center space-x-1">
                                  <ThumbsUp className="w-4 h-4" />
                                  <span>{kudo.likes}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MessageCircle className="w-4 h-4" />
                                  <span>{kudo.comments}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="people" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-white" />
                        <h2 className="text-xl font-semibold text-white">People</h2>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {/* Work Anniversaries */}
                        <div>
                          <h3 className="text-white font-semibold mb-4 flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Work Anniversaries
                          </h3>
                          <div className="space-y-3">
                            {peopleData.workAnniversaries.map((person, index) => (
                              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                                <Avatar className="flex-shrink-0 bg-white">
                                  <AvatarFallback className="flex items-center justify-center w-full h-full rounded-full bg-white">
                                    <User className="w-6 h-6 text-gray-700" />
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <p className="text-white font-medium break-words">{person.name}</p>
                                  <p className="text-white/60 text-sm">{person.years} years, {person.date}</p>
                                  <div className="flex items-center space-x-4 text-xs text-white/50 mt-1">
                                    <span>👍 {person.likes}</span>
                                    <span>💬 {person.comments}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Birthdays */}
                        <div>
                          <h3 className="text-white font-semibold mb-4 flex items-center">
                            🎂 Birthdays
                          </h3>
                          <div className="space-y-3">
                            {peopleData.birthdays.map((person, index) => (
                              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                                <Avatar className="flex-shrink-0 bg-white">
                                  <AvatarFallback className="flex items-center justify-center w-full h-full rounded-full bg-white">
                                    <User className="w-6 h-6 text-gray-700" />
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <p className="text-white font-medium break-words">{person.name}</p>
                                  <p className="text-white/60 text-sm">{person.date}</p>
                                  <div className="flex items-center space-x-4 text-xs text-white/50 mt-1">
                                    <span>👍 {person.likes}</span>
                                    <span>💬 {person.comments}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Personal Announcements */}
                        <div className="md:col-span-2 xl:col-span-1">
                          <h3 className="text-white font-semibold mb-4 flex items-center">
                            📢 Personal Announcements
                          </h3>
                          <div className="space-y-3">
                            {peopleData.announcements.map((announcement, index) => (
                              <div key={index} className="p-3 rounded-lg bg-white/5">
                                <div className="flex items-center space-x-2 mb-2 flex-wrap">
                                  <h4 className="text-white font-medium break-words">{announcement.title}</h4>
                                  {announcement.starred && <span className="text-yellow-400 flex-shrink-0">⭐</span>}
                                </div>
                                <p className="text-white/70 text-sm mb-2 break-words">{announcement.description}</p>
                                <div className="flex items-center space-x-4 text-xs text-white/50 flex-wrap gap-2">
                                  <span>{announcement.date}</span>
                                  <span>👍 {announcement.likes}</span>
                                  <span>💬 {announcement.comments}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="revenue" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-white" />
                        <h2 className="text-xl font-semibold text-white">Revenue</h2>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {revenueData.map((category, index) => (
                        <div key={index}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                            <h3 className="text-white font-semibold text-lg break-words">{category.category}</h3>
                            <span className="text-blue-300 font-bold text-xl">{category.amount}</span>
                          </div>
                          <div className="space-y-3">
                            {category.people.map((person, personIndex) => (
                              <div key={personIndex} className="flex items-center justify-between p-3 rounded-lg bg-white/5 gap-4">
                                <div className="flex items-center space-x-3 flex-1 min-w-0">
                                  <Avatar className="flex-shrink-0 bg-white">
                                    <AvatarFallback className="flex items-center justify-center w-full h-full rounded-full bg-white">
                                      <User className="w-6 h-6 text-gray-700" />
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="min-w-0">
                                    <p className="text-white font-medium break-words">{person.name}</p>
                                    <p className="text-white/60 text-sm break-words">{person.company}</p>
                                    <p className="text-white/50 text-xs">{person.date}</p>
                                  </div>
                                </div>
                                <span className="text-white font-semibold flex-shrink-0">{person.amount}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="work" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-white" />
                        <h2 className="text-xl font-semibold text-white">My Work</h2>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recently worked on */}
                        <div>
                          <h3 className="text-blue-300 font-semibold mb-4">Recently worked on</h3>
                          <div className="space-y-2">
                            <h4 className="text-white font-medium">Today</h4>
                            {myWorkData.recentlyWorkedOn.filter(item => item.type === "Today").map((item, index) => (
                              <div key={index} className="p-2 rounded bg-white/5">
                                <p className="text-white text-sm break-words">{item.title}</p>
                                {item.category && <p className="text-white/60 text-xs break-words">({item.category})</p>}
                              </div>
                            ))}
                            
                            <h4 className="text-white font-medium mt-4">Last week</h4>
                            {myWorkData.recentlyWorkedOn.filter(item => item.type === "Last week").map((item, index) => (
                              <div key={index} className="p-2 rounded bg-white/5">
                                <p className="text-white text-sm break-words">{item.title}</p>
                                {item.category && <p className="text-white/60 text-xs break-words">({item.category})</p>}
                              </div>
                            ))}
                            
                            <h4 className="text-white font-medium mt-4">Older</h4>
                            {myWorkData.recentlyWorkedOn.filter(item => item.type === "Older").map((item, index) => (
                              <div key={index} className="p-2 rounded bg-white/5">
                                <p className="text-white text-sm break-words">{item.title}</p>
                                {item.category && <p className="text-white/60 text-xs break-words">({item.category})</p>}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Recently visited */}
                        <div>
                          <h3 className="text-blue-300 font-semibold mb-4">Recently visited</h3>
                          <div className="space-y-2">
                            <h4 className="text-white font-medium">Today</h4>
                            {myWorkData.recentlyVisited.filter(item => item.type === "Today").map((item, index) => (
                              <div key={index} className="p-2 rounded bg-white/5">
                                <p className="text-white text-sm break-words">{item.title}</p>
                                {item.category && <p className="text-white/60 text-xs break-words">({item.category})</p>}
                              </div>
                            ))}
                            
                            <h4 className="text-white font-medium mt-4">Last week</h4>
                            {myWorkData.recentlyVisited.filter(item => item.type === "Last week").map((item, index) => (
                              <div key={index} className="p-2 rounded bg-white/5">
                                <p className="text-white text-sm break-words">{item.title}</p>
                                {item.category && <p className="text-white/60 text-xs break-words">({item.category})</p>}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Favourites */}
                        <div>
                          <h3 className="text-blue-300 font-semibold mb-4">Favourites</h3>
                          <div className="space-y-2">
                            <h4 className="text-white font-medium">Pages</h4>
                            {myWorkData.favourites.map((item, index) => (
                              <div key={index} className="p-2 rounded bg-white/5">
                                <p className="text-white text-sm break-words">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="plan" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-2">
                          <Settings className="w-5 h-5 text-white" />
                          <h2 className="text-xl font-semibold text-white">My Plan & Update</h2>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <div className="flex space-x-2">
                            <Button
                              variant={planView === 'weekly' ? 'outline' : 'ghost'}
                              size="sm"
                              className={planView === 'weekly' ? 'bg-white/20 border-white/30 text-white' : 'text-white/60'}
                              onClick={() => setPlanView('weekly')}
                            >
                              Weekly
                            </Button>
                            <Button
                              variant={planView === 'quarterly' ? 'outline' : 'ghost'}
                              size="sm"
                              className={planView === 'quarterly' ? 'bg-white/20 border-white/30 text-white' : 'text-white/60'}
                              onClick={() => setPlanView('quarterly')}
                            >
                              Quarterly
                            </Button>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="bg-blue-600 text-white" 
                              onClick={handleWeeklyButton}
                              style={{ touchAction: 'manipulation' }}
                              onTouchStart={(e) => e.preventDefault()}
                            >
                              + Add Weekly
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="bg-blue-600 text-white" 
                              onClick={handleQuarterlyButton}
                              style={{ touchAction: 'manipulation' }}
                              onTouchStart={(e) => e.preventDefault()}
                            >
                              + Add Quarterly
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Desktop Table Header */}
                        <div className="hidden md:grid grid-cols-12 gap-4 text-white/60 text-sm font-medium border-b border-white/20 pb-2">
                          <div className="col-span-1"></div>
                          <div className="col-span-4">{planView === 'weekly' ? 'Week' : 'Quarter'}</div>
                          <div className="col-span-3">Created Date</div>
                          <div className="col-span-2">Status</div>
                          <div className="col-span-2"></div>
                        </div>
                        
                        {planView === 'weekly'
                          ? <>
                              {weeklyPlans.map((plan, index) => (
                                <div key={index} className="md:grid md:grid-cols-12 md:gap-4 md:items-center py-3 border-b border-white/10 space-y-2 md:space-y-0">
                                  {/* Mobile Layout */}
                                  <div className="md:hidden space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="text-white font-medium">{plan.week}</span>
                                      <ChevronDown className="w-4 h-4 text-blue-500 hover:text-white transition-colors cursor-pointer" />
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-white/70">{plan.createdDate}</span>
                                      <Badge className={plan.status === "Published" ? "bg-green-600 text-white" : "bg-blue-600 text-white"}>
                                        {plan.status}
                                      </Badge>
                                    </div>
                                    <div className="flex space-x-2 justify-end">
                                      <Button size="sm" variant="ghost" className="myplan-action-btn p-1" onClick={() => handleEditPlan(plan, index)}>
                                        <Edit className="w-4 h-4" />
                                      </Button>
                                      <Button size="sm" variant="ghost" className="myplan-action-btn p-1" onClick={() => handleViewPlan(plan)}>
                                        <Eye className="w-4 h-4" />
                                      </Button>
                                      <Button size="sm" variant="ghost" className="myplan-action-btn p-1" onClick={() => handleDeletePlan(index)}>
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  {/* Desktop Layout */}
                                  <div className="hidden md:contents">
                                    <div className="col-span-1">
                                      <ChevronDown className="w-4 h-4 text-blue-500 hover:text-white transition-colors cursor-pointer" />
                                    </div>
                                    <div className="col-span-4 text-white">{plan.week}</div>
                                    <div className="col-span-3 text-white/70">{plan.createdDate}</div>
                                    <div className="col-span-2">
                                      <Badge className={plan.status === "Published" ? "bg-green-600 text-white" : "bg-blue-600 text-white"}>
                                        {plan.status}
                                      </Badge>
                                    </div>
                                    <div className="col-span-2 flex space-x-2">
                                      <Button size="sm" variant="ghost" className="myplan-action-btn p-1" onClick={() => handleEditPlan(plan, index)}>
                                        <Edit className="w-4 h-4" />
                                      </Button>
                                      <Button size="sm" variant="ghost" className="myplan-action-btn p-1" onClick={() => handleViewPlan(plan)}>
                                        <Eye className="w-4 h-4" />
                                      </Button>
                                      <Button size="sm" variant="ghost" className="myplan-action-btn p-1" onClick={() => handleDeletePlan(index)}>
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </>
                          : quarterlyPlans.map((plan, index) => (
                            <div key={index} className="md:grid md:grid-cols-12 md:gap-4 md:items-center py-3 border-b border-white/10 space-y-2 md:space-y-0">
                              {/* Mobile Layout */}
                              <div className="md:hidden space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-white font-medium">{plan.quarter}</span>
                                  <ChevronDown className="w-4 h-4 text-blue-500 hover:text-white transition-colors cursor-pointer" />
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-white/70">{plan.createdDate}</span>
                                  <Badge className={plan.status === "Published" ? "bg-green-600 text-white" : "bg-blue-600 text-white"}>
                                    {plan.status}
                                  </Badge>
                                </div>
                                <div className="flex space-x-2 justify-end">
                                  <Button size="sm" variant="ghost" className="myplan-action-btn p-1" onClick={() => handleEditQuarterPlan(plan, index)}>
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="myplan-action-btn p-1" onClick={() => handleViewQuarterPlan(plan)}>
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="myplan-action-btn p-1" onClick={() => handleDeleteQuarterPlan(index)}>
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                              {/* Desktop Layout */}
                              <div className="hidden md:contents">
                                <div className="col-span-1">
                                  <ChevronDown className="w-4 h-4 text-blue-500 hover:text-white transition-colors cursor-pointer" />
                                </div>
                                <div className="col-span-4 text-white">{plan.quarter}</div>
                                <div className="col-span-3 text-white/70">{plan.createdDate}</div>
                                <div className="col-span-2">
                                  <Badge className={plan.status === "Published" ? "bg-green-600 text-white" : "bg-blue-600 text-white"}>
                                    {plan.status}
                                  </Badge>
                                </div>
                                <div className="col-span-2 flex space-x-2">
                                  <Button size="sm" variant="ghost" className="myplan-action-btn p-1" onClick={() => handleEditQuarterPlan(plan, index)}>
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="myplan-action-btn p-1" onClick={() => handleViewQuarterPlan(plan)}>
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="myplan-action-btn p-1" onClick={() => handleDeleteQuarterPlan(index)}>
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          )}
        </div>
      </main>

      {/* Apps menu overlay */}
      {mobileAppsOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" />
      )}

      {/* Plan dialog for weekly */}
      <Dialog open={planDialogOpen} onOpenChange={setPlanDialogOpen}>
        <DialogContent className="max-h-[70vh] overflow-y-auto" onOpenAutoFocus={e => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Add Weekly Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {/* Previous Week Section */}
            <div className="bg-gray-100 rounded p-2">
              <div className="font-semibold mb-1 text-sm">Previous Week</div>
              <div className="text-xs text-gray-700">{getWeekSections().prevWeek}</div>
              <div className="text-xs text-gray-500">Dummy: Review, Retrospective, Planning</div>
            </div>
            {/* Current Week Section (Form) */}
            {planDialogMode === 'view' ? (
              <div className="space-y-2 bg-gray-50 rounded p-2">
                <div className="font-semibold mb-1 text-sm">View Plan</div>
                <div>
                  <label className="block text-xs font-medium mb-1">Week:</label>
                  <div className="w-full rounded border px-2 py-1 bg-gray-100 text-xs">{planForm.week}</div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Created Date:</label>
                  <div className="w-full rounded border px-2 py-1 bg-gray-100 text-xs">{planForm.createdDate}</div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Status:</label>
                  <div className="w-full rounded border px-2 py-1 bg-gray-100 text-xs">{planForm.status}</div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Owner:</label>
                  <div className="w-full rounded border px-2 py-1 bg-gray-100 text-xs">{planForm.owner}</div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Description:</label>
                  <div className="w-full rounded border px-2 py-1 bg-gray-100 text-xs min-h-[40px]">{planForm.description}</div>
                </div>
                <DialogFooter>
                  <Button size="sm" onClick={() => setPlanDialogOpen(false)}>Close</Button>
                </DialogFooter>
              </div>
            ) : (
              <>
                {alertMsg && <div className="text-red-600 text-xs mb-2">{alertMsg}</div>}
                <form onSubmit={handlePlanSubmit} className="space-y-2 bg-blue-50 rounded p-2">
                  <div className="font-semibold mb-1 text-sm">{planDialogMode === 'edit' ? 'Edit Plan' : 'Current Week'}</div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Week Start (Monday):</label>
                    <input
                      type="date"
                      ref={weekStartRef}
                      onChange={handleWeekStartChange}
                      className="w-full rounded border px-2 py-1 text-xs"
                      required
                      min="2020-01-01"
                      max="2100-12-31"
                      defaultValue={planDialogMode === 'edit' ? planForm.week.split(' to ')[0] : ''}
                      readOnly={planDialogMode !== 'edit' && planDialogMode !== 'add' ? false : undefined}
                      onFocus={e => {
                        if (e.target.readOnly) {
                          e.target.readOnly = false;
                          e.target.blur();
                          setTimeout(() => e.target.focus(), 0);
                        }
                      }}
                    />
                    {planForm.week && <div className="text-xs text-gray-600 mt-1">Week: {planForm.week}</div>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Created Date:</label>
                    <input
                      name="createdDate"
                      value={planForm.createdDate}
                      className="w-full rounded border px-2 py-1 bg-gray-100 cursor-not-allowed text-xs"
                      readOnly
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Status:</label>
                    <select
                      name="status"
                      value={planForm.status}
                      onChange={handlePlanFormChange}
                      className="w-full rounded border px-2 py-1 text-xs"
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                      <option value="Forecast">Forecast</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Owner:</label>
                    <input
                      name="owner"
                      value={planForm.owner}
                      onChange={handlePlanFormChange}
                      className="w-full rounded border px-2 py-1 text-xs"
                      placeholder="Owner name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Description:</label>
                    <textarea
                      name="description"
                      value={planForm.description}
                      onChange={handlePlanFormChange}
                      className="w-full rounded border px-2 py-1 text-xs"
                      placeholder="Description"
                      rows={2}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      {planDialogMode === 'edit' ? 'Update' : 'Add'}
                    </Button>
                  </DialogFooter>
                </form>
              </>
            )}
            {/* Next Week Section */}
            <div className="bg-gray-100 rounded p-2">
              <div className="font-semibold mb-1 text-sm">Next Week</div>
              <div className="text-xs text-gray-700">{getWeekSections().nextWeek}</div>
              <div className="text-xs text-gray-500">Dummy: Forecast, Planning, Goals</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Plan dialog for quarterly */}
      <Dialog open={quarterDialogOpen} onOpenChange={setQuarterDialogOpen}>
        <DialogContent className="max-h-[70vh] overflow-y-auto" onOpenAutoFocus={e => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>{quarterDialogMode === 'edit' ? 'Edit Quarterly Plan' : quarterDialogMode === 'view' ? 'View Quarterly Plan' : 'Add Quarterly Plan'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {quarterDialogMode === 'view' ? (
              <div className="space-y-2 bg-gray-50 rounded p-2">
                <div className="font-semibold mb-1 text-sm">View Plan</div>
                <div>
                  <label className="block text-xs font-medium mb-1">Quarter:</label>
                  <div className="w-full rounded border px-2 py-1 bg-gray-100 text-xs">{quarterForm.quarter}</div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Created Date:</label>
                  <div className="w-full rounded border px-2 py-1 bg-gray-100 text-xs">{quarterForm.createdDate}</div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Status:</label>
                  <div className="w-full rounded border px-2 py-1 bg-gray-100 text-xs">{quarterForm.status}</div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Owner:</label>
                  <div className="w-full rounded border px-2 py-1 bg-gray-100 text-xs">{quarterForm.owner}</div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Description:</label>
                  <div className="w-full rounded border px-2 py-1 bg-gray-100 text-xs min-h-[40px]">{quarterForm.description}</div>
                </div>
                <DialogFooter>
                  <Button size="sm" onClick={() => setQuarterDialogOpen(false)}>Close</Button>
                </DialogFooter>
              </div>
            ) : (
              <>
                {quarterAlertMsg && <div className="text-red-600 text-xs mb-2">{quarterAlertMsg}</div>}
                <form onSubmit={handleQuarterPlanSubmit} className="space-y-2 bg-blue-50 rounded p-2">
                  <div className="font-semibold mb-1 text-sm">{quarterDialogMode === 'edit' ? 'Edit Plan' : 'Current Quarter'}</div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Quarter:</label>
                    <select
                      name="quarter"
                      value={quarterForm.quarter}
                      onChange={handleQuarterSelect}
                      className="w-full rounded border px-2 py-1 text-xs"
                      required
                    >
                      <option value="">Select Quarter</option>
                      {getQuarterOptions().map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Created Date:</label>
                    <input
                      name="createdDate"
                      value={quarterForm.createdDate}
                      className="w-full rounded border px-2 py-1 bg-gray-100 cursor-not-allowed text-xs"
                      readOnly
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Status:</label>
                    <select
                      name="status"
                      value={quarterForm.status}
                      onChange={handleQuarterFormChange}
                      className="w-full rounded border px-2 py-1 text-xs"
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                      <option value="Forecast">Forecast</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Owner:</label>
                    <input
                      name="owner"
                      value={quarterForm.owner}
                      onChange={handleQuarterFormChange}
                      className="w-full rounded border px-2 py-1 text-xs"
                      placeholder="Owner name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Description:</label>
                    <textarea
                      name="description"
                      value={quarterForm.description}
                      onChange={handleQuarterFormChange}
                      className="w-full rounded border px-2 py-1 text-xs"
                      placeholder="Description"
                      rows={2}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      {quarterDialogMode === 'edit' ? 'Update' : 'Add'}
                    </Button>
                  </DialogFooter>
                </form>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
