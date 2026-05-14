import axios from "axios";

const TYRADEX = "https://tyradex.app/api/v1";
const POKEAPI = "https://pokeapi.co/api/v2";

export const getPokemonFR = async (id: number) => {
  const response = await axios.get(`${TYRADEX}/pokemon/${id}`);
  return response.data;
};

export const getPokemonEncounters = async (id: number) => {
  const response = await axios.get(`${POKEAPI}/pokemon/${id}/encounters`);
  return response.data;
};
