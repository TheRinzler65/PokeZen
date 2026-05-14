import { useState, useEffect, useMemo } from "react";
import {
  ShieldAlert,
  Plus,
  Trash2,
  Heart,
  Skull,
  XCircle,
  Search,
  MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import pokemonFR from "@/data/pokemonName/fr.json";

const normalizeString = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

type Status = "alive" | "dead" | "missed";

interface Encounter {
  id: string;
  location: string;
  pokemonId: number | null;
  status: Status;
}

export function NuzlockeTracker() {
  const [encounters, setEncounters] = useState<Encounter[]>(() => {
    const saved = localStorage.getItem("pokezen-nuzlocke");
    return saved ? JSON.parse(saved) : [];
  });

  const [newLocation, setNewLocation] = useState("");
  const [activeSearchId, setActiveSearchId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("pokezen-nuzlocke", JSON.stringify(encounters));
  }, [encounters]);

  const allPokemon = useMemo(() => {
    return pokemonFR.map((name, index) => ({
      id: index + 1,
      name,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    }));
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const normalized = normalizeString(searchQuery);
    return allPokemon
      .filter(
        (p) =>
          normalizeString(p.name).includes(normalized) ||
          p.id.toString() === searchQuery,
      )
      .slice(0, 12);
  }, [allPokemon, searchQuery]);

  const addLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocation.trim()) return;
    const newEncounter: Encounter = {
      id: Date.now().toString() + Math.random().toString(),
      location: newLocation.trim(),
      pokemonId: null,
      status: "alive",
    };
    setEncounters([...encounters, newEncounter]);
    setNewLocation("");
  };

  const removeEncounter = (id: string) => {
    setEncounters(encounters.filter((enc) => enc.id !== id));
    if (activeSearchId === id) setActiveSearchId(null);
  };

  const setPokemonForEncounter = (encounterId: string, pokemonId: number) => {
    setEncounters(
      encounters.map((enc) =>
        enc.id === encounterId ? { ...enc, pokemonId, status: "alive" } : enc,
      ),
    );
    setActiveSearchId(null);
    setSearchQuery("");
  };

  const updateStatus = (encounterId: string, status: Status) => {
    setEncounters(
      encounters.map((enc) =>
        enc.id === encounterId ? { ...enc, status } : enc,
      ),
    );
  };

  const stats = useMemo(() => {
    return encounters.reduce(
      (acc, curr) => {
        if (curr.pokemonId) {
          acc[curr.status]++;
        }
        return acc;
      },
      { alive: 0, dead: 0, missed: 0 },
    );
  }, [encounters]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white">
          Nuzlocke <span className="text-purple-500">Tracker</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Suivez vos captures par route et honorez vos Pokémon tombés au combat.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 shadow-sm mb-12">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <div className="w-20 h-20 bg-purple-50 dark:bg-purple-500/10 rounded-full flex items-center justify-center shrink-0 border-4 border-purple-100 dark:border-purple-900/30">
            <ShieldAlert className="w-10 h-10 text-purple-500" />
          </div>
          <div className="flex-1 w-full grid grid-cols-3 gap-4 text-center">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl border-2 border-green-200 dark:border-green-800">
              <p className="text-3xl font-black text-green-600 dark:text-green-400">
                {stats.alive}
              </p>
              <p className="text-sm font-bold text-green-700 dark:text-green-500 uppercase tracking-wider">
                Vivants
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl border-2 border-red-200 dark:border-red-800">
              <p className="text-3xl font-black text-red-600 dark:text-red-400">
                {stats.dead}
              </p>
              <p className="text-sm font-bold text-red-700 dark:text-red-500 uppercase tracking-wider">
                Morts
              </p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700">
              <p className="text-3xl font-black text-slate-600 dark:text-slate-400">
                {stats.missed}
              </p>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Ratés
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={addLocation} className="flex gap-4">
          <Input
            placeholder="Ex: Route 1, Forêt de Jade..."
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            className="flex-1 h-14 text-lg rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold focus-visible:ring-purple-500 focus-visible:border-purple-500 px-6"
          />
          <button
            type="submit"
            disabled={!newLocation.trim()}
            className="h-14 px-8 bg-purple-600 text-white font-black rounded-2xl hover:bg-purple-700 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Ajouter Lieu</span>
          </button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {encounters.map((encounter) => {
          const pokemon = encounter.pokemonId
            ? allPokemon.find((p) => p.id === encounter.pokemonId)
            : null;
          const isSearching = activeSearchId === encounter.id;

          return (
            <div
              key={encounter.id}
              className={`p-6 rounded-3xl border-2 transition-all duration-300 ${
                encounter.status === "dead"
                  ? "bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-900"
                  : encounter.status === "missed"
                    ? "bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-75"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white capitalize">
                    {encounter.location}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {pokemon && (
                    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border-2 border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => updateStatus(encounter.id, "alive")}
                        className={`p-2 rounded-lg transition-colors ${
                          encounter.status === "alive"
                            ? "bg-green-500 text-white shadow-sm"
                            : "text-slate-400 hover:text-green-500"
                        }`}
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => updateStatus(encounter.id, "dead")}
                        className={`p-2 rounded-lg transition-colors ${
                          encounter.status === "dead"
                            ? "bg-red-500 text-white shadow-sm"
                            : "text-slate-400 hover:text-red-500"
                        }`}
                      >
                        <Skull className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => updateStatus(encounter.id, "missed")}
                        className={`p-2 rounded-lg transition-colors ${
                          encounter.status === "missed"
                            ? "bg-slate-500 text-white shadow-sm"
                            : "text-slate-400 hover:text-slate-500"
                        }`}
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => removeEncounter(encounter.id)}
                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {!pokemon && !isSearching && (
                <button
                  onClick={() => {
                    setActiveSearchId(encounter.id);
                    setSearchQuery("");
                  }}
                  className="w-full py-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:border-purple-500 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all font-bold group"
                >
                  <Plus className="w-8 h-8 group-hover:scale-125 transition-transform" />
                  Ajouter la rencontre
                </button>
              )}

              {pokemon && !isSearching && (
                <div
                  className="flex items-center gap-6 cursor-pointer group"
                  onClick={() => {
                    setActiveSearchId(encounter.id);
                    setSearchQuery("");
                  }}
                >
                  <img
                    src={pokemon.sprite}
                    alt={pokemon.name}
                    className={`w-24 h-24 object-contain drop-shadow-md group-hover:scale-110 transition-transform ${
                      encounter.status === "dead"
                        ? "grayscale opacity-50"
                        : encounter.status === "missed"
                          ? "opacity-30"
                          : ""
                    }`}
                  />
                  <div>
                    <p
                      className={`text-3xl font-black ${
                        encounter.status === "dead"
                          ? "text-red-700 dark:text-red-500 line-through decoration-red-500 decoration-4"
                          : encounter.status === "missed"
                            ? "text-slate-500 dark:text-slate-400"
                            : "text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors"
                      }`}
                    >
                      {pokemon.name}
                    </p>
                    <p className="text-slate-400 font-bold">
                      #{pokemon.id.toString().padStart(4, "0")}
                    </p>
                  </div>
                </div>
              )}

              {isSearching && (
                <div className="mt-4 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      autoFocus
                      placeholder="Quel Pokémon avez-vous rencontré ?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-12 rounded-xl border-2 border-purple-200 dark:border-purple-800 focus-visible:ring-purple-500 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>
                  {searchResults.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {searchResults.map((p) => (
                        <button
                          key={p.id}
                          onClick={() =>
                            setPokemonForEncounter(encounter.id, p.id)
                          }
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800 transition-all text-left"
                        >
                          <img
                            src={p.sprite}
                            alt={p.name}
                            className="w-10 h-10 object-contain"
                          />
                          <span className="font-bold text-slate-700 dark:text-slate-300 text-sm truncate">
                            {p.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => setActiveSearchId(null)}
                    className="text-sm font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    Annuler
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {encounters.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem]">
            <p className="text-2xl font-bold text-slate-400">
              Aucune route ajoutée pour le moment.
            </p>
            <p className="text-slate-500 mt-2">
              Utilisez le champ ci-dessus pour commencer votre Nuzlocke.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
