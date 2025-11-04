interface StatsProps {
  stats: {
    coins: number;
    xp: number;
    level: number;
    streak: number;
    isPremium: boolean;
  };
}

export default function StatsPanel({ stats }: StatsProps) {
  const xpProgress = (stats.xp % 1000) / 10;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-white/20">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="text-center">
          <div className="text-3xl mb-1">💰</div>
          <div className="text-2xl font-bold text-white">{stats.coins}</div>
          <div className="text-xs text-blue-200">Coins</div>
        </div>

        <div className="text-center">
          <div className="text-3xl mb-1">⚡</div>
          <div className="text-2xl font-bold text-white">{stats.xp}</div>
          <div className="text-xs text-blue-200">XP</div>
        </div>

        <div className="text-center">
          <div className="text-3xl mb-1">🏆</div>
          <div className="text-2xl font-bold text-white">Lvl {stats.level}</div>
          <div className="text-xs text-blue-200">Level</div>
        </div>

        <div className="text-center">
          <div className="text-3xl mb-1">🔥</div>
          <div className="text-2xl font-bold text-white">{stats.streak}</div>
          <div className="text-xs text-blue-200">Day Streak</div>
        </div>

        <div className="text-center">
          <div className="text-3xl mb-1">{stats.isPremium ? '⭐' : '🆓'}</div>
          <div className="text-lg font-bold text-white">{stats.isPremium ? 'Premium' : 'Free'}</div>
          <div className="text-xs text-blue-200">Status</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-blue-200 mb-1">
          <span>Progress to Level {stats.level + 1}</span>
          <span>{xpProgress.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${xpProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
