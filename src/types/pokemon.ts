export type Pokemon = {
  pokedex_id: number;
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  sprites: {
    regular: string;
    shiny: string;
  };
  types: {
    name: string;
    image: string;
  }[];
};

export type EncounterDetail = {
  chance: number;
  max_level: number;
  min_level: number;
  method: {
    name: string;
  };
};

export type VersionDetail = {
  version: {
    name: string;
  };
  encounter_details: EncounterDetail[];
};

export type EncounterArea = {
  location_area: {
    name: string;
  };
  version_details: VersionDetail[];
};
