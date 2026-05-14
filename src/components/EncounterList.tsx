import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import type { EncounterArea } from "@/types/pokemon";

const formatName = (str: string) => {
  return str
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/Area/g, "Zone")
    .replace(/Route/g, "Route");
};

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

interface EncounterListProps {
  encounters: EncounterArea[];
}

export default function EncounterList({ encounters }: EncounterListProps) {
  if (!encounters || encounters.length === 0) {
    return (
      <div className="p-10 text-center border-2 border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-900/50">
        <p className="text-slate-500 dark:text-slate-400 font-bold text-xl">
          Aucune localisation trouvée pour cette sélection.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <h3 className="text-3xl font-black text-slate-900 dark:text-white shrink-0">
          Lieux d'apparition
        </h3>
        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {encounters.map((encounter, index) => (
          <div
            key={index}
            className="rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="bg-slate-50 dark:bg-slate-800/40 px-6 py-4 border-b-2 border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-red-500 shrink-0" />
              <h4 className="font-black text-slate-900 dark:text-white text-xl leading-tight">
                {formatName(encounter.location_area.name)}
              </h4>
            </div>

            <div className="p-6 flex-1 space-y-6">
              {encounter.version_details.map((detail, i) => (
                <div key={i} className="space-y-4">
                  <div className="inline-block px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-widest border border-red-100 dark:border-red-900/30">
                    Version{" "}
                    {VERSION_NAMES_FR[detail.version.name] ||
                      formatName(detail.version.name)}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {detail.encounter_details.map((enc, j) => (
                      <div
                        key={j}
                        className="flex flex-col gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border-2 border-slate-100 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <span
                            className="font-bold text-slate-700 dark:text-slate-200 leading-tight"
                            title={formatName(enc.method.name)}
                          >
                            {formatName(enc.method.name)}
                          </span>
                          <Badge
                            variant={
                              enc.chance <= 10 ? "destructive" : "secondary"
                            }
                            className="shrink-0 font-black shadow-sm"
                          >
                            {enc.chance}%
                          </Badge>
                        </div>

                        <div className="inline-flex items-center text-xs font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 w-fit shadow-sm">
                          Niveau {enc.min_level}
                          {enc.min_level !== enc.max_level
                            ? ` à ${enc.max_level}`
                            : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
