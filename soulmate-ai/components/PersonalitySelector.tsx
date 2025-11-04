'use client';

interface PersonalitySelectorProps {
  onSelect: (personality: string) => void;
}

const personalities = [
  { id: 'romantic', name: 'Romantic Partner', emoji: '💖', desc: 'Loving, caring, and affectionate', color: 'from-pink-500 to-rose-500' },
  { id: 'friend', name: 'Best Friend', emoji: '🤗', desc: 'Fun, supportive, and always there', color: 'from-blue-500 to-cyan-500' },
  { id: 'mentor', name: 'Life Mentor', emoji: '🧠', desc: 'Wise, motivating, and insightful', color: 'from-purple-500 to-indigo-500' },
  { id: 'funny', name: 'Comedy Buddy', emoji: '😂', desc: 'Hilarious, witty, and entertaining', color: 'from-yellow-500 to-orange-500' },
  { id: 'therapist', name: 'Emotional Support', emoji: '🌸', desc: 'Empathetic, calming, and understanding', color: 'from-green-500 to-teal-500' },
  { id: 'adventurer', name: 'Adventure Guide', emoji: '🗺️', desc: 'Bold, exciting, and spontaneous', color: 'from-red-500 to-pink-500' },
];

export default function PersonalitySelector({ onSelect }: PersonalitySelectorProps) {
  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-3">Choose Your Companion</h2>
        <p className="text-blue-200 text-lg">Select the personality that fits your mood</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personalities.map((personality) => (
          <button
            key={personality.id}
            onClick={() => onSelect(personality.id)}
            className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${personality.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity`}></div>

            <div className="relative">
              <div className="text-6xl mb-4">{personality.emoji}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{personality.name}</h3>
              <p className="text-blue-200">{personality.desc}</p>

              <div className="mt-4 inline-block bg-white/20 px-4 py-1 rounded-full text-sm text-white">
                Start Chat →
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
