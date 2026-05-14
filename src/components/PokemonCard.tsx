export default function PokemonCard({ pokemon }: any) {
  if (!pokemon || !pokemon.sprites) {
    return null;
  }

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none group transition-all">
      <div className="bg-slate-50 dark:bg-slate-800/40 pt-6 pb-8 text-center border-b-2 border-slate-200 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex justify-center mb-4">
          <span className="bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-black px-4 py-1.5 rounded-xl text-sm tracking-widest border-2 border-slate-200 dark:border-slate-700 shadow-sm uppercase">
            N° {pokemon.pokedex_id?.toString().padStart(4, "0")}
          </span>
        </div>

        <h2 className="relative z-10 text-4xl font-black capitalize text-slate-900 dark:text-white px-4">
          {pokemon.name?.fr}
        </h2>
      </div>

      <div className="pt-8 pb-10 flex flex-col items-center gap-8 relative px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-slate-100 dark:bg-slate-800/50 rounded-full blur-2xl group-hover:bg-red-100 dark:group-hover:bg-red-900/20 transition-colors duration-500" />

        <img
          src={pokemon.sprites.regular}
          alt={pokemon.name?.fr}
          className="w-56 h-56 object-contain drop-shadow-2xl group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500 relative z-10"
        />

        <div className="flex flex-wrap justify-center gap-3 relative z-10">
          {pokemon.types?.map((type: any, index: number) => (
            <div
              key={index}
              className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-sm font-black text-slate-700 dark:text-slate-200 hover:border-red-500 dark:hover:border-red-500 transition-colors cursor-default"
            >
              {type.image && (
                <img
                  src={type.image}
                  alt={type.name}
                  className="w-6 h-6 object-contain drop-shadow-sm"
                />
              )}
              <span className="tracking-wide uppercase text-sm">
                {type.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
