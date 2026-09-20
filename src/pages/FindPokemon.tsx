import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "@/components/SearchBar";
import PokemonCard from "@/components/PokemonCard";
import EncounterList from "@/components/EncounterList";
import { getPokemonFR, getPokemonEncounters } from "@/api/pokemon";
import pokemonFR from "@/data/pokemonName/fr.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VERSION_NAMES_FR: Record<string, string> = {
  red: "Rouge",
  "red-japan": "Rouge (Japon)",
  blue: "Bleu",
  "blue-japan": "Bleu (Japon)",
  yellow: "Jaune",
  "yellow-japan": "Jaune (Japon)",
  "green-japan": "Vert (Japon)",
  crystal: "Cristal",
  gold: "Or",
  silver: "Argent",
  ruby: "Rubis",
  sapphire: "Saphir",
  emerald: "Émeraude",
  firered: "Rouge Feu",
  leafgreen: "Vert Feuille",
  diamond: "Diamant",
  pearl: "Perle",
  platinum: "Platine",
  heartgold: "Or HeartGold",
  soulsilver: "Argent SoulSilver",
  black: "Noir",
  white: "Blanc",
  "black-2": "Noir 2",
  "white-2": "Blanc 2",
  x: "X",
  y: "Y",
  "omega-ruby": "Rubis Oméga",
  "alpha-sapphire": "Saphir Alpha",
  sun: "Soleil",
  moon: "Lune",
  "ultra-sun": "Ultra-Soleil",
  "ultra-moon": "Ultra-Lune",
  "lets-go-pikachu": "Let's Go Pikachu",
  "lets-go-eevee": "Let's Go Évoli",
  sword: "Épée",
  shield: "Bouclier",
  scarlet: "Écarlate",
  violet: "Violet",
};

const normalizeString = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export default function FindPokemon() {
  const [inputValue, setInputValue] = useState("Bulbizarre");
  const [searchQuery, setSearchQuery] = useState("Bulbizarre");
  const [selectedVersion, setSelectedVersion] = useState("all");

  const pokemonId = useMemo(() => {
    if (!searchQuery) return null;
    const normalizedSearch = normalizeString(searchQuery);
    const index = pokemonFR.findIndex(
      (name) => normalizeString(name) === normalizedSearch,
    );
    return index !== -1 ? index + 1 : null;
  }, [searchQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 500);
    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => {
    setSelectedVersion("all");
  }, [pokemonId]);

  const {
    data: pokemon,
    isLoading: loadingPokemon,
    isError: errorPokemon,
  } = useQuery({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => getPokemonFR(pokemonId!),
    enabled: !!pokemonId,
  });

  const { data: encounters, isLoading: loadingEncounters } = useQuery({
    queryKey: ["encounters", pokemonId],
    queryFn: () => getPokemonEncounters(pokemonId!),
    enabled: !!pokemonId && !errorPokemon,
  });

  const availableVersions = useMemo(() => {
    if (!encounters) return [];
    const versions = new Set<string>();
    encounters.forEach((enc: any) => {
      enc.version_details.forEach((vd: any) => versions.add(vd.version.name));
    });
    return Array.from(versions).sort();
  }, [encounters]);

  const filteredEncounters = useMemo(() => {
    if (!encounters) return [];
    if (selectedVersion === "all") return encounters;
    return encounters
      .map((enc: any) => {
        const filteredDetails = enc.version_details.filter(
          (vd: any) => vd.version.name === selectedVersion,
        );
        return filteredDetails.length > 0
          ? { ...enc, version_details: filteredDetails }
          : null;
      })
      .filter(Boolean);
  }, [encounters, selectedVersion]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4">
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white">
          Le Pokémon <span className="text-brand">Finder</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Recherchez un Pokémon pour tout savoir sur ses statistiques et ses
          lieux d'apparition exacts.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none mb-12 relative z-20">
        <SearchBar value={inputValue} onChange={setInputValue} />

        {availableVersions.length > 0 && !loadingEncounters && (
          <Select
            key={pokemonId}
            value={selectedVersion}
            onValueChange={setSelectedVersion}
          >
            <SelectTrigger className="w-full h-14 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 text-lg px-4 focus:ring-brand">
              <SelectValue placeholder="Choisir un jeu" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              sideOffset={8}
              className="max-h-75 overflow-y-auto rounded-xl shadow-2xl border-2 border-slate-200 dark:border-slate-700"
            >
              <SelectItem value="all" className="font-black text-brand py-3">
                Afficher toutes les versions
              </SelectItem>
              {availableVersions.map((v) => (
                <SelectItem key={v} value={v} className="font-bold py-2">
                  Version {VERSION_NAMES_FR[v] || v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        {!pokemonId && searchQuery ? (
          <div className="max-w-2xl mx-auto p-6 border-2 border-brand-border bg-brand-muted text-brand rounded-3xl text-center font-bold text-xl shadow-sm">
            Ce Pokémon est introuvable. Vérifiez l'orthographe !
          </div>
        ) : loadingPokemon ? (
          <p className="text-center text-slate-400 font-bold animate-pulse text-2xl py-10">
            Recherche en cours...
          </p>
        ) : (
          pokemon && <PokemonCard pokemon={pokemon} />
        )}

        {pokemonId &&
          !errorPokemon &&
          (loadingEncounters ? (
            <p className="text-center text-slate-400 font-bold animate-pulse text-2xl py-10">
              Analyse des cartes géographiques...
            </p>
          ) : (
            <EncounterList encounters={filteredEncounters} />
          ))}
      </div>
    </div>
  );
}
