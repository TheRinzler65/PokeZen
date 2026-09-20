import { useState, useMemo } from "react";
import { Search, X, Swords, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import pokemonFR from "@/data/pokemonName/fr.json";

const normalizeString = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

interface TeamMember {
  id: number;
  name: string;
  sprite: string;
}

export function TeamBuilder() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const allPokemon = useMemo(() => {
    return pokemonFR.map((name, index) => ({
      id: index + 1,
      name,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    }));
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const normalizedSearch = normalizeString(searchQuery);
    return allPokemon
      .filter(
        (p) =>
          normalizeString(p.name).includes(normalizedSearch) ||
          p.id.toString() === searchQuery,
      )
      .slice(0, 18);
  }, [allPokemon, searchQuery]);

  const addPokemon = (pokemon: TeamMember) => {
    if (team.length < 6) {
      setTeam([...team, pokemon]);
      setSearchQuery("");
    }
  };

  const removePokemon = (index: number) => {
    setTeam(team.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white">
          Team <span className="text-tool-team">Builder</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Composez l'équipe de 6 Pokémon ultime pour votre aventure.
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 shadow-sm mb-12">
        <div className="flex items-center gap-4 mb-8 border-b-2 border-slate-100 dark:border-slate-800 pb-6">
          <div className="p-3 bg-tool-team-muted rounded-2xl text-tool-team border-2 border-tool-team-border">
            <Swords className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Votre Équipe
            </h2>
            <p className="text-slate-500 font-bold">
              {team.length} / 6 emplacements utilisés
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, index) => {
            const member = team[index];
            return (
              <div
                key={index}
                className={`relative aspect-square rounded-3xl border-4 flex flex-col items-center justify-center p-2 transition-all duration-300 ${
                  member
                    ? "bg-tool-team-muted border-tool-team shadow-lg shadow-tool-team/10"
                    : "bg-slate-50 dark:bg-slate-800/50 border-dashed border-slate-200 dark:border-slate-700"
                }`}
              >
                {member ? (
                  <>
                    <button
                      onClick={() => removePokemon(index)}
                      className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all shadow-sm z-10"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <img
                      src={member.sprite}
                      alt={member.name}
                      className="w-20 h-20 object-contain drop-shadow-md hover:scale-110 transition-transform"
                    />
                    <span className="font-black text-tool-team text-sm truncate w-full text-center mt-2 px-1">
                      {member.name}
                    </span>
                  </>
                ) : (
                  <div className="text-slate-300 dark:text-slate-600 flex flex-col items-center gap-2">
                    <Plus className="w-8 h-8" />
                    <span className="font-bold text-sm uppercase tracking-widest">
                      Vide
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="relative mb-8">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
          <Input
            placeholder={
              team.length >= 6
                ? "Votre équipe est complète !"
                : "Rechercher un Pokémon à ajouter..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={team.length >= 6}
            className="pl-16 h-16 text-xl rounded-full border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold focus-visible:ring-tool-team focus-visible:border-tool-team shadow-sm disabled:opacity-50"
          />
        </div>

        {searchResults.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {searchResults.map((pokemon) => (
              <button
                key={pokemon.id}
                onClick={() => addPokemon(pokemon)}
                disabled={team.length >= 6}
                className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl hover:border-tool-team hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:border-slate-200 disabled:cursor-not-allowed group"
              >
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="w-20 h-20 object-contain drop-shadow-sm group-hover:scale-110 transition-transform"
                />
                <span className="font-black text-slate-700 dark:text-slate-200 mt-2">
                  {pokemon.name}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  #{pokemon.id.toString().padStart(4, "0")}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
