export interface QuestsResponse {
  message: string;
  count?: number;
  data: Quest[];
}

export interface QuestResponse {
  message: string;
  data: Quest;
}

export interface Quest {
  slug: string;
  name: string;
  nameLowerCase: string;
  description: string;
  descriptionLowerCase: string;
  objective?: string | null;
  zone?: string | null;
  expansion?: string | null;
  level: number;
  faction: 'Alliance' | 'Horde' | 'Both';
  coords?: any;
  youtubeId?: string | null;
  rewards: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getQuests(query: string): Promise<QuestsResponse> {
  const res = await fetch(`${API_URL}/quests?search=${encodeURIComponent(query)}`, {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch missions');
  }
  
  return res.json();
}

export async function getQuest(slug: string): Promise<QuestResponse> {
  const res = await fetch(`${API_URL}/quests/${slug}`, {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    throw new Error('Mission not found');
  }
  
  return res.json();
}
