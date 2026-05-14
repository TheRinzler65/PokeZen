import { Link } from "react-router-dom";
import { Wrench, BookOpen, Sparkles, Target, Map } from "lucide-react";
import { allGamesGuides } from "@/content";

export function Home() {
  const games = Object.values(allGamesGuides);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="relative overflow-hidden border-b-4 border-red-500 bg-white dark:bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent" />
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-red-500/10 rounded-full border-20 border-red-500/10 blur-xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-bold mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm tracking-wide uppercase">
                Le Wiki Ultime
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white">
              Bienvenue sur{" "}
              <span className="text-red-600 drop-shadow-sm">PokéZen</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10 font-medium">
              Soluces complètes, Localisations précises et Astuces de pro pour
              dominer toutes les régions Pokémon.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/outils"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-700 hover:scale-105 transition-all shadow-lg shadow-red-500/30"
              >
                <Wrench className="w-5 h-5" />
                Boîte à Outils
              </Link>

              <Link
                to="/guides"
                className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-8 py-4 rounded-2xl font-bold hover:border-red-500 hover:text-red-500 transition-all shadow-sm"
              >
                <BookOpen className="w-5 h-5" />
                Guides des Jeux
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <BookOpen className="w-10 h-10 text-blue-500 mb-4 relative z-10" />
            <p className="text-5xl font-black text-slate-900 dark:text-white mb-2 relative z-10">
              {games.length}
            </p>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-sm relative z-10">
              Jeux disponibles
            </p>
          </div>

          <div className="rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-yellow-500/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <Target className="w-10 h-10 text-yellow-500 mb-4 relative z-10" />
            <p className="text-5xl font-black text-slate-900 dark:text-white mb-2 relative z-10">
              1000+
            </p>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-sm relative z-10">
              Pokémon référencés
            </p>
          </div>

          <div className="rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-500/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <Map className="w-10 h-10 text-green-500 mb-4 relative z-10" />
            <p className="text-5xl font-black text-slate-900 dark:text-white mb-2 relative z-10">
              100%
            </p>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-sm relative z-10">
              Routes cartographiées
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 mb-12">
        <div className="rounded-[2.5rem] border-4 border-red-100 dark:border-red-900/30 bg-linear-to-br from-red-500 to-red-700 p-10 md:p-16 overflow-hidden relative shadow-2xl shadow-red-500/20">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -right-10 -bottom-10 w-64 h-64 border-30 border-white/10 rounded-full" />

          <div className="relative z-10 max-w-2xl text-white">
            <h2 className="text-4xl md:text-5xl font-black mb-6 drop-shadow-md">
              La Boîte à Outils
            </h2>
            <p className="text-lg md:text-xl text-red-100 mb-10 font-medium leading-relaxed">
              Découvrez nos applications conçues pour les dresseurs : Pokémon
              Finder, Team Builder, Nuzlocke Tracker et Pokédex de capture. Tout
              ce dont vous avez besoin pour votre aventure !
            </p>
            <Link
              to="/outils"
              className="inline-flex items-center gap-3 bg-white text-red-600 px-8 py-4 rounded-2xl font-black text-lg hover:bg-red-50 hover:scale-105 transition-all shadow-xl"
            >
              <Wrench className="w-6 h-6" />
              Découvrir les Outils
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
