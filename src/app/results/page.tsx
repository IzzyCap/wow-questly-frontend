'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getQuests, Quest } from '@/lib/api';
import { QuestBadge } from '@/components/QuestBadge';

function ResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      fetchMissions();
    }
  }, [query]);

  const fetchMissions = async () => {
    setLoading(true);
    try {
      const { data } = await getQuests(query);
      setQuests(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <a
          href="/"
          className="inline-block mb-6 text-amber-400 hover:text-amber-300 transition-colors"
        >
          ← Back to home
        </a>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-amber-400 to-yellow-300">
            Search Results
          </h1>
          <p className="text-neutral-500 mb-8">
            Showing results for: <span className="text-white font-semibold">"{query}"</span>
          </p>

          {loading ? (
            <div className="text-center text-neutral-500 py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mb-4"></div>
              <p>Searching missions...</p>
            </div>
          ) : quests.length > 0 ? (
            <>
              <p className="text-slate-400 mb-6">
                Found {quests.length} mission{quests.length !== 1 ? 's' : ''}
              </p>
              <div className="grid gap-4">
                {quests.map((mission) => (
                  <a
                    key={mission.slug}
                    href={`/quest/${mission.slug}`}
                    className="group bg-zinc-900/40 backdrop-blur-sm hover:bg-slate-750 rounded-xl p-6 transition-all duration-200 border border-zinc-800 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10"
                  >
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-amber-400 transition-colors">
                      {mission.name}
                    </h2>
                    <p className="text-white/70 mb-4 line-clamp-2 leading-relaxed">
                      {mission.description}
                    </p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      {mission.zone && (
                        <QuestBadge>
                          📍 {mission.zone}
                        </QuestBadge>
                      )}
                      {mission.expansion && (
                        <QuestBadge>
                          🎮 {mission.expansion}
                        </QuestBadge>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-neutral-500 bg-zinc-900/40 rounded-xl p-16">
              <div className="text-7xl mb-6">🔍</div>
              <h2 className="text-2xl font-semibold mb-2 text-white">No missions found</h2>
              <p className="text-lg mb-6">
                We couldn't find any missions matching <span className="text-amber-400">"{query}"</span>
              </p>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-linear-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold rounded-lg transition-all duration-200"
              >
                Try another search
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
