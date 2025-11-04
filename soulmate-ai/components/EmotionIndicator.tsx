interface EmotionIndicatorProps {
  emotion: string;
}

export default function EmotionIndicator({ emotion }: EmotionIndicatorProps) {
  const emotionEmojis: Record<string, string> = {
    happy: '😊',
    loving: '🥰',
    caring: '💗',
    passionate: '😍',
    excited: '🤩',
    supportive: '🤗',
    playful: '😄',
    wise: '🧙',
    encouraging: '💪',
    proud: '🌟',
    hilarious: '😂',
    witty: '😏',
    calm: '😌',
    empathetic: '🫂',
    understanding: '💚',
    bold: '🔥',
    curious: '🤔',
  };

  return (
    <div className="flex items-center gap-2 text-sm text-blue-200">
      <span>{emotionEmojis[emotion] || '😊'}</span>
      <span className="capitalize">Feeling {emotion}</span>
    </div>
  );
}
