import type { ReactNode } from 'react';

interface QuestBadgeProps {
  children: ReactNode;
}

export function QuestBadge({ children }: QuestBadgeProps) {
  return (
    <span className="px-4 py-2 bg-zinc-800/50 rounded-lg border border-zinc-700">
      {children}
    </span>
  );
}
