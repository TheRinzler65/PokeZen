import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Wrench } from "lucide-react";

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="relative z-50 w-full border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 bg-red-600 rounded-full flex items-center justify-center border-2 border-slate-200 dark:border-slate-700 shadow-sm group-hover:rotate-180 transition-transform duration-500 overflow-hidden">
            <div className="absolute w-full h-1 bg-slate-200 dark:bg-slate-700" />
            <div className="relative z-10 w-3 h-3 bg-white rounded-full border-2 border-slate-200 dark:border-slate-700" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
            Poké<span className="text-red-600">Zen</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/"
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl font-bold transition-all ${
              location.pathname === "/"
                ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline">Accueil</span>
          </Link>

          <Link
            to="/guides"
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl font-bold transition-all ${
              isActive("/guides")
                ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="hidden md:inline">Guides</span>
          </Link>

          <Link
            to="/outils"
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl font-bold transition-all ${
              isActive("/outils") || isActive("/find")
                ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Wrench className="w-5 h-5" />
            <span className="hidden md:inline">Outils</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
