import { useParams, Link } from "react-router-dom";
import {
  ChevronRight,
  PlayCircle,
  BookOpen,
  Map,
  Target,
  Swords,
  Database,
  Link as LinkIcon,
} from "lucide-react";
import { allGamesGuides } from "@/content";

const iconMap: Record<string, React.ElementType> = {
  Map,
  Target,
  Swords,
  Database,
  Link: LinkIcon,
};

export function GameHub() {
  const { gameId } = useParams();
  const game = allGamesGuides[gameId as keyof typeof allGamesGuides] as any;

  if (!game) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-3xl font-black text-slate-400 dark:text-slate-600">
            Jeu introuvable
          </p>
          <Link to="/guides" className="text-red-600 font-bold hover:underline">
            Retour à la liste des jeux
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="relative overflow-hidden flex flex-col md:flex-row gap-10 items-center mb-16 bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-red-500/5 rounded-full border-20 border-red-500/5 blur-xl pointer-events-none" />

        {game.coverImage && (
          <div className="relative z-10 shrink-0">
            <img
              src={game.coverImage}
              alt={game.title}
              className="w-56 h-56 md:w-72 md:h-72 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="flex-1 text-center md:text-left relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm mb-4 border-2 border-slate-200 dark:border-slate-700 uppercase tracking-wider">
            Génération {game.generation}
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white">
            {game.title}
          </h1>

          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-10 font-medium max-w-2xl">
            {game.description}
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {game.mainLinks?.text && (
              <Link
                to={`/guides/${game.id}/soluce/${game.mainLinks.text}`}
                className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-red-700 hover:scale-105 transition-all shadow-xl shadow-red-500/20"
              >
                <BookOpen className="w-6 h-6" />
                Solution Complète
              </Link>
            )}

            {game.mainLinks?.video && (
              <a
                href={game.mainLinks.video}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-slate-900 dark:bg-slate-800 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-slate-800 dark:hover:bg-slate-700 hover:scale-105 transition-all shadow-xl"
              >
                <PlayCircle className="w-6 h-6" />
                Solution Vidéo
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
        {game.categories?.map((category: any, index: number) => {
          const Icon = iconMap[category.icon] || ChevronRight;

          return (
            <div
              key={index}
              className="border-2 border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-lg transition-all group"
            >
              <div className="bg-slate-50 dark:bg-slate-800/50 border-b-2 border-slate-200 dark:border-slate-800 px-6 py-5 flex items-center gap-4">
                <div className="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 p-3 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  {category.title}
                </h2>
              </div>

              <div className="p-3">
                <ul className="space-y-1">
                  {category.links?.map((link: any, linkIndex: number) => (
                    <li key={linkIndex}>
                      <Link
                        to={`/guides/${game.id}/soluce/${link.slug}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-all font-bold"
                      >
                        <ChevronRight className="w-5 h-5 opacity-40 shrink-0" />
                        <span className="truncate">{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
