interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotion?: string;
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
      <div
        className={`max-w-[70%] rounded-2xl px-5 py-3 ${
          isUser
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
            : 'bg-white/20 text-white border border-white/30'
        }`}
      >
        <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
        {message.emotion && !isUser && (
          <div className="text-xs text-blue-200 mt-2 italic">
            feeling {message.emotion}
          </div>
        )}
        <div className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-blue-300'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
