import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Book } from "lucide-react";

interface SoluceLayoutProps {
  children: ReactNode;
  title: string;
  gameTitle: string;
  gameId: string;
  chapters: { slug: string; title: string }[];
}

export function SoluceLayout({
  children,
  title,
  gameTitle,
  gameId,
  chapters,
}: SoluceLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8">
      <main className="flex-1 min-w-0 bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm">
        <nav className="flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link
            to="/"
            className="hover:text-red-600 dark:hover:text-red-400 transition-colors shrink-0"
          >
            Accueil
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 shrink-0 opacity-50" />
          <Link
            to={`/guides/${gameId}`}
            className="hover:text-red-600 dark:hover:text-red-400 transition-colors capitalize shrink-0"
          >
            {gameTitle}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 shrink-0 opacity-50" />
          <span className="text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full truncate">
            {title}
          </span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-10 text-slate-900 dark:text-white border-b-4 border-red-500 pb-4 inline-block">
          {title}
        </h1>

        <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-black prose-a:text-red-600 hover:prose-a:text-red-500 prose-img:rounded-2xl prose-img:shadow-md">
          {children}
        </article>
      </main>

      <aside className="hidden lg:block w-80 shrink-0">
        <div className="sticky top-28 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-red-500" />

          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400">
              <Book className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Sommaire
            </h3>
          </div>

          <ul className="space-y-2">
            {chapters.map((chap) => {
              const isActive = chap.title === title;
              return (
                <li key={chap.slug}>
                  <Link
                    to={`/guides/${gameId}/soluce/${chap.slug}`}
                    className={`block px-4 py-3 rounded-xl transition-all font-bold ${
                      isActive
                        ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-l-4 border-red-500"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {chap.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
}
