import { Link } from "react-router-dom";
import { GitBranch, X, Globe, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t-4 border-red-500 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-8 h-8 bg-red-600 rounded-full flex items-center justify-center border-2 border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                <div className="absolute w-full h-0.5 bg-slate-200 dark:bg-slate-700" />
                <div className="relative z-10 w-2 h-2 bg-white rounded-full border-2 border-slate-200 dark:border-slate-700" />
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
                Poké<span className="text-red-600">Zen</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              La plateforme ultime pour les dresseurs Pokémon. Guides, outils et
              ressources communautaires créés par des fans.
            </p>
          </div>

          <div>
            <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-sm mb-6">
              Navigation
            </h3>
            <ul className="space-y-4 font-bold text-slate-500 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-red-600 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/guides"
                  className="hover:text-red-600 transition-colors"
                >
                  Guides des Jeux
                </Link>
              </li>
              <li>
                <Link
                  to="/outils"
                  className="hover:text-red-600 transition-colors"
                >
                  Boîte à Outils
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-sm mb-6">
              Outils Populaires
            </h3>
            <ul className="space-y-4 font-bold text-slate-500 dark:text-slate-400">
              <li>
                <Link
                  to="/find"
                  className="hover:text-red-600 transition-colors"
                >
                  Pokémon Finder
                </Link>
              </li>
              <li>
                <Link
                  to="/outils/team-builder"
                  className="hover:text-red-600 transition-colors"
                >
                  Team Builder
                </Link>
              </li>
              <li>
                <Link
                  to="/outils/nuzlocke"
                  className="hover:text-red-600 transition-colors"
                >
                  Nuzlocke Tracker
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-sm mb-6">
              Suivre le projet
            </h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-red-600 hover:text-white transition-all shadow-sm group"
              >
                <GitBranch className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-red-600 hover:text-white transition-all shadow-sm group"
              >
                <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-red-600 hover:text-white transition-all shadow-sm group"
              >
                <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t-2 border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 dark:text-slate-500 font-bold text-sm">
            © {currentYear} PokéZen. Tous droits réservés.
          </p>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-5 py-2.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm group hover:border-red-500/50 transition-colors">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
              Créé avec
            </span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              par <span className="text-red-600">Rinzler</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
