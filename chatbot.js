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

  // Create floating button
  const btn = document.createElement('div');
  btn.className = 'fixed bottom-6 right-6 z-50 cursor-pointer bg-white rounded-full shadow-lg p-3 border-2 border-blue-500 flex items-center justify-center animate-zoom';
  btn.style.width = '48px';
  btn.style.height = '48px';
  // Use a chat bubble icon (Phosphor Icons)
  btn.innerHTML = '<i class="ph ph-chat-centered-dots text-blue-600 text-2xl"></i>';
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

  function createMessageBubble(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`;
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = `max-w-xs px-3 py-2 rounded-2xl ${isUser ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} shadow-sm`;
    
    const textDiv = document.createElement('div');
    textDiv.className = 'text-sm';
    textDiv.textContent = text;
    
    const timeDiv = document.createElement('div');
    timeDiv.className = `text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`;
    timeDiv.textContent = getCurrentTime();
    
    bubbleDiv.appendChild(textDiv);
    bubbleDiv.appendChild(timeDiv);
    messageDiv.appendChild(bubbleDiv);
    
    return messageDiv;
  }

  function resetChatbot() {
    isFirstMessage = true;
    isMinimized = false;
    const welcomeContent = dialog.querySelector('#chatbot-welcome-content');
    const messages = dialog.querySelector('#chatbot-messages');
    welcomeContent.style.display = 'block';
    messages.innerHTML = '';
    btn.style.display = 'flex';
    dialog.classList.add('hidden');
    // Stop animation when closed
    btn.classList.remove('animate-zoom');
  }

  btn.addEventListener('click', () => {
    dialog.classList.remove('hidden');
    btn.style.display = 'none';
    document.getElementById('chatbot-input').focus();
    // Stop animation when opened
    btn.classList.remove('animate-zoom');
  });

  dialog.querySelector('#chatbot-minimize').addEventListener('click', () => {
    dialog.classList.add('hidden');
    btn.style.display = 'flex';
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
      
      // Add bot message bubble
      const botMsg = createMessageBubble('I can help you with Tech content management, search, and documentation tasks. What would you like to know?', false);
      messages.appendChild(botMsg);
      
      input.value = '';
      messages.scrollTop = messages.scrollHeight;
    }
  });
})(); 