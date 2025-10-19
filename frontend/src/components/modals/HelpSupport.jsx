import React, { useState, useRef, useEffect } from 'react';

const HelpSupport = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m the Gymnazo Christian Academy assistant. How can I help you today? Feel free to ask about admissions, programs, facilities, or contact information.',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

  const SCHOOL_CONTEXT = `
You are a helpful assistant for Gymnazo Christian Academy Novaliches. 
You should ONLY answer questions related to the school.

School Information:
- Name: Gymnazo Christian Academy
- Location: 268 Zabala St. Cor. Luahati St. Tondo, Manila, Manila, Philippines
- Contact: 282472450
- Email: gymnazochristianacademy@gmail.com
- Mission: Committed to the formation of values and education among learners
- Type: Christian Academy

If users ask questions unrelated to the school, politely redirect them to ask about:
- Admissions and enrollment
- Academic programs
- School facilities
- Contact information
- School policies
- Events and announcements

Keep responses concise, friendly, and professional. If you don't know something specific about the school, suggest contacting the school office directly.
`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleHelp = () => {
    setIsHelpOpen(!isHelpOpen);
  };

  const sendMessageToGemini = async (userMessage) => {
    try {
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${SCHOOL_CONTEXT}\n\nUser question: ${userMessage}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API Error:', errorData);
        throw new Error('Failed to get response from Gemini API');
      }

      const data = await response.json();
      const aiResponse = data.candidates[0]?.content?.parts[0]?.text || 
        "I'm sorry, I couldn't process that. Please try rephrasing your question about the school.";

      return aiResponse;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return "I'm having trouble connecting right now. Please try again later or contact the school directly at gymnazochristianacademy@gmail.com or call 282472450.";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    // Add user message
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);

    setIsLoading(true);

    // Get AI response
    const aiResponse = await sendMessageToGemini(userMessage);

    // Add AI response
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    }]);

    setIsLoading(false);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Help Chat Box */}
        {isHelpOpen && (
          <div className="mb-4 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 animate-slideUp">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#F4D77D] to-[#F7C236] dark:from-amber-600 dark:to-amber-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#5B3E31] dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">GCA Assistant</h3>
                  <p className="text-xs text-white/80">Powered by AI</p>
                </div>
              </div>
              <button 
                onClick={toggleHelp}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="p-4 h-80 overflow-y-auto bg-gray-50 dark:bg-gray-900 space-y-3">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-[#F4D77D] dark:bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <div className={`rounded-lg p-3 max-w-[75%] shadow-sm ${
                    message.role === 'user' 
                      ? 'bg-[#F4D77D] dark:bg-amber-600 text-white' 
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                    <span className={`text-xs mt-1 block ${
                      message.role === 'user' 
                        ? 'text-white/80' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-[#5B3E31] dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-8 h-8 bg-[#F4D77D] dark:bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about the school..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F4D77D] dark:focus:ring-amber-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-[#F4D77D] hover:bg-[#F7C236] dark:bg-amber-600 dark:hover:bg-amber-700 text-white rounded-full p-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
              <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 text-center">
                Email: <a href="mailto:gymnazochristianacademy@gmail.com" className="hover:text-[#F4D77D] dark:hover:text-amber-400 transition-colors">gymnazochristianacademy@gmail.com</a>
              </div>
            </div>
          </div>
        )}

        {/* Floating Button */}
        <button
          onClick={toggleHelp}
          className="bg-gradient-to-r from-[#F4D77D] to-[#F7C236] dark:from-amber-600 dark:to-amber-700 text-white w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center hover:scale-110 group"
          aria-label="Help & Support"
        >
          {isHelpOpen ? (
            <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <>
              <svg className="w-7 h-7 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default HelpSupport;