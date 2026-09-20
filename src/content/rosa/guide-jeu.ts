import Partie1 from "./soluce/partie-1-le-depart.mdx";
import Partie2 from "./soluce/partie-2-academie.mdx";

export const rosaGuide = {
  id: "rosa",
  title: "Pokémon Rubis Oméga & Saphir Alpha",
  description: "Guide complet pour la région de Hoenn",
  generation: 6,
  coverImage:
    "https://www.pokebip.com/pages/jeuxvideo/pokemon_rubis_omega_saphir_alpha/logo.png",
  mainLinks: {
    text: "partie-1-le-depart",
    video: "https://youtube.com/",
  },
  categories: [
    {
      title: "Soluces et astuces",
      icon: "Map",
      links: [
        { title: "La démo spéciale", slug: "demo-speciale" },
        { title: "Solution complète", slug: "partie-1-le-depart" },
        { title: "Guide des Lieux", slug: "guide-lieux" },
        { title: "Activités quotidiennes", slug: "activites-quotidiennes" },
      ],
    },
    {
      title: "Capture de Pokémon",
      icon: "Target",
      links: [
        { title: "Pokédex de Hoenn", slug: "pokedex-hoenn" },
        { title: "Pokémon exclusifs", slug: "exclusifs" },
        { title: "Les Starters", slug: "starters" },
        { title: "Les Légendaires", slug: "legendaires" },
        { title: "Pokémon offerts", slug: "offerts" },
      ],
    },
    {
      title: "Combats",
      icon: "Swords",
      links: [
        { title: "Table des types", slug: "table-types" },
        { title: "Champions d'Arène", slug: "champions" },
        { title: "La Ligue Pokémon", slug: "ligue" },
        { title: "Team Magma / Aqua", slug: "team-magma-aqua" },
      ],
    },
  ],
  chapters: [
    {
      slug: "partie-1-le-depart",
      title: "Partie 1 : Le Départ",
      component: Partie1,
    },
    {
      slug: "partie-2-academie",
      title: "Partie 2 : L'Académie",
      component: Partie2,
    },
  ],
};
