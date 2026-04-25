import { useState } from 'react';
import FlashCard from './FlashCard';
import { WEB_CARDS } from '../data/web-cards.js';

export default function WebTrack({ color }) {
  const [cat, setCat] = useState(0);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {WEB_CARDS.map((c, i) => (
          <button
            key={i}
            onClick={() => setCat(i)}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border"
            style={{
              borderColor: cat === i ? color : '#222',
              background: cat === i ? `${color}20` : 'transparent',
              color: cat === i ? color : '#666',
            }}
          >
            {c.category}
          </button>
        ))}
      </div>
      <div className="text-xs text-[#555] mb-3.5">
        Tap any card to expand the full explanation. Hit <span style={{ color }}>Quiz</span> to test yourself before reading.
      </div>
      {WEB_CARDS[cat].cards.map((card, i) => (
        <FlashCard key={i} card={card} color={color} />
      ))}
    </div>
  );
}
