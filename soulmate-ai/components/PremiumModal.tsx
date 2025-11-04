interface PremiumModalProps {
  onClose: () => void;
  onUpgrade: () => void;
  currentCoins: number;
}

export default function PremiumModal({ onClose, onUpgrade, currentCoins }: PremiumModalProps) {
  const features = [
    { icon: '💬', text: 'Unlimited Messages', free: '50/day', premium: '∞' },
    { icon: '🎭', text: 'All Personalities', free: '6', premium: '20+' },
    { icon: '🎙️', text: 'Voice Chat', free: '❌', premium: '✅' },
    { icon: '📸', text: 'Photo Reactions', free: '❌', premium: '✅' },
    { icon: '🧠', text: 'Advanced Memory', free: 'Basic', premium: 'Deep' },
    { icon: '📖', text: 'Story Generator', free: '❌', premium: '✅' },
    { icon: '🎨', text: 'Custom Avatars', free: '❌', premium: '✅' },
    { icon: '🚫', text: 'No Ads', free: '❌', premium: '✅' },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-yellow-400/50">
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">⭐</div>
          <h2 className="text-4xl font-bold text-white mb-2">Upgrade to Premium</h2>
          <p className="text-blue-200">Unlock the full SoulMate AI experience</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-white">
                <span className="text-2xl">{feature.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold">{feature.text}</div>
                  <div className="text-xs text-blue-200">
                    Free: {feature.free} → Premium: {feature.premium}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 rounded-xl p-4 border border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">$4.99/month</div>
              <div className="text-blue-200 text-sm">Monthly Plan</div>
              <button
                onClick={onUpgrade}
                className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                Subscribe Now
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border-2 border-yellow-400">
            <div className="text-center">
              <div className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                BEST VALUE
              </div>
              <div className="text-2xl font-bold text-white mb-1">$39.99/year</div>
              <div className="text-blue-200 text-sm">Save 33%!</div>
              <button
                onClick={onUpgrade}
                className="mt-4 w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                Get Yearly
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <div className="text-white font-semibold mb-2">Or unlock with coins!</div>
          <button
            onClick={() => {
              if (currentCoins >= 5000) {
                if (confirm('Unlock Premium for 30 days with 5000 coins?')) {
                  onUpgrade();
                }
              } else {
                alert('You need 5000 coins to unlock Premium!');
              }
            }}
            className="bg-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors"
          >
            💰 5000 Coins for 30 Days
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full text-blue-200 hover:text-white transition-colors"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
}
