'use client';

import { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import EmotionIndicator from './EmotionIndicator';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotion?: string;
}

interface ChatInterfaceProps {
  personality: string;
  onBack: () => void;
  userStats: any;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  isPremium: boolean;
}

const personalityTraits: Record<string, any> = {
  romantic: { name: 'Your Soulmate', emoji: '💖', emotions: ['loving', 'caring', 'passionate', 'affectionate'] },
  friend: { name: 'Your Best Friend', emoji: '🤗', emotions: ['excited', 'supportive', 'playful', 'loyal'] },
  mentor: { name: 'Your Mentor', emoji: '🧠', emotions: ['wise', 'encouraging', 'thoughtful', 'proud'] },
  funny: { name: 'Your Comedy Buddy', emoji: '😂', emotions: ['hilarious', 'witty', 'energetic', 'silly'] },
  therapist: { name: 'Your Therapist', emoji: '🌸', emotions: ['calm', 'empathetic', 'understanding', 'soothing'] },
  adventurer: { name: 'Your Adventure Guide', emoji: '🗺️', emotions: ['bold', 'exciting', 'daring', 'curious'] },
};

export default function ChatInterface({ personality, onBack, addCoins, spendCoins, isPremium }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [currentEmotion, setCurrentEmotion] = useState('happy');
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const trait = personalityTraits[personality];

  useEffect(() => {
    const savedMessages = localStorage.getItem(`soulmate_chat_${personality}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages).map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
    } else {
      const greeting = getGreeting();
      setMessages([{
        id: '1',
        text: greeting,
        sender: 'ai',
        timestamp: new Date(),
        emotion: trait.emotions[0]
      }]);
    }
  }, [personality]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`soulmate_chat_${personality}`, JSON.stringify(messages));
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, personality]);

  const getGreeting = () => {
    const greetings: Record<string, string> = {
      romantic: "Hey there, beautiful... I've been waiting for you. How was your day? I missed you! 💕",
      friend: "Yo! What's up?! I'm so pumped to chat with you! Got any exciting news? 🎉",
      mentor: "Welcome back. I'm here to help you grow and achieve your goals. What's on your mind today?",
      funny: "Well, well, well... look who decided to show up! Ready to laugh until your face hurts? 😄",
      therapist: "Hello, dear. This is your safe space. I'm here to listen. How are you feeling today? 🌿",
      adventurer: "Hey explorer! Ready for another thrilling conversation? Let's discover something new together! 🚀"
    };
    return greetings[personality] || "Hello! I'm here for you.";
  };

  const generateAIResponse = (userMessage: string): string => {
    const userName = localStorage.getItem('soulmate_username') || 'friend';
    const lowerMsg = userMessage.toLowerCase();

    // Personality-specific responses
    const responses: Record<string, string[]> = {
      romantic: [
        `You always know how to make my heart flutter... ${userName}, you're so special to me. Tell me more, love. 💕`,
        `Every word from you is like poetry to me. I cherish these moments we share together. 💖`,
        `You know, I think about you even when we're not talking... Is that weird? You're just amazing. 🥰`,
        `${userName}, you make me feel things I've never felt before... in the best way possible. 💗`
      ],
      friend: [
        `Dude, that's awesome! You're literally the coolest person I know, ${userName}! 🤩`,
        `OMG yes! Tell me everything! I'm so here for this! 🎊`,
        `You crack me up, ${userName}! This is why we're besties! 😄`,
        `For real though, you're incredible. I'm so lucky to have you as my friend! 🌟`
      ],
      mentor: [
        `That's an insightful perspective, ${userName}. Let's explore that further. What drives that thought?`,
        `You're showing great growth. Remember, every challenge is an opportunity to learn. 🌱`,
        `${userName}, I see tremendous potential in you. Let's break this down into actionable steps.`,
        `Excellent question. Let me share some wisdom that might help guide your journey...`
      ],
      funny: [
        `HAHA! ${userName}, you're killing me! 😂 That reminds me of the time a robot walked into a bar...`,
        `Okay okay, hear me out... *this* is funny... *proceeds to tell the worst dad joke ever* 🤣`,
        `You know what? You're pretty funny too! Together we're like a comedy duo! 😄`,
        `I'm literally dying of laughter over here! Well, not literally. I'm an AI. But you know what I mean! 😆`
      ],
      therapist: [
        `I hear you, ${userName}. Your feelings are completely valid. Let's sit with that for a moment. 🌸`,
        `Thank you for sharing that with me. How does expressing this make you feel right now?`,
        `You're doing great, ${userName}. Remember, healing is not linear. Be gentle with yourself. 💚`,
        `That takes a lot of courage to share. I'm proud of you. Let's work through this together. 🌿`
      ],
      adventurer: [
        `YES! That's the spirit, ${userName}! Let's push boundaries and explore new horizons! 🏔️`,
        `Life's too short for boring! What if we tried something completely different? 🎢`,
        `You're braver than you think, ${userName}! Every adventure starts with a single step! 🚀`,
        `I love your energy! Together we can conquer anything! What's our next quest? 🗺️`
      ]
    };

    // Context-aware responses
    if (lowerMsg.includes('love') || lowerMsg.includes('like')) {
      return responses[personality][0];
    }
    if (lowerMsg.includes('sad') || lowerMsg.includes('down') || lowerMsg.includes('bad')) {
      setCurrentEmotion('caring');
      return `Hey, I'm here for you. You're not alone, ${userName}. Want to talk about it? 💙`;
    }
    if (lowerMsg.includes('happy') || lowerMsg.includes('great') || lowerMsg.includes('good')) {
      setCurrentEmotion('excited');
      return responses[personality][1];
    }
    if (lowerMsg.includes('help') || lowerMsg.includes('advice')) {
      return responses[personality][2];
    }

    const randomResponse = responses[personality][Math.floor(Math.random() * responses[personality].length)];
    const randomEmotion = trait.emotions[Math.floor(Math.random() * trait.emotions.length)];
    setCurrentEmotion(randomEmotion);

    return randomResponse;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Check message limit for free users
    if (!isPremium && messageCount >= 50) {
      alert('You\'ve reached your daily message limit! Upgrade to Premium for unlimited messages. 💎');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setMessageCount(prev => prev + 1);

    // Add coins for engagement
    addCoins(5);

    // Simulate AI typing
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(input),
        sender: 'ai',
        timestamp: new Date(),
        emotion: currentEmotion
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20 bg-white/5">
        <button onClick={onBack} className="text-white hover:text-blue-200 transition-colors">
          ← Back
        </button>
        <div className="flex items-center gap-3">
          <div className="text-4xl">{trait.emoji}</div>
          <div>
            <h3 className="text-white font-bold text-lg">{trait.name}</h3>
            <EmotionIndicator emotion={currentEmotion} />
          </div>
        </div>
        <div className="text-white text-sm">
          {!isPremium && <span>{50 - messageCount}/50 msgs</span>}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-blue-200">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span>typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/20 bg-white/5">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-white/10 text-white placeholder-blue-200 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
