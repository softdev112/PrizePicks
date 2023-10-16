import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { PokemonSearchErrorPayload} from '../../models/pokemon';

const HandleCatchBlock = (err: any) => {
  if (err.response && err.response.data) {
    return {
      error: err.response.data,
      status: err.response.status
    };
  }

  return {
    error: 'Network Error',
    status: 500
  };
};

export const GetPokemonBySearch = createAsyncThunk(
  'pokemonReducer/get-pokemon-by-search',
  async ({ pokemonName }: { pokemonName: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

      return response.data;
    } catch (err) {
      return rejectWithValue(HandleCatchBlock(err));
    }
  }
);

export const GetEvolutionChain = createAsyncThunk(
  'pokemonReducer/get-evolution-chain-by-id',
  async ({ url }: { url: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (err) {
      return rejectWithValue(HandleCatchBlock(err));
    }
  }
);

export const GetSpecies = createAsyncThunk(
  'pokemonReducer/get-species',
  async ({ url }: { url: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (err) {
      return rejectWithValue(HandleCatchBlock(err));
    }
  }
);

const pokemonReducer = createSlice({
  name: 'pokemonReducer',
  initialState: {
    error: '',
    message: '',
    success: false,
    searchedPokemon: '',
    getPokemonLoading: false,
    searchPokemonDetails: {},
    pokemonEvolutionChain: {},
    getPokemonEvolutionChainLoading: false,
    errorInEvolutionChain: '',
    pokemonSpecies: {},
    getPokemonSpeciesLoading: false,
    evolutionChainFetched: false
  },
  reducers: {
    SetSearchedPokemon: (state, action) => {
        state.searchedPokemon = action.payload.searchTerm;
    },
    SetClearState: (state) => {
      state.error = '';
      state.message = '';
      state.success = false;
      state.getPokemonLoading = false;
      state.searchPokemonDetails = {};
      state.pokemonEvolutionChain = {};
      state.getPokemonEvolutionChainLoading = false;
      state.errorInEvolutionChain = '';
      state.pokemonSpecies = {};
      state.getPokemonSpeciesLoading = false;
      state.evolutionChainFetched = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetPokemonBySearch.pending, (state) => {
        state.success = false;
        state.error = '';
        state.getPokemonLoading = true;
        state.evolutionChainFetched = false;
      })
      .addCase(GetPokemonBySearch.fulfilled, (state, action) => {
        state.success = true;
        state.getPokemonLoading = false;
        state.searchPokemonDetails = action.payload;
      })
      .addCase(GetPokemonBySearch.rejected, (state, action) => {
        state.success = false;
        state.getPokemonLoading = false;
        state.error = (action.payload as PokemonSearchErrorPayload).error;
      })
      .addCase(GetEvolutionChain.pending, (state) => {
        state.success = false;
        state.errorInEvolutionChain = '';
        state.getPokemonEvolutionChainLoading = true;
        state.evolutionChainFetched= false;
      })
      .addCase(GetEvolutionChain.fulfilled, (state, action) => {
        state.success = true;
        state.getPokemonEvolutionChainLoading = false;
        state.pokemonEvolutionChain = action.payload;
        state.evolutionChainFetched= true;
      })
      .addCase(GetEvolutionChain.rejected, (state, action) => {
        state.success = false;
        state.getPokemonEvolutionChainLoading = false;
        state.evolutionChainFetched= true;
        state.errorInEvolutionChain = (action.payload as PokemonSearchErrorPayload).error;
      })
      .addCase(GetSpecies.pending, (state) => {
        state.success = false;
        state.getPokemonSpeciesLoading = true;
      })
      .addCase(GetSpecies.fulfilled, (state, action) => {
        state.success = true;
        state.getPokemonSpeciesLoading = false;
        state.pokemonSpecies= action.payload;
      })
      .addCase(GetSpecies.rejected, (state, action) => {
        state.success = false;
        state.getPokemonSpeciesLoading = false;
        state.errorInEvolutionChain = (action.payload as PokemonSearchErrorPayload).error;
      });
  }
});

const { reducer, actions } = pokemonReducer;

export const { SetSearchedPokemon, SetClearState } = actions;
export default reducer;
