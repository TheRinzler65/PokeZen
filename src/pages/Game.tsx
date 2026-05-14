import { Link } from "react-router-dom";
import { allGamesGuides } from "@/content";
import { ChevronRight, Gamepad2 } from "lucide-react";

export function Games() {
  const games = Object.values(allGamesGuides) as any[];

  const gamesByGeneration = games.reduce(
    (acc: Record<string, any[]>, game: any) => {
      const gen = game.generation || "Autres";
      if (!acc[gen]) {
        acc[gen] = [];
      }
      acc[gen].push(game);
      return acc;
    },
    {},
  );

  const generations = Object.keys(gamesByGeneration).sort();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4">
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white">
          Guides des <span className="text-red-600">Jeux</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Retrouvez nos soluces complètes classées par génération.
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {generations.length > 0 ? (
          generations.map((gen) => (
            <div key={gen} className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white whitespace-nowrap">
                  Génération {gen}
                </h2>
                <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gamesByGeneration[gen].map((game: any) => (
                  <Link
                    key={game.id}
                    to={`/jeux/${game.id}`}
                    className="group relative bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-600 border-2 border-red-100 dark:border-red-900/30 group-hover:scale-110 transition-transform">
                        <Gamepad2 className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-red-600 transition-colors">
                          {game.title}
                        </h3>
                        <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">
                          {game.region}
                        </p>
                      </div>
                      <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <Gamepad2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-2xl font-bold text-slate-400">
              Aucun guide disponible pour le moment.
            </p>
            <p className="text-slate-500 mt-2">
              Rinzler prépare les soluces, repasse plus tard !
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
