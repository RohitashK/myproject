import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const welcomeMessage = [
  {
    type: 'text',
    content: 'Hi! I am your Wiki content assistant. Ask me anything about your content repository, search for docs, or get help with your knowledge base!'
  },
  {
    type: 'section',
    title: 'Ask about your tasks',
    items: [
      'What tasks are created by me and closed?',
      'What tasks am I working on?',
      'What should I work on next?'
    ]
  },
  {
    type: 'section',
    title: 'Ideas for writing:',
    badge: 'Product',
    items: [
      'Write product requirements document (PRD)',
      'Generate user story',
      'Identify success metrics'
    ]
  }
];

const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // JS-based animation state
  const [iconAnim, setIconAnim] = useState({ scale: 1, opacity: 1 });
  const [iconAnimationActive, setIconAnimationActive] = useState(true);
  const animationStarted = useRef(false);

  useEffect(() => {
    // Only run animation on first load
    if (!iconAnimationActive || animationStarted.current) {
      setIconAnim({ scale: 1, opacity: 1 });
      return;
    }
    animationStarted.current = true;
    let direction = 1;
    let scale = 1;
    let opacity = 1;
    const step = 0.01;
    const minScale = 1;
    const maxScale = 1.3;
    const minOpacity = 0.7;
    const maxOpacity = 1;
    const interval = setInterval(() => {
      if (direction === 1) {
        scale += step;
        opacity -= (maxOpacity - minOpacity) * step / (maxScale - minScale);
        if (scale >= maxScale) direction = -1;
      } else {
        scale -= step;
        opacity += (maxOpacity - minOpacity) * step / (maxScale - minScale);
        if (scale <= minScale) direction = 1;
      }
      setIconAnim({ scale, opacity });
    }, 24);
    return () => clearInterval(interval);
  }, [iconAnimationActive]);

  useEffect(() => {
    // Only set the default message if the dialog is opened for the first time and messages are empty
    if (open && !minimized && messages.length === 0) {
      setMessages([{ type: 'welcome' }]);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
    // Do not reset messages or input on maximize
  }, [open, minimized]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleIconClick = (e: React.MouseEvent) => {
    // Prevent any default zoom behavior on mobile
    e.preventDefault();
    e.stopPropagation();
    
    setOpen(true);
    setMinimized(false);
    setIconAnimationActive(false); // Stop animation when dialog opens
  };

  const handleClose = () => {
    setOpen(false);
    setMinimized(false);
    setInput('');
    setMessages([]);
    // Do NOT restart animation after close
  };

  const handleMinimize = () => {
    setMinimized(true);
    setOpen(false);
    setIconAnimationActive(false); // Keep animation stopped
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev.filter((m) => m.type !== 'welcome'),
      { type: 'user', content: input },
      { type: 'bot', content: 'Hi, I am here to find relevant tech pages for you.' }
    ]);
    setInput('');
  };

  // Helper to filter out the default message for minimized or if user/bot messages exist
  const getVisibleMessages = () => {
    const hasUserOrBotMsg = messages.some(m => m.type === 'user' || m.type === 'bot');
    if (minimized || hasUserOrBotMsg) {
      // Hide the default message if minimized or if user/bot messages exist
      return messages.filter(m => m.type !== 'welcome');
    }
    return messages;
  };

  // Custom keyframes for zoom/fade
  // Add this to your global CSS if not present
  // @keyframes zoomfade {
  //   0%, 100% { transform: scale(1); opacity: 1; }
  //   50% { transform: scale(1.15); opacity: 0.7; }
  // }

  return (
    <>
      {/* Floating Chat Icon */}
      <div
        className="fixed bottom-6 right-6 z-50 cursor-pointer bg-white rounded-full shadow-lg p-2 border-2 border-blue-500 flex items-center justify-center"
        style={{
          width: 48,
          height: 48,
          display: open && !minimized ? 'none' : 'flex',
          transform: `scale(${iconAnim.scale})`,
          opacity: iconAnim.opacity,
          transition: 'none',
          touchAction: 'manipulation', // Prevent double-tap zoom on mobile
        }}
        onClick={handleIconClick}
        onTouchStart={(e) => e.preventDefault()} // Prevent touch zoom
        aria-label="Open chat bot"
      >
        <FontAwesomeIcon icon={faCommentDots} size="lg" color="#2563eb" />
      </div>

      {/* Minimized Header Only */}
      {minimized && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-full rounded-xl shadow-2xl border border-gray-200 flex flex-col" style={{ width: 320, minWidth: 200 }}>
          <div className="flex items-center justify-between px-3 py-2 bg-blue-600 rounded-xl" style={{ borderRadius: 16 }}>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCommentDots} className="text-white text-xs" />
              <span className="text-white font-bold text-sm">Tech Assistant</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="text-white text-lg font-bold hover:text-blue-200 transition-colors"
                onClick={() => { setMinimized(false); setOpen(true); setIconAnimationActive(false); }}
                aria-label="Restore chat bot"
                style={{ fontSize: 18, lineHeight: 1 }}
              >
                &#9633;
              </button>
              <button
                className="text-white text-lg font-bold hover:text-blue-200 transition-colors"
                onClick={handleClose}
                aria-label="Close chat bot"
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Dialog */}
      {open && !minimized && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-full bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col" style={{ minHeight: 380, maxHeight: 480 }}>
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 bg-blue-600 rounded-t-xl">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCommentDots} className="text-white text-xs" />
              <span className="text-white font-bold text-sm">Tech Assistant</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="text-white text-lg font-bold hover:text-blue-200 transition-colors"
                onClick={handleMinimize}
                aria-label="Minimize chat bot"
                style={{ fontSize: 18, lineHeight: 1 }}
              >
                &#8211;
              </button>
              <button
                className="text-white text-lg font-bold hover:text-blue-200 transition-colors"
                onClick={handleClose}
                aria-label="Close chat bot"
              >
                &times;
              </button>
            </div>
          </div>
          {/* Body */}
          <div className="flex-1 px-3 py-2 overflow-y-auto flex flex-col gap-2" style={{ minHeight: 220, maxHeight: 340 }}>
            {getVisibleMessages().map((msg, idx) => {
              if (msg.type === 'welcome') {
                return (
                  <div key={idx} className="flex flex-col gap-2">
                    <div className="text-gray-900 text-xs mb-1" style={{ lineHeight: '1.6' }}>
                      {welcomeMessage[0].content}
                    </div>
                    <div className="mb-1">
                      <div className="text-[10px] font-semibold text-gray-500 mb-0.5">Ask about your tasks</div>
                      <ul className="flex flex-col gap-0.5">
                        {welcomeMessage[1].items.map((item, i) => (
                          <li key={i} className="flex items-center gap-1 text-gray-800 text-xs">
                            <FontAwesomeIcon icon={faLightbulb} className="text-blue-400 text-xs" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-gray-500 mb-0.5 flex items-center gap-1">
                        Ideas for writing:
                        <span className="bg-gray-200 text-[10px] text-gray-700 rounded px-1 py-0.5 ml-1 font-semibold">Product</span>
                      </div>
                      <ul className="flex flex-col gap-0.5">
                        {welcomeMessage[2].items.map((item, i) => (
                          <li key={i} className="flex items-center gap-1 text-gray-800 text-xs">
                            <FontAwesomeIcon icon={faLightbulb} className="text-blue-400 text-xs" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              }
              if (msg.type === 'user') {
                return (
                  <div key={idx} className="self-end bg-blue-100 rounded-lg px-2 py-1 text-blue-900 max-w-[80%] text-xs shadow">
                    {msg.content}
                  </div>
                );
              }
              if (msg.type === 'bot') {
                return (
                  <div key={idx} className="self-start bg-gray-100 rounded-lg px-2 py-1 text-gray-800 max-w-[80%] text-xs shadow">
                    {msg.content}
                  </div>
                );
              }
              return null;
            })}
            <div ref={messagesEndRef} />
          </div>
          {/* Input */}
          <form onSubmit={handleSend} className="flex items-center gap-2 px-3 py-2 border-t">
            <input
              ref={inputRef}
              type="text"
              className="flex-1 border rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your question..."
              value={input}
              onChange={handleInputChange}
              autoFocus
              style={{ fontSize: '16px' }} // Prevent zoom on iOS
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-1 transition-colors"
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.207-.12 1.207.488V7.5c4.5 0 7.5 1.5 9 6-1.5 4.5-4.5 6-9 6v3.967c0 .608-.767.927-1.207.488L2.25 12z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot; 