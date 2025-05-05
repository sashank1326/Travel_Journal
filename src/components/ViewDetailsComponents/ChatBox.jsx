import React, { useEffect, useRef } from 'react';

export default function ChatBox({
  blog,
  darkMode,
  messages,
  setMessages,
  setNewMessage,
  newMessage,
  socket
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      const messageData = {
        text: newMessage,
        userId: localStorage.getItem('userId'),
        authorId: blog.author._id,
        blogId: blog._id
      };
      socket.emit('send_message', messageData);
      setNewMessage('');
    }
  };
  
  return (
    <div className={`rounded-2xl shadow-xl w-full max-w-[30rem] overflow-hidden ${darkMode 
      ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700" 
      : "bg-gradient-to-br from-white to-gray-50 border border-gray-100"}`}>
      
      {/* Chat Header */}
      <div className={`px-6 py-4 ${darkMode ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-sm border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>
          <div>
            <h3 className={`text-lg font-medium ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
              {blog.author.name}
            </h3>
            
          </div>
        </div>
      </div>
      
      {/* Messages Container */}
      <div className={` h-96 overflow-y-auto p-6 ${darkMode ? "bg-gray-800/30" : "bg-gray-50/50"}`}>
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className={`text-center ${darkMode ? "text-gray-400" : "text-gray-500"} max-w-xs`}>
              Start a conversation with {blog.author.name} about their travel experiences
            </p>
            <div className={`text-xs px-3 py-1.5 rounded-full ${darkMode ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-600"}`}>
              Messages are sent in real-time
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender !== 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mr-2 self-end">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <div className="flex flex-col max-w-[80%]">
                  <div 
                    className={`rounded-2xl px-4 py-2 shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-tr-none'
                        : darkMode 
                          ? 'bg-gray-700 text-gray-200 rounded-tl-none' 
                          : 'bg-white text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <span className={`text-xs mt-1 ${
                    msg.sender === 'user'
                      ? 'text-right text-gray-500 dark:text-gray-400'
                      : 'text-left text-gray-500 dark:text-gray-400'
                  }`}>
                    {msg.sender === 'user' ? 'Anonymous' : `${blog.author.name}`}
                  </span>
                </div>
                
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Message Input */}
      <div className={`px-6 py-4 ${darkMode ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-sm border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="relative flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className={`w-full px-4 py-3 pr-12 rounded-full ${darkMode
              ? 'bg-gray-700 text-gray-100 placeholder-gray-400'
              : 'bg-gray-100 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-emerald-500 border-0`}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          <button
            onClick={handleSendMessage}
            className="absolute right-2 w-9 h-9 flex items-center justify-center rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
        <div className="flex justify-between mt-2 px-2">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {/* Optional typing indicator */}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Press Enter to send
          </div>
        </div>
      </div>
    </div>
  );
}