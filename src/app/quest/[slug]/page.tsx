import { getQuest } from '@/lib/api';
import { notFound } from 'next/navigation';
import { QuestBadge } from '@/components/QuestBadge';

export default async function QuestPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let quest;
  try {
    const { data } = await getQuest(slug);
    quest = data;
    console.log(quest);
  } catch {
    notFound();
  }

  // Calculate WoW currency from copper
  const formatRewards = (copper: number) => {
    const gold = Math.floor(copper / 10000);
    const silver = Math.floor((copper % 10000) / 100);
    const copperRemaining = copper % 100;

    const parts = [];
    if (gold > 0) parts.push(`${gold}g`);
    if (silver > 0) parts.push(`${silver}s`);
    if (copperRemaining > 0 || parts.length === 0) parts.push(`${copperRemaining}c`);

    return parts.join(' ');
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <a
          href="/"
          className="inline-block mb-6 text-amber-400 hover:text-amber-300 transition-colors"
        >
          ← Back to search
        </a>

        <article className="max-w-4xl mx-auto">
          {/* Header Card */}
          <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl p-8 border border-amber-500/30 shadow-xl shadow-amber-500/10 mb-6">
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-amber-400 to-yellow-300">
              {quest.name}
            </h1>

            <div className="flex flex-wrap gap-2 text-sm">
              <QuestBadge>
                ⭐ <strong>Level:</strong> {quest.level}
              </QuestBadge>
              <QuestBadge>
                🏳️ <strong>Faction:</strong> {quest.faction}
              </QuestBadge>
              {quest.zone && (
                <QuestBadge>
                  📍 <strong>Zone:</strong> {quest.zone}
                </QuestBadge>
              )}
              {quest.expansion && (
                <QuestBadge>
                  🎮 <strong>Expansion:</strong> {quest.expansion}
                </QuestBadge>
              )}
              {quest.coords && (
                <QuestBadge>
                  🗺️ <strong>Coords:</strong> {quest.coords.x}, {quest.coords.y}
                </QuestBadge>
              )}
              <QuestBadge>
                💰 <strong>Rewards:</strong> {formatRewards(quest.rewards)}
              </QuestBadge>
            </div>
            {quest.youtubeId && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4 text-amber-400">🎥 Video Guide</h2>
                <div className="aspect-video rounded-lg overflow-hidden border border-zinc-700">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${quest.youtubeId}`}
                    title="Mission guide"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Objectives Card */}
            {quest.objective && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4 text-amber-400">✓ Objective</h2>
                <p className="text-neutral-400 text-lg leading-relaxed whitespace-pre-line">
                  {quest.objective}
                </p>
              </div>
            )}

            {/* Description Card */}
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4 text-amber-400">📜 Description</h2>
              <p className="text-neutral-400 text-lg leading-relaxed whitespace-pre-line">
                {quest.description}
              </p>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
