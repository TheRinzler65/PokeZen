import { useState, useEffect, useMemo } from "react";
import { Search, CheckCircle2, Circle, Trophy } from "lucide-react";
import { Input } from "@/components/ui/input";
import pokemonFR from "@/data/pokemonName/fr.json";

const normalizeString = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export function PokedexTracker() {
  const [captured, setCaptured] = useState<number[]>(() => {
    const saved = localStorage.getItem("pokezen-pokedex-tracker");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "captured" | "missing">("all");

  useEffect(() => {
    localStorage.setItem("pokezen-pokedex-tracker", JSON.stringify(captured));
  }, [captured]);

  const allPokemon = useMemo(() => {
    return pokemonFR.map((name, index) => ({
      id: index + 1,
      name,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    }));
  }, []);

  const filteredPokemon = useMemo(() => {
    const normalizedSearch = normalizeString(searchQuery);
    return allPokemon.filter((p) => {
      const matchSearch =
        normalizeString(p.name).includes(normalizedSearch) ||
        p.id.toString() === searchQuery;
      if (!matchSearch) return false;

      const isCaptured = captured.includes(p.id);
      if (filter === "captured" && !isCaptured) return false;
      if (filter === "missing" && isCaptured) return false;

      return true;
    });
  }, [allPokemon, searchQuery, filter, captured]);

  const toggleCapture = (id: number) => {
    setCaptured((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const progressPercentage =
    Math.round((captured.length / allPokemon.length) * 100) || 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white">
          Pokédex <span className="text-green-500">Tracker</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Cochez vos captures. Votre progression est sauvegardée
          automatiquement.
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 shadow-sm mb-12">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center shrink-0 border-4 border-green-100 dark:border-green-900/30">
            <Trophy className="w-10 h-10 text-green-500" />
          </div>
          <div className="flex-1 w-full text-center md:text-left">
            <div className="flex justify-between items-end mb-3">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                Progression Globale
              </span>
              <span className="text-2xl font-black text-green-500">
                {captured.length} / {allPokemon.length}
              </span>
            </div>
            <div className="h-6 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
              <div
                className="h-full bg-green-500 transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-right mt-2 text-sm font-bold text-slate-400">
              {progressPercentage}% complété
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
            <Input
              placeholder="Rechercher un Pokémon ou un numéro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 h-14 text-lg rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold focus-visible:ring-green-500 focus-visible:border-green-500"
            />
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shrink-0">
            {(["all", "captured", "missing"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-xl font-bold capitalize transition-all ${
                  filter === f
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                {f === "all"
                  ? "Tous"
                  : f === "captured"
                    ? "Capturés"
                    : "Manquants"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredPokemon.map((pokemon) => {
          const isCaptured = captured.includes(pokemon.id);
          return (
            <div
              key={pokemon.id}
              onClick={() => toggleCapture(pokemon.id)}
              className={`relative flex flex-col items-center p-4 rounded-3xl border-2 cursor-pointer transition-all duration-300 group ${
                isCaptured
                  ? "bg-green-50 dark:bg-green-500/10 border-green-500 shadow-md shadow-green-500/10"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-green-300 dark:hover:border-green-700"
              }`}
            >
              <div className="absolute top-3 right-3 transition-transform group-hover:scale-110">
                {isCaptured ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500 fill-green-100 dark:fill-green-900/50" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300 dark:text-slate-700" />
                )}
              </div>

              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                loading="lazy"
                className={`w-24 h-24 object-contain transition-transform duration-300 ${
                  isCaptured
                    ? "scale-110 drop-shadow-md"
                    : "opacity-70 group-hover:opacity-100 group-hover:scale-110"
                }`}
              />

              <div className="text-center mt-2 w-full">
                <p className="text-xs font-black text-slate-400 dark:text-slate-500 mb-1">
                  #{pokemon.id.toString().padStart(4, "0")}
                </p>
                <p
                  className={`font-black truncate w-full px-1 ${
                    isCaptured
                      ? "text-green-700 dark:text-green-400"
                      : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {pokemon.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPokemon.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl font-bold text-slate-400">
            Aucun Pokémon ne correspond à votre recherche.
          </p>
        </div>
      )}
    </div>
  );
}
