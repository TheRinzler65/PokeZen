import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Home } from "@/pages/Home";
import { Games } from "@/pages/Game";
import { GameHub } from "@/pages/GameHub";
import FindPokemon from "@/pages/FindPokemon";
import { Outils } from "@/pages/Outils";
import { TeamBuilder } from "@/pages/TeamBuilder";
import { PokedexTracker } from "@/pages/PokedexTracker";
import { NuzlockeTracker } from "@/pages/NuzlockeTracker";
import { ArticleReader } from "@/pages/ArticleReader";

import { Navigation } from "@/components/layout/Navigation";
import { ScrollToTop } from "@/components/ScrollToTop";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans antialiased selection:bg-red-500/20">
          <Navigation />

          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/find" element={<FindPokemon />} />
              <Route path="/jeux" element={<Games />} />
              <Route path="/jeux/:gameId" element={<GameHub />} />
              <Route path="/outils" element={<Outils />} />
              <Route path="/outils/checklist" element={<PokedexTracker />} />
              <Route path="/outils/team-builder" element={<TeamBuilder />} />
              <Route path="/outils/nuzlocke" element={<NuzlockeTracker />} />
              <Route
                path="/jeux/:gameId/soluce/:chapterSlug"
                element={<ArticleReader />}
              />
            </Routes>
          </main>

          <ScrollToTop />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
