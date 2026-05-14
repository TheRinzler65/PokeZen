import { useState, useRef, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import Fuse from "fuse.js";
import pokemonFR from "@/data/pokemonName/fr.json";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const pokemonList = useMemo(() => {
    return pokemonFR.map((name, index) => ({
      id: index + 1,
      name: name,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    }));
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(pokemonList, {
      keys: ["name"],
      threshold: 0.3,
    });
  }, [pokemonList]);

  const suggestions = value
    ? fuse
        .search(value)
        .map((result) => result.item)
        .slice(0, 6)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (name: string) => {
    onChange(name);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <Input
        placeholder="Chercher un Pokémon..."
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className="h-14 text-lg px-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300 focus-visible:ring-red-500 focus-visible:border-red-500 shadow-sm transition-all placeholder:text-slate-400"
      />

      {isOpen && value.length > 0 && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 max-h-100 overflow-y-auto">
          {suggestions.map((pokemon) => (
            <li
              key={pokemon.id}
              onClick={() => handleSelect(pokemon.name)}
              className="flex items-center gap-4 px-4 py-3 cursor-pointer rounded-xl transition-all hover:bg-red-50 dark:hover:bg-red-500/10 group"
            >
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="w-12 h-12 object-contain drop-shadow-md group-hover:scale-110 transition-transform"
                loading="lazy"
              />
              <span className="font-black text-slate-700 dark:text-slate-200 group-hover:text-red-600 dark:group-hover:text-red-400 text-lg transition-colors">
                {pokemon.name}
              </span>
              <span className="ml-auto font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-lg text-sm">
                #{pokemon.id.toString().padStart(4, "0")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
