import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { allGamesGuides } from "@/content";

export function Games() {
  const games = Object.values(allGamesGuides);

  const gamesByGeneration = games.reduce(
    (acc, game) => {
      const gen = game.generation || 0;
      if (!acc[gen]) {
        acc[gen] = [];
      }
      acc[gen].push(game);
      return acc;
    },
    {} as Record<number, typeof games>,
  );

  const sortedGenerations = Object.keys(gamesByGeneration)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4">
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white">
          Guides des <span className="text-red-600">Jeux</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Sélectionnez une aventure pour accéder à sa soluce complète et ses
          secrets.
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-24">
        {sortedGenerations.map((generation) => (
          <section key={generation}>
            <div className="flex items-center gap-6 mb-10">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white shrink-0">
                Génération <span className="text-red-600">{generation}</span>
              </h2>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gamesByGeneration[generation].map((game: any) => (
                <Link
                  key={game.id}
                  to={`/jeux/${game.id}`}
                  className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-red-500/50 transition-all duration-300"
                >
                  <div className="w-full h-64 bg-slate-50 dark:bg-slate-800/30 relative flex items-center justify-center p-8 overflow-hidden border-b-2 border-slate-100 dark:border-slate-800">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-slate-200/80 dark:from-slate-700/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {game.coverImage ? (
                      <img
                        src={game.coverImage}
                        alt={game.title}
                        className="w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500 relative z-10"
                      />
                    ) : (
                      <span className="text-slate-400 dark:text-slate-600 font-black text-xl uppercase tracking-widest relative z-10">
                        Image manquante
                      </span>
                    )}
                  </div>

                  <div className="p-8 flex-1 flex flex-col relative z-20">
                    <h3 className="text-2xl font-black mb-3 text-slate-900 dark:text-white group-hover:text-red-600 transition-colors leading-tight">
                      {game.title}
                    </h3>

                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed flex-1">
                      {game.description}
                    </p>

                    <div className="mt-8 inline-flex items-center text-red-600 font-bold text-lg">
                      Voir le guide
                      <ChevronRight className="w-6 h-6 ml-1 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
