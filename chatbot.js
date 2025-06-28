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
      // All website content and sections for full-site search
      const searchableContent = [
        {
          name: 'Home',
          href: 'index.html',
          content: 'Home, main page, welcome, announcements, dashboard, quick links, news, updates, introduction, start here'
        },
        {
          name: 'Projects',
          href: 'Projects.html',
          content: 'Project management, collaboration, create new project, assign tasks, deadlines, milestones, copy, team, deliverables.'
        },
        {
          name: 'Reports',
          href: 'Reports.html',
          content: 'Data, analytics, report, summary, performance, statistics, charts, export, download, insights.'
        },
        {
          name: 'Help',
          href: 'Help.html',
          content: 'Help, FAQ, support, guide, documentation, assistance, questions, troubleshooting, contact.'
        },
        {
          name: 'Dashboard',
          href: 'Dashboard.html',
          content: 'Dashboard, overview, activity, feed, summary, main, quick access, widgets, analytics.'
        },
        {
          name: 'User Settings',
          href: 'Settings.html',
          content: 'User, settings, preferences, profile, account, configuration, password, notifications.'
        },
        // Dashboard sections
        {
          name: 'My Feed (Dashboard)',
          href: 'Dashboard.html#feed',
          content: 'Feed, updates, notifications, recent activity, news, timeline.'
        },
        {
          name: 'Kudos (Dashboard)',
          href: 'Dashboard.html#kudos',
          content: 'Kudos, appreciation, recognition, praise, thanks, awards.'
        },
        {
          name: 'People (Dashboard)',
          href: 'Dashboard.html#people',
          content: 'People, team, members, users, contacts, colleagues, staff.'
        },
        {
          name: 'Revenue (Dashboard)',
          href: 'Dashboard.html#revenue',
          content: 'Revenue, earnings, financial summary, sales, income, profit, money.'
        },
        {
          name: 'My Task (Dashboard)',
          href: 'Dashboard.html#mywork',
          content: 'Task, tasks, to-do, assignments, work, checklist, progress.'
        },
        {
          name: 'My Plan (Dashboard)',
          href: 'Dashboard.html#myplan',
          content: 'Plan, planning, schedule, roadmap, goals, objectives, strategy.'
        },
        {
          name: 'Apps',
          href: '#',
          content: 'Apps, Expo, ChatGPT, Claude, Gemini, Copilot, Midjourney, DALL-E, Stable Diffusion, AI, tools, models, assistants',
          apps: [
            { name: 'Expo', href: '#' },
            { name: 'ChatGPT', href: '#' },
            { name: 'Claude', href: '#' },
            { name: 'Gemini', href: '#' },
            { name: 'Copilot', href: '#' },
            { name: 'Midjourney', href: '#' },
            { name: 'DALL-E', href: '#' },
            { name: 'Stable Diffusion', href: '#' }
          ]
        },
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
          // Dropdown-style menu for apps
          reply = `
            <div style="background:#fff; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.08); padding:0.5em 0; border:1px solid #e5e7eb; width:220px;">
              <ul style="list-style:none; margin:0; padding:0;">
                ${matchedContent[0].apps.map(app => `
                  <li style="padding:0.75em 1.25em; cursor:pointer; color:#374151; font-size:1.1em;">
                    <a href="${app.href}" style="color:inherit; text-decoration:none; display:block;">${app.name}</a>
                  </li>
                `).join('')}
              </ul>
            </div>
          `;
        } else {
          // Default reply for other matches
          const links = matchedContent.map(item => `<a href="${item.href}" class="text-blue-600 underline chatbot-page-link">${item.name}</a>`).join(', ');
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