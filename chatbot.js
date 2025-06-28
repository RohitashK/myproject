// Simple floating chat bot for static HTML
(function() {
  const root = document.getElementById('chatbot-root');
  if (!root) return;

  // Add custom CSS for zoom animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes zoomInOut {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.3); }
    }
    .animate-zoom {
      animation: zoomInOut 1.5s ease-in-out infinite;
    }
    body.dark #chatbot-root .fixed.bottom-6.right-6,
    body.dark #chatbot-root .fixed.bottom-6.right-6 * {
      background: #007aff !important;
      color: #fff !important;
      fill: #fff !important;
      border-color: #007aff !important;
    }
    body.dark #chatbot-root svg {
      color: #007aff !important;
      fill: #fff !important;
    }
  `;
  document.head.appendChild(style);

  // Helper SVGs
  const chatBubbleSVG = `
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="18" fill="none"/>
      <path d="M9 13a6 6 0 0 1 6-6h6a6 6 0 0 1 6 6v6a6 6 0 0 1-6 6h-2.2c-.3 0-.6.1-.8.3l-2.2 2.2c-.3.3-.8.1-.8-.3v-1.7A6 6 0 0 1 9 19v-6z" fill="white"/>
      <path d="M13 19c1 1.5 3 2.5 5 2.5s4-1 5-2.5" stroke="#007aff" stroke-width="2" stroke-linecap="round" fill="none"/>
    </svg>
  `;
  const downArrowSVG = `
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="18" fill="none"/>
      <polyline points="12,16 18,22 24,16" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  // Create floating button
  const btn = document.createElement('div');
  btn.className = 'fixed bottom-6 right-6 z-50 cursor-pointer rounded-full shadow-lg flex items-center justify-center animate-zoom';
  btn.style.width = '56px';
  btn.style.height = '56px';
  btn.style.background = '#007aff';
  btn.innerHTML = `<span id="chatbot-icon-span" style="display:inline-block;transition:opacity 0.25s;opacity:1;">${chatBubbleSVG}</span>`;
  root.appendChild(btn);

  // Create chat dialog
  const dialog = document.createElement('div');
  dialog.className = 'fixed bottom-20 right-6 z-50 w-80 max-w-full bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col hidden';
  dialog.innerHTML = `
    <div class="flex items-center justify-between px-3 py-2 bg-blue-600 rounded-t-xl">
      <span class="text-white font-bold text-sm flex items-center gap-2"><i class='ph ph-chat-centered-dots text-white'></i> Tech Assistant</span>
      <div class="flex items-center gap-2">
        <button class="text-white text-lg font-bold hover:text-blue-200 transition-colors" id="chatbot-minimize">−</button>
        <button class="text-white text-lg font-bold hover:text-blue-200 transition-colors" id="chatbot-close">&times;</button>
      </div>
    </div>
    <div class="flex-1 p-4 overflow-y-auto bg-gray-50" style="max-height: 220px;">
      <div id="chatbot-welcome-content">
        <div class="text-gray-700 mb-3 font-medium">👋 Hello! I'm your Tech Assistant. I can help you with:</div>
        
        <div class="mb-3">
          <div class="text-sm font-semibold text-blue-600 mb-2">📚 Content Management:</div>
          <ul class="text-xs text-gray-600 space-y-1">
            <li>• Create new Tech pages</li>
            <li>• Organize content categories</li>
            <li>• Update existing documentation</li>
            <li>• Manage file attachments</li>
          </ul>
        </div>
        
        <div class="mb-3">
          <div class="text-sm font-semibold text-blue-600 mb-2">🔍 Search & Navigation:</div>
          <ul class="text-xs text-gray-600 space-y-1">
            <li>• Find specific topics or pages</li>
            <li>• Search through documentation</li>
            <li>• Browse content by tags</li>
            <li>• Get related content suggestions</li>
          </ul>
        </div>
        
        <div class="mb-3">
          <div class="text-sm font-semibold text-blue-600 mb-2">📝 Writing Assistance:</div>
          <ul class="text-xs text-gray-600 space-y-1">
            <li>• Generate page templates</li>
            <li>• Create table of contents</li>
            <li>• Format code blocks</li>
            <li>• Add internal links</li>
          </ul>
        </div>
        
        <div class="text-xs text-gray-500 italic">
          Just type your question or request below!
        </div>
      </div>
      <div id="chatbot-messages"></div>
    </div>
    <form class="flex items-center border-t border-gray-200 p-2 bg-white" id="chatbot-form">
      <input type="text" class="flex-1 border rounded-full px-3 py-2 mr-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ask me anything about your Tech..." id="chatbot-input" />
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
        <i class="ph ph-paper-plane-right text-sm"></i>
      </button>
    </form>
  `;
  root.appendChild(dialog);

  let isFirstMessage = true;
  let isMinimized = false;

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  }

  function createMessageBubble(text, isUser = false, isHTML = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`;
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = `max-w-xs px-3 py-2 rounded-2xl ${isUser ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} shadow-sm`;
    const textDiv = document.createElement('div');
    textDiv.className = 'text-sm';
    if (isHTML) {
      textDiv.innerHTML = text;
    } else {
      textDiv.textContent = text;
    }
    const timeDiv = document.createElement('div');
    timeDiv.className = `text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`;
    timeDiv.textContent = getCurrentTime();
    bubbleDiv.appendChild(textDiv);
    bubbleDiv.appendChild(timeDiv);
    messageDiv.appendChild(bubbleDiv);
    return messageDiv;
  }

  function swapIconWithTransition(newSVG) {
    const iconSpan = btn.querySelector('#chatbot-icon-span');
    if (!iconSpan) return;
    iconSpan.style.opacity = '0';
    setTimeout(() => {
      iconSpan.innerHTML = newSVG;
      iconSpan.style.opacity = '1';
    }, 250);
  }

  function resetChatbot() {
    isFirstMessage = true;
    isMinimized = false;
    const welcomeContent = dialog.querySelector('#chatbot-welcome-content');
    const messages = dialog.querySelector('#chatbot-messages');
    welcomeContent.style.display = 'block';
    messages.innerHTML = '';
    btn.style.display = 'flex';
    swapIconWithTransition(chatBubbleSVG);
    dialog.classList.add('hidden');
    // Stop animation when closed
    btn.classList.remove('animate-zoom');
  }

  btn.addEventListener('click', () => {
    dialog.classList.remove('hidden');
    btn.style.display = 'flex';
    swapIconWithTransition(downArrowSVG);
    document.getElementById('chatbot-input').focus();
    // Stop animation when opened
    btn.classList.remove('animate-zoom');
  });

  dialog.querySelector('#chatbot-minimize').addEventListener('click', () => {
    dialog.classList.add('hidden');
    btn.style.display = 'flex';
    swapIconWithTransition(chatBubbleSVG);
    // Stop animation when minimized
    btn.classList.remove('animate-zoom');
  });

  dialog.querySelector('#chatbot-close').addEventListener('click', () => {
    resetChatbot();
  });

  dialog.querySelector('#chatbot-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = dialog.querySelector('#chatbot-input');
    const messages = dialog.querySelector('#chatbot-messages');
    const welcomeContent = dialog.querySelector('#chatbot-welcome-content');
    
    if (input.value.trim()) {
      // Remove welcome content on first message
      if (isFirstMessage) {
        welcomeContent.style.display = 'none';
        isFirstMessage = false;
      }
      // Add user message bubble
      const userMsg = createMessageBubble(input.value, true);
      messages.appendChild(userMsg);
      // Comprehensive website content arrays for high-tech chatbot search
      const searchableContent = [
        // ===== MAIN PAGES =====
        {
          name: 'Home Page',
          href: 'index.html',
          content: 'Home, main page, welcome, announcements, dashboard, quick links, news, updates, introduction, start here, feed, kudos, people, revenue, tasks, plans, auto-rotating tabs, sidebar navigation, mobile menu, apps dropdown, profile picture, linkedin profile, Rohitash Kumar'
        },
        {
          name: 'Dashboard Page',
          href: 'Dashboard.html',
          content: 'Dashboard, overview, activity, feed, summary, main, quick access, widgets, analytics, my feed, kudos, people, revenue, my task, my plan, grid layout, bento grid, fixed header, navigation menu, apps menu, profile settings, responsive design, desktop view, mobile view'
        },
        {
          name: 'Projects Page',
          href: 'Projects.html',
          content: 'Projects, project management, collaboration, create new project, assign tasks, deadlines, milestones, copy, team, deliverables, OpenAI, Google, Microsoft, Anthropic, Midjourney, GPT-5, Sora, Gemini Ultra, Copilot Studio, Claude 4.0, AI research, development, global AI projects, upcoming projects, leading companies, technology companies, project grid, project cards'
        },
        {
          name: 'Reports Page',
          href: 'Reports.html',
          content: 'Reports, data, analytics, report, summary, performance, statistics, charts, export, download, insights, metrics, KPI, dashboard, data visualization, performance tracking, business intelligence, reporting tools'
        },
        {
          name: 'Help Page',
          href: 'Help.html',
          content: 'Help, FAQ, support, guide, documentation, assistance, questions, troubleshooting, contact, how to, manual, instructions, help support, frequently asked questions, live chat, email support, documentation, quick actions, contact information, support team'
        },
        {
          name: 'User Settings Page',
          href: 'Settings.html',
          content: 'User settings, preferences, profile, account, configuration, password, notifications, personal, setup, options, account management, profile settings, notification preferences, security settings'
        },
        
        // ===== DASHBOARD SECTIONS =====
        {
          name: 'My Feed Section',
          href: 'Dashboard.html#feed',
          content: 'Feed, updates, notifications, recent activity, news, timeline, posts, announcements, team updates, weekly team update, design system workshop, new office location, summer team building, feed data, activity feed, social feed, team feed, June 2025, May 2025, trending up icon, book open icon, users icon, calendar icon, revenue type, meeting type, announcement type, event type, starred posts, likes, comments'
        },
        {
          name: 'Kudos Section',
          href: 'Dashboard.html#kudos',
          content: 'Kudos, appreciation, recognition, praise, thanks, awards, Riya Mehra, Vikas Patel, Sneha Rao, Suresh Kumar, Neha Joshi, Manish Gupta, Amit Sharma, Priya Singh, Rahul Verma, Karan Singh, Pooja Nair, Deepak Chawla, kudos data, give kudos, kudos dialog, kudos form, kudos list, kudos entries, recognition system, employee recognition, team appreciation, outstanding work, amazing work, presentation skills, client meeting, problem-solving skills, attention to detail, deadline, dedication, kudos modal, kudos submission'
        },
        {
          name: 'People Section',
          href: 'Dashboard.html#people',
          content: 'People, team, members, users, contacts, colleagues, staff, work anniversaries, birthdays, announcements, Amit Sharma, Priya Singh, Rahul Verma, Sneha Patel, Vikram Desai, Ananya Iyer, Rohan Mehra, Meera Nair, Saurabh Gupta, people data, team members, employee directory, work anniversary, birthday celebrations, team announcements, new team member, office renovation, design team, June dates, profile pictures, avatar images, likes, comments, starred announcements, team building, office space, downtown location'
        },
        {
          name: 'Revenue Section',
          href: 'Dashboard.html#revenue',
          content: 'Revenue, earnings, financial summary, sales, income, profit, money, design projects, development services, consulting, Arjun Desai, PixelCraft India, Meera Kapoor, Creative Minds Pvt Ltd, Rohit Sinha, TechNova Solutions, Anjali Menon, DevWorks India, Siddharth Jain, ConsultPro India, revenue data, financial data, project revenue, service revenue, crore amounts, lakh amounts, revenue categories, design projects revenue, development services revenue, consulting revenue, client companies, project amounts, revenue tracking, financial performance'
        },
        {
          name: 'My Task Section',
          href: 'Dashboard.html#mywork',
          content: 'Task, tasks, to-do, assignments, work, checklist, progress, my work, workload, assignments, deadlines, my work data, recently worked on, recently visited, favourites, UI/UX design system implementation, mobile app development sprint, client presentation deck, team training workshop, product roadmap planning, annual performance review, project dashboard, design system documentation, team calendar, client meeting notes, code review guidelines, marketing strategy document, project timeline, design resources, team guidelines, client presentations, development standards, marketing templates, work categories, design, development, marketing, HR, strategy, planning, sales, work types, today, last week, older'
        },
        {
          name: 'My Plan Section',
          href: 'Dashboard.html#myplan',
          content: 'Plan, planning, schedule, roadmap, goals, objectives, strategy, weekly plans, quarterly plans, Q1, Q2, Q3, Q4, 2025, 2026, my plan data, weekly plan data, quarterly plan data, plan dialog, plan form, plan submission, plan validation, duplicate entries, plan status, published plans, plan owners, Amit Sharma, Priya Singh, Rahul Verma, Sneha Patel, Vikram Desai, Ananya Iyer, plan descriptions, sprint planning, quarterly goals, new targets, plan management, plan creation, plan editing, plan viewing, plan deletion, plan dates, week ranges, quarter ranges, plan tracking'
        },
        
        // ===== APPS CATEGORIES =====
        {
          name: 'Expo Apps Category',
          href: '#',
          content: 'Expo, ChatGPT, Claude, Gemini, Copilot, Midjourney, DALL-E, Stable Diffusion, AI tools, models, assistants, artificial intelligence, expo apps, AI development tools, language models, image generation, AI assistants, machine learning tools'
        },
        {
          name: 'Client Apps Category',
          href: '#',
          content: 'Salesforce Einstein, HubSpot AI, Zoho CRM, Pipedrive, Freshsales, Sales Navigator, customer relationship management, CRM, sales tools, client management, sales automation, lead management, customer data, sales pipeline, client apps, business development tools'
        },
        {
          name: 'Finance Apps Category',
          href: '#',
          content: 'Plaid, Stripe, QuickBooks AI, Xero, FreshBooks, Wave, financial tools, accounting, payment processing, invoicing, finance apps, financial management, bookkeeping, payment gateways, financial automation, expense tracking, revenue management'
        },
        {
          name: 'Collaboration Apps Category',
          href: '#',
          content: 'Notion AI, Miro AI, Figma AI, Slack AI, Microsoft Teams, Zoom AI, collaboration tools, communication, project management, design tools, team collaboration, remote work, video conferencing, design collaboration, document collaboration, team communication, collaboration apps'
        },
        {
          name: 'Office Apps Category',
          href: '#',
          content: 'Microsoft 365 Copilot, Google Workspace AI, Grammarly, Jasper, Copy.ai, Writesonic, office productivity, writing tools, content creation, office apps, productivity tools, document creation, content writing, office automation, business productivity, writing assistance'
        },
        {
          name: 'People Apps Category',
          href: '#',
          content: 'BambooHR, Workday, Greenhouse, Lever, SmartRecruiters, iCIMS, human resources, HR, recruitment, hiring, employee management, people apps, HR management, talent acquisition, employee onboarding, performance management, HR automation'
        },
        {
          name: 'IT Apps Category',
          href: '#',
          content: 'Okta, 1Password, LastPass, Dashlane, NordVPN, ExpressVPN, CrowdStrike, security, password management, VPN, cybersecurity, IT apps, identity management, password security, network security, endpoint protection, IT security tools'
        },
        {
          name: 'Dev Apps Category',
          href: '#',
          content: 'GitHub Copilot, Tabnine, CodeWhisperer, Replit, Cursor, Codeium, development tools, coding, programming, IDE, code completion, dev apps, software development, code assistance, development environment, programming tools, AI coding assistants'
        },
        {
          name: 'Devices Category',
          href: '#',
          content: 'Laptop Windows, Laptop macOS, iPhone, Android, iPad, Surface, devices, hardware, operating systems, mobile, desktop, device management, hardware platforms, mobile devices, desktop computers, tablet devices, device categories'
        },
        
        // ===== PROJECT DETAILS =====
        {
          name: 'OpenAI Projects',
          href: 'Projects.html#openai',
          content: 'OpenAI, GPT-5 Development, Sora Video Generation, AI Research, language model, video generation, Q4 2025, Q1 2026, 500+ Team, 200+ Team, OpenAI projects, AI research development, next-generation language model, enhanced reasoning capabilities, advanced video generation, text-to-video, AI model development, research team, development timeline, project milestones, AI innovation, artificial intelligence research'
        },
        {
          name: 'Google Projects',
          href: 'Projects.html#google',
          content: 'Google, Gemini Ultra 2.0, Quantum AI Research, AI Machine Learning, multimodal AI, quantum computing, Q2 2025, Q3 2025, 800+ Team, 150+ Team, Google projects, advanced multimodal AI, complex reasoning, quantum computing applications, AI machine learning, research initiatives, technology innovation, quantum AI, multimodal intelligence, AI development projects'
        },
        {
          name: 'Microsoft Projects',
          href: 'Projects.html#microsoft',
          content: 'Microsoft, Copilot Studio, Azure AI Services, AI Integration, custom AI assistant, enterprise AI, Q1 2025, Q2 2025, 300+ Team, 400+ Team, Microsoft projects, custom AI assistant development, enterprise AI solutions, AI APIs, Azure cloud services, AI integration platform, business AI solutions, enterprise technology, AI development platform'
        },
        {
          name: 'Anthropic Projects',
          href: 'Projects.html#anthropic',
          content: 'Anthropic, Claude 4.0, AI Safety Research, Constitutional AI, AI alignment, safety protocols, Q3 2025, Q4 2025, 250+ Team, 100+ Team, Anthropic projects, next-generation AI, enhanced safety features, AI alignment research, safety protocols, constitutional AI principles, AI ethics, responsible AI development, safety-first AI'
        },
        {
          name: 'Midjourney Projects',
          href: 'Projects.html#midjourney',
          content: 'Midjourney, image generation, visual AI, creative tools, art, design, visual content, Midjourney projects, AI art generation, visual content creation, creative AI tools, digital art, image synthesis, visual design, creative technology, AI-powered design'
        },
        
        // ===== FEATURES AND ACTIONS =====
        {
          name: 'Create New Project',
          href: 'Projects.html#create',
          content: 'Create new project, add project, new project, project creation, start project, project setup, project initialization, project management, project planning, project development, project workflow'
        },
        {
          name: 'Task Management',
          href: 'Projects.html#tasks',
          content: 'Task management, assign tasks, task assignment, workload, deadlines, task tracking, task planning, task scheduling, task prioritization, task monitoring, task completion, task workflow, project tasks, team tasks'
        },
        {
          name: 'Team Collaboration',
          href: 'Projects.html#collaboration',
          content: 'Team collaboration, team work, collaboration tools, team management, group work, team coordination, team communication, collaborative projects, team productivity, team efficiency, collaborative workflow'
        },
        {
          name: 'Analytics Dashboard',
          href: 'Reports.html#analytics',
          content: 'Analytics dashboard, data visualization, charts, metrics, performance tracking, KPI monitoring, business analytics, data analysis, performance metrics, business intelligence, data insights, reporting dashboard'
        },
        {
          name: 'Export Reports',
          href: 'Reports.html#export',
          content: 'Export reports, download reports, report export, data export, PDF export, Excel export, report generation, data download, report sharing, report distribution, export functionality, report formats'
        },
        {
          name: 'Profile Settings',
          href: 'Settings.html#profile',
          content: 'Profile settings, account settings, personal information, user profile, account management, profile configuration, user preferences, account details, personal settings, profile customization, user account'
        },
        {
          name: 'Notification Settings',
          href: 'Settings.html#notifications',
          content: 'Notification settings, alerts, email notifications, push notifications, notification preferences, alert configuration, notification management, communication preferences, alert settings, notification system'
        },
        {
          name: 'Help Documentation',
          href: 'Help.html#docs',
          content: 'Help documentation, user manual, guides, tutorials, how-to, instructions, FAQ, documentation, user guide, help resources, support documentation, learning resources, user assistance'
        },
        {
          name: 'Contact Support',
          href: 'Help.html#contact',
          content: 'Contact support, customer service, help desk, support ticket, contact us, get help, support contact, customer assistance, help request, support inquiry, contact information, support team'
        },
        
        // ===== HELP CONTENT =====
        {
          name: 'Navigation Help',
          href: 'Help.html#navigation',
          content: 'Navigate between sections, sidebar tabs, left navigation, section switching, tab navigation, dashboard view, section view, navigation menu, menu navigation, page navigation, interface navigation, user navigation'
        },
        {
          name: 'Kudos Help',
          href: 'Help.html#kudos',
          content: 'Add kudos entry, give kudos, kudos modal, kudos form, recipient name, kudos message, submit kudos, kudos submission, recognition entry, appreciation entry, kudos workflow, kudos process'
        },
        {
          name: 'Plan Creation Help',
          href: 'Help.html#plans',
          content: 'Create new plan, weekly plan, quarterly plan, plan form, plan submission, duplicate validation, plan management, plan creation process, plan setup, plan configuration, planning workflow'
        },
        {
          name: 'View Differences Help',
          href: 'Help.html#views',
          content: 'Home view, dashboard view, auto-rotating tabs, grid layout, section view, view differences, interface comparison, layout options, display modes, view modes, user interface options'
        },
        {
          name: 'Chatbot Access Help',
          href: 'Help.html#chatbot',
          content: 'Access chatbot, chat icon, bottom-right corner, chat interface, minimize chat, close chat, chat window, chat header, chatbot access, chat functionality, chat interface, chat controls'
        },
        {
          name: 'Entry Management Help',
          href: 'Help.html#entries',
          content: 'Edit entries, delete entries, view entries, action icons, edit icon, view icon, delete icon, confirmation dialog, entry management, data management, content management, entry operations'
        },
        
        // ===== LIVE CHAT AND SUPPORT =====
        {
          name: 'Live Chat Support',
          href: 'Help.html#livechat',
          content: 'Live chat, instant help, support team, real-time support, chat support, online support, immediate assistance, chat assistance, support chat, help chat, customer chat, support communication'
        },
        {
          name: 'Email Support',
          href: 'Help.html#email',
          content: 'Email support, send email, detailed assistance, email assistance, support email, contact email, email help, email inquiry, support inquiry, email communication, support contact'
        },
        {
          name: 'Documentation Access',
          href: 'Help.html#documentation',
          content: 'Browse documentation, comprehensive documentation, user documentation, help docs, documentation access, documentation browse, help resources, documentation library, user resources'
        },
        
        // ===== CONTACT INFORMATION =====
        {
          name: 'Support Contact',
          href: 'Help.html#contact',
          content: 'support.india@example.com, contact information, support email, customer service email, help email, support contact, contact details, support team contact, customer support, technical support'
        },
        
        // ===== APPS SECTION (Special handling for dropdown-style links) =====
        {
          name: 'Apps',
          href: '#',
          content: 'Apps, Expo, ChatGPT, Claude, Gemini, Copilot, Midjourney, DALL-E, Stable Diffusion, AI, tools, models, assistants, apps menu, applications, software tools, digital tools, productivity apps, business apps, technology apps',
          apps: [
            { name: 'Expo', href: 'https://expo.dev' },
            { name: 'ChatGPT', href: 'https://chat.openai.com' },
            { name: 'Claude', href: 'https://claude.ai' },
            { name: 'Gemini', href: 'https://gemini.google.com' },
            { name: 'Copilot', href: 'https://copilot.microsoft.com' },
            { name: 'Midjourney', href: 'https://www.midjourney.com' },
            { name: 'DALL-E', href: 'https://openai.com/dall-e-2' },
            { name: 'Stable Diffusion', href: 'https://stability.ai' }
          ]
        }
      ];
      // Fuzzy/partial word matching for keywords in all website content
      const msg = input.value.toLowerCase();
      const msgWords = msg.split(/\s+/).filter(Boolean);
      const matchedContent = searchableContent.filter(item => {
        const content = (item.content + ' ' + item.name).toLowerCase();
        return msgWords.some(word => content.includes(word));
      });
      if (matchedContent.length > 0) {
        let reply = '';
        if (matchedContent.length === 1 && matchedContent[0].name === 'Apps' && matchedContent[0].apps) {
          // Inline text hyperlinks for apps
          const appLinks = matchedContent[0].apps.map(app => `<a href="${app.href}" class="text-blue-600 underline chatbot-page-link" target="_blank" rel="noopener noreferrer">${app.name}</a>`).join(', ');
          reply = `You can find these apps: ${appLinks}.`;
        } else {
          // Default reply for other matches
          const links = matchedContent.map(item => `<a href="${item.href}" class="text-blue-600 underline chatbot-page-link" target="_blank" rel="noopener noreferrer">${item.name}</a>`).join(', ');
          reply = matchedContent.length === 1
            ? `You can find <b>${input.value}</b> in ${links}.`
            : `You can find <b>${input.value}</b> in these sections/pages: ${links}`;
        }
        const botMsg = createMessageBubble(reply, false, true);
        messages.appendChild(botMsg);
      } else {
        // Add bot message bubble
        const botMsg = createMessageBubble('No matching content found. I can help you with Tech content management, search, and documentation tasks. What would you like to know?', false);
        messages.appendChild(botMsg);
      }
      input.value = '';
      messages.scrollTop = messages.scrollHeight;
    }
  });
})(); 