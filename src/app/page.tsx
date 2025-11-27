'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getQuests } from '@/lib/api';

export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      // Search using the API
      const { data } = await getQuests(query.trim());
      console.log('search data', data);

      if (data.length === 1) {
        // If exactly one result, go directly to mission page
        router.push(`/quest/${data[0].slug}`);
      } else {
        // If 0 or multiple results, go to results page with query
        router.push(`/results?q=${encodeURIComponent(query.trim())}`);
      }
    } catch (error) {
      console.error('Search failed:', error);
      // On error, go to results page
      router.push(`/results?q=${encodeURIComponent(query.trim())}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <main className="w-full max-w-4xl">
        <div className="text-center mb-8 md:mb-12 space-y-3 md:space-y-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r from-yellow-400 to-amber-500 animate-[pulse_3s_ease-in-out_infinite]">
            WoW Questly
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-neutral-400">
            Discover your next adventure in Azeroth
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative group">
          <div className="relative flex items-center bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800 overflow-hidden shadow-xl shadow-black/50">
            <span className="pl-4 md:pl-6 text-neutral-500 text-xl md:text-2xl">🔍</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search quests, zones, or keywords..."
              className="flex-1 px-4 py-4 md:px-6 md:py-6 text-base md:text-lg bg-transparent border-0 focus:outline-none text-white placeholder-neutral-600"
              autoFocus
            />
            {/* <button
              type="submit"
              disabled={loading}
              className="hidden lg:flex m-2 px-8 py-4 bg-linear-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-500 disabled:from-yellow-400 disabled:to-amber-500 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all duration-200 shadow-sm shadow-black/50 hover:shadow-md hover:shadow-yellow-900/40 transform hover:scale-102 disabled:transform-none disabled:opacity-70 min-w-[140px] h-14 items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Search'
              )}
            </button> */}
          </div>
        </form>

        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center">
          <div className="bg-zinc-900/40 backdrop-blur-sm rounded-lg p-5 md:p-6 border border-zinc-800">
            <div className="text-4xl md:text-3xl mb-3 md:mb-2">⚔️</div>
            <h3 className="font-semibold text-base md:text-lg mb-1">Epic Quests</h3>
            <p className="text-neutral-500 text-xs md:text-sm">Find legendary missions</p>
          </div>
          <div className="bg-zinc-900/40 backdrop-blur-sm rounded-lg p-5 md:p-6 border border-zinc-800">
            <div className="text-4xl md:text-3xl mb-3 md:mb-2">🗺️</div>
            <h3 className="font-semibold text-base md:text-lg mb-1">All Zones</h3>
            <p className="text-neutral-500 text-xs md:text-sm">Explore every region</p>
          </div>
          <div className="bg-zinc-900/40 backdrop-blur-sm rounded-lg p-5 md:p-6 border border-zinc-800">
            <div className="text-4xl md:text-3xl mb-3 md:mb-2">🎮</div>
            <h3 className="font-semibold text-base md:text-lg mb-1">All Expansions</h3>
            <p className="text-neutral-500 text-xs md:text-sm">Classic to Dragonflight</p>
          </div>
        </div>
      </main>
    </div>
  );
}
