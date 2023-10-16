export interface Ability {
  ability: {
    name: string;
  }
};

export interface Move {
  move: {
    name: string;
  }
};

export interface Species {
  name: string;
  url: string;
};

export interface Sprites {
  back_default?: string | null;
  front_default?: string | null;
  back_shiny?: string | null;
  back_shiny_female?: string | null;
  front_female?: string | null;
  front_shiny?: string | null;
  front_shiny_female?: string | null;
};

export interface PokemonDetails {
  id: number;
  abilities: Ability[];
  moves: Move[];
  species: Species;
  sprites: Sprites;
  name: string;
  height: number;
  weight: number;
};

export interface PokemonSpecies {
  evolution_chain: { url: string }
};

export interface PokemonEvolutionChainInterface {
  chain: {
    evolves_to: [];
    species: { 
      name: string
    };
  }
};

export interface HistoryTypeInterface {
   name: string;
};

export interface PokemonDetailsProps {
  pokemonDetails: {
    height: string;
    weight: string;
    specieName: string
  };
  abilityList: string[];
  moveList: string[];
  evolutionChainList: string[];
  errorMessageInEvolutionChain: string;
  spritesList: string[];
  searchedPokemon: string;
  evolutionChainFetched: boolean;
  getPokemonSpeciesLoading: boolean;
  getPokemonEvolutionChainLoading: boolean;
};

export interface Pokemon {
  name: string;
};

export interface PokemonSearchErrorPayload {
  error: string;
  status: number;
};

export type RootState = {
  pokemon: {
    searchPokemonDetails: PokemonDetails;
    error: string;
    message: string;
    success: boolean;
    searchedPokemon: string;
    getPokemonLoading: boolean;
    pokemonEvolutionChain: PokemonEvolutionChainInterface,
    getPokemonEvolutionChainLoading: boolean;
    errorInEvolutionChain: string;
    pokemonSpecies: PokemonSpecies,
    getPokemonSpeciesLoading: boolean,
    evolutionChainFetched: boolean
  };
};
