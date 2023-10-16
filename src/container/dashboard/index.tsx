import React, { useState, useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { isEmpty } from 'lodash';
import TextField from '@mui/material/TextField';

import { useAppDispatch, useAppSelector } from '../../redux/store';

import { RootState, HistoryTypeInterface } from '../../models/pokemon';

import PokemonDetails from '../../component/pokemon-detail';

import {
  GetEvolutionChain,
  GetPokemonBySearch,
  GetSpecies,
  SetClearState,
  SetSearchedPokemon
} from '../../redux/slices/pokemon-slice';

import { parseEvolutionChain } from '../../utils/helpers';

import { spritesKeys } from '../../utils/constant';

const SearchPokemonPage = () => {
  const dispatch = useAppDispatch();

  const {
    error,
    getPokemonLoading,
    searchPokemonDetails,
    pokemonEvolutionChain,
    errorInEvolutionChain,
    getPokemonSpeciesLoading,
    getPokemonEvolutionChainLoading,
    pokemonSpecies,
    evolutionChainFetched,
    searchedPokemon
  } = useAppSelector((state: RootState) => state.pokemon);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [abilityList, setAbilityList] = useState<string[]>([]);
  const [moveList, setMoveList] = useState<string[]>([]);
  const [evolutionChainList, setEvolutionChainList] = useState<string[]>([]);
  const [pokemonSpeciesUrl, setPokemonSpeciesUrl] = useState<string>('');
  const [pokemonDetails, setPokemonDetails] = useState({
    height: '',
    weight: '',
    specieName: ''
  });
  const [spritesList, setSpritesList] = useState<string[]>([]);
  const [callHandleFree, setCallHandleFree] = useState<boolean>(false);
  const [pokemonName, setPokemonName] =  useState<string>('');

  const [errorMessageInEvolutionChain, setErrorMessageInEvolutionChain] = useState<string>('');

  const handleSearch = () => {
    if (searchTerm.length !== 0) {
      setErrorMessage("");
      setAbilityList([]);
      setMoveList([]);
      setSpritesList([]);
      setPokemonSpeciesUrl("");
      setErrorMessageInEvolutionChain("");
      setPokemonDetails({
        height: '',
        weight: '',
        specieName: ''
      });
      setEvolutionChainList([]);
      dispatch(SetSearchedPokemon({ searchTerm }))
      dispatch(GetPokemonBySearch({ pokemonName: searchTerm }));
    }
  };

  useEffect(() => {
    if (!isEmpty(searchPokemonDetails)) {
      const { abilities, moves, species, sprites, name, height = 0, weight = 0 } = searchPokemonDetails;
      const weightLbs = (weight * 0.220462)?.toFixed(2);
      const heightInches = height * 3.93701;
      const feet = Math.floor(heightInches / 12);
      const inches = Math.round(heightInches % 12);

      // Format the height as "feet' inches"
      const formattedHeight = `${feet}' ${inches}"`;

      setPokemonName(searchTerm);
      setPokemonDetails({
        height: formattedHeight,
        weight: weightLbs,
        specieName: species.name
      });

      // Filter and store ability names
      const abilityNames = abilities.map(ability => ability.ability.name);
      // Filter and store move names
      const moveNames = moves.map(move => move.move.name);
      // Save species and sprites
      const pokemonSpeciesURL = species.url;

      setPokemonSpeciesUrl(pokemonSpeciesURL);
      setAbilityList(abilityNames);
      setMoveList(moveNames);

      const history = JSON.parse(localStorage.getItem("pokemonSearchHistory"));
      const alreadyIn = history.find((row: HistoryTypeInterface) => row.name === name);

      if (isEmpty(alreadyIn)) {
        history.push({ name });
        localStorage.setItem("pokemonSearchHistory", JSON.stringify(history));
      }
      // Filter sprites
      const spritesArray = [];
      for (const key in sprites) {
        if (spritesKeys.includes(key) && sprites[key] !== null) {
          spritesArray.push(sprites[key]);
        }
      }

      setSpritesList(spritesArray);
    }
  }, [searchPokemonDetails]);

  useEffect(() => {
    if (!isEmpty(pokemonEvolutionChain)) {
      if (pokemonEvolutionChain.chain) {
        const speciesNames = parseEvolutionChain(pokemonEvolutionChain.chain);
        setEvolutionChainList(speciesNames);

      }
    }
  }, [pokemonEvolutionChain])

  useEffect(() => {
    if (!isEmpty(errorInEvolutionChain)) {
      setErrorMessageInEvolutionChain(errorInEvolutionChain)
    }
  }, [errorInEvolutionChain])

  useEffect(() => {
    if (!isEmpty(error)) {
      setErrorMessage('No Pokemon matched your search');
    }
  }, [error]);

  useEffect(() => {
    if (!isEmpty(pokemonSpeciesUrl)) {
      dispatch(GetSpecies({ url: pokemonSpeciesUrl }));
    }
  }, [pokemonSpeciesUrl]);

  useEffect(() => {
    if (!isEmpty(pokemonSpecies)) {
      const { evolution_chain } = pokemonSpecies || {};
      if (!isEmpty(evolution_chain?.url)) dispatch(GetEvolutionChain({ url: evolution_chain.url }));
    }
  }, [getPokemonSpeciesLoading, pokemonSpecies]);

  useEffect(() => {
    const localStorageHistory = localStorage.getItem("pokemonSearchHistory");

    if (localStorageHistory === null) {
      localStorage.setItem("pokemonSearchHistory", JSON.stringify([]));
    }

    if (!isEmpty(searchedPokemon)) {
      setSearchTerm(searchedPokemon);
      setCallHandleFree(true);
    }
  }, []);

  useEffect(() => {
    if (callHandleFree) {
      handleSearch();
      setCallHandleFree(false);
    }
  }, [callHandleFree])

  useEffect(() => {
    return () => {
      dispatch(SetClearState());
    }
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '120px', marginTop: '60px' }}>
        <CssBaseline />
        <TextField
          label="Search By Name"
          color="primary"
          type="text"
          placeholder="Enter your search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          focused
          sx={{ width: '320px' }}
        />

        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ marginLeft: '12px', width: '120px' }}
        >
          Search
        </Button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '60px' }}>
        <div>
          {(getPokemonLoading) ?
            <Box sx={{ display: 'flex' }}> <CircularProgress /> </Box>
            : null
          }
        </div>

        <div> {
          !isEmpty(errorMessage) ? <div>
            <h3>{errorMessage}</h3>
          </div> : null
        } </div>
      </div>

      <PokemonDetails
        getPokemonSpeciesLoading={getPokemonSpeciesLoading}
        getPokemonEvolutionChainLoading={getPokemonEvolutionChainLoading}
        evolutionChainFetched={evolutionChainFetched}
        searchedPokemon={pokemonName}
        spritesList={spritesList}
        pokemonDetails={pokemonDetails}
        abilityList={abilityList}
        moveList={moveList}
        evolutionChainList={evolutionChainList}
        errorMessageInEvolutionChain={errorMessageInEvolutionChain}
      />
    </div>
  );
};

export default SearchPokemonPage;
