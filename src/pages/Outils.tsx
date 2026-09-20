import { Link } from "react-router-dom";
import {
  Swords,
  ListChecks,
  ShieldAlert,
  ChevronRight,
  Search,
} from "lucide-react";

export function Outils() {
  const tools = [
    {
      id: "finder",
      title: "Pokémon Finder",
      description:
        "Recherchez un Pokémon pour tout savoir sur ses statistiques et ses lieux d'apparition exacts.",
      icon: Search,
      color: "text-tool-finder",
      bg: "bg-tool-finder-muted",
      border: "hover:border-tool-finder-border",
      isReady: true,
      path: "/find",
    },
    {
      id: "team-builder",
      title: "Team Builder",
      description:
        "Créez votre équipe de 6 Pokémon et analysez instantanément vos faiblesses, résistances et immunités.",
      icon: Swords,
      color: "text-tool-team",
      bg: "bg-tool-team-muted",
      border: "hover:border-tool-team-border",
      isReady: true,
      path: "/outils/team-builder",
    },
    {
      id: "checklist",
      title: "Pokédex Tracker",
      description:
        "Cochez les Pokémon que vous avez capturés. Votre progression est sauvegardée automatiquement.",
      icon: ListChecks,
      color: "text-tool-pokedex",
      bg: "bg-tool-pokedex-muted",
      border: "hover:border-tool-pokedex-border",
      isReady: true,
      path: "/outils/checklist",
    },
    {
      id: "nuzlocke",
      title: "Nuzlocke Tracker",
      description:
        "Gérez vos runs Nuzlocke. Notez vos rencontres par route et suivez les Pokémon tombés au combat.",
      icon: ShieldAlert,
      color: "text-tool-nuzlocke",
      bg: "bg-tool-nuzlocke-muted",
      border: "hover:border-tool-nuzlocke-border",
      isReady: true,
      path: "/outils/nuzlocke",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4">
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white">
          La Boîte à <span className="text-brand">Outils</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Des applications pensées par des dresseurs, pour des dresseurs.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            to={tool.isReady ? tool.path : "#"}
            className={`group relative flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 p-8 shadow-sm transition-all duration-300 ${
              tool.isReady
                ? `hover:shadow-xl hover:-translate-y-2 ${tool.border}`
                : "opacity-75 cursor-not-allowed"
            }`}
          >
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${tool.bg} ${tool.color} group-hover:scale-110 group-hover:rotate-3 transition-transform`}
            >
              <tool.icon className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
              {tool.title}
            </h2>

            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed flex-1">
              {tool.description}
            </p>

            <div className="mt-8 flex items-center justify-between">
              {tool.isReady ? (
                <span
                  className={`font-bold text-lg flex items-center gap-1 ${tool.color}`}
                >
                  Lancer l'outil
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              ) : (
                <span className="font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl text-sm">
                  En développement
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
