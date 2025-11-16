import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CalBookingWidget from "@/components/ui/CalBookingWidget";

// Import your Sierra images (add these to your assets folder)
import sierraAvatar from "@/assets/Sierra_AI_agent_new.png";
import sierraThinking from "@/assets/Sierra_AI_agent_thinking.png";

interface Message {
  content: string;
  isUser: boolean;
  hasBookingWidget?: boolean;
  isStreaming?: boolean;
}

const SierraChatbot = () => {
  console.log("🤖 SierraChatbot component mounted");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [sessionId] = useState(() => 
    `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );
  const [sessionInitialized, setSessionInitialized] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Show welcome popup after 2 seconds
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Auto-dismiss welcome popup after 10 seconds
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
        sessionStorage.setItem('hasSeenWelcome', 'true');
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  const dismissWelcome = () => {
    setShowWelcome(false);
    sessionStorage.setItem('hasSeenWelcome', 'true');
  };

  const openChatFromWelcome = () => {
    dismissWelcome();
    setIsOpen(true);
  };

  const convertLinksToHTML = (text: string) => {
    // Convert markdown links [text](url) to HTML
    let converted = text.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary underline">$1</a>'
    );
    
    // Convert plain URLs to clickable links
    converted = converted.replace(
      /https?:\/\/[^\s]+/g,
      (url) => {
        const cleanUrl = url.replace(/[.,;!?]+$/, '');
        const trailing = url.substring(cleanUrl.length);
        return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="text-primary underline">${cleanUrl}</a>${trailing}`;
      }
    );
    
    return converted;
  };

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { content: message, isUser: true }]);
    setInputValue("");
    setIsTyping(true);

    // Create a placeholder for the streaming message
    const messageIndex = messages.length + 1; // +1 because we just added user message
    setMessages(prev => [...prev, { content: "", isUser: false, isStreaming: true }]);
    setIsTyping(false); // Stop typing indicator, start streaming

    try {
      let messageToSend = message;
      
      if (!sessionInitialized) {
        messageToSend = `Hi! I'm interested in learning about Andrew Girgis. ${message}`;
        setSessionInitialized(true);
      }

      const response = await fetch('https://n8n.andrew-girgis.com/webhook/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'sendMessage',
          sessionId: sessionId,
          chatInput: messageToSend
        }),
        mode: 'cors',
        credentials: 'omit'
      });

      if (response.ok) {
        const text = await response.text();
        const lines = text.trim().split('\n');
        let botResponse = "";
        let hasBookingWidget = false;
        let foundOutput = false;

        // Parse response to find the output
        for (const line of lines.reverse()) {
          if (line.trim() === '') continue;
          
          try {
            const parsed = JSON.parse(line);
            
            if (parsed.output) {
              botResponse = parsed.output;
              foundOutput = true;
              
              if (parsed.action === 'show_booking_widget') {
                hasBookingWidget = true;
              }
              
              // Check for Cal.com embed
              if (botResponse.includes('app.cal.com') || botResponse.includes('Cal.ns[')) {
                hasBookingWidget = true;
                botResponse = "I'd be happy to help you book a meeting with Andrew! Here's his calendar:";
              }
              break;
            }
            
            if (parsed.type === 'item' && parsed.content) {
              try {
                const contentJson = JSON.parse(parsed.content);
                if (contentJson.output) {
                  botResponse = contentJson.output;
                  foundOutput = true;
                  
                  if (contentJson.action === 'show_booking_widget') {
                    hasBookingWidget = true;
                  }
                  break;
                }
              } catch (e) {
                continue;
              }
            }
          } catch (e) {
            continue;
          }
        }

        if (!foundOutput) {
          botResponse = "I'm sorry, I couldn't process that request. Please try again.";
        }

        // Check for booking keywords
        if (!hasBookingWidget) {
          const bookingKeywords = ['book', 'appointment', 'meeting', 'schedule', 'calendar'];
          const responseText = botResponse.toLowerCase();
          if (bookingKeywords.some(keyword => responseText.includes(keyword))) {
            hasBookingWidget = true;
          }
        }

        // Stream the text character by character
        let currentText = "";
        const words = botResponse.split(' ');
        
        for (let i = 0; i < words.length; i++) {
          currentText += (i > 0 ? ' ' : '') + words[i];
          
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[messageIndex] = {
              content: currentText,
              isUser: false,
              isStreaming: i < words.length - 1,
              hasBookingWidget: i === words.length - 1 ? hasBookingWidget : undefined
            };
            return newMessages;
          });
          
          // Adjust delay based on word length (faster for short words)
          await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 20));
        }

      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[messageIndex] = {
          content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
          isUser: false
        };
        return newMessages;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isTyping) {
      sendMessage(inputValue);
    }
  };

  return (
    <>
      {/* Welcome Popup */}
      {showWelcome && !isOpen && (
        <div
          onClick={openChatFromWelcome}
          className="fixed bottom-32 right-4 sm:right-6 z-[1002] w-[90vw] sm:w-[500px] bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 rounded-xl shadow-2xl border border-primary cursor-pointer hover:shadow-primary/30 transition-all hover:-translate-y-1 animate-in slide-in-from-bottom-5 duration-500"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              <img 
                src={sierraAvatar} 
                alt="Sierra" 
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <div className="font-bold text-sm mb-0.5">Sierra</div>
                <div className="text-sm text-gray-200">
                  👋 Welcome to Andrew's portfolio! Click here to chat with me.
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 flex-shrink-0 hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                dismissWelcome();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[90vw] sm:w-96 h-[500px] bg-background border border-border rounded-lg shadow-2xl flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-card">
            <div className="flex items-center gap-2">
              <img 
                src={sierraAvatar} 
                alt="Sierra" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <h3 className="font-semibold text-foreground">Chat with Sierra</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div 
            ref={chatMessagesRef}
            className="flex-1 p-4 overflow-y-auto space-y-4"
          >
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm mt-8">
                <p className="mb-4">👋 Hi! I'm Sierra, Andrew's AI assistant.</p>
                <p>Ask me anything about Andrew's experience, projects, or skills!</p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div key={index}>
                <div
                  className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!message.isUser && (
                    <img 
                      src={message.isStreaming ? sierraThinking : sierraAvatar} 
                      alt="Sierra" 
                      className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                    />
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <div 
                      className="text-sm"
                      dangerouslySetInnerHTML={{ 
                        __html: message.isUser ? message.content : convertLinksToHTML(message.content)
                      }}
                    />
                    {!message.isUser && message.isStreaming && (
                      <span className="inline-block w-1 h-4 ml-1 bg-current animate-pulse" />
                    )}
                  </div>
                </div>
                {/* Show Cal.com booking widget if needed */}
                {!message.isUser && message.hasBookingWidget && (
                  <div className="mt-4 ml-11">
                    <CalBookingWidget 
                      calLink="andrew-girgis/30min"
                      layout="month_view"
                    />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <img 
                  src={sierraThinking} 
                  alt="Sierra thinking" 
                  className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
                />
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                disabled={isTyping}
                className="flex-1"
              />
              <Button 
                type="submit" 
                size="icon"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => {
          console.log("💬 Chat button clicked!");
          setIsOpen(!isOpen);
        }}
        className="fixed bottom-4 right-4 sm:right-6 z-[9999] h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-transform bg-primary hover:bg-primary/90"
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <img 
          src={sierraAvatar}
          alt="Sierra"
          className="h-15 w-15 rounded-full object-cover"
          aria-hidden="true"
          />
        )}
      </Button>
    </>
  );
};

export default SierraChatbot;