import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { isEmpty } from 'lodash'
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/store'

import { RootState, HistoryTypeInterface } from '../../models/pokemon';

import PokemonDetails from '../../component/pokemon-detail';

import {
  GetEvolutionChain,
  GetPokemonBySearch,
  GetSpecies,
  SetClearState
} from '../../redux/slices/pokemon-slice';

import { parseEvolutionChain } from '../../utils/helpers';

import { spritesKeys } from '../../utils/constant';

const SearchPokemonPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const {
    getPokemonLoading,
    error,
    searchPokemonDetails,
    pokemonEvolutionChain,
    errorInEvolutionChain,
    getPokemonSpeciesLoading,
    getPokemonEvolutionChainLoading,
    pokemonSpecies,
    evolutionChainFetched
  } = useAppSelector((state: RootState) => state.pokemon);

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

  const [errorMessageInEvolutionChain, setErrorMessageInEvolutionChain] = useState<string>('');

  useEffect(() => {
    if (params.name) dispatch(GetPokemonBySearch({ pokemonName: params.name }));
  }, [params.name]);

  useEffect(() => {
    if (!isEmpty(searchPokemonDetails)) {
      const { abilities, moves, species, sprites, name, height = 0, weight = 0 } = searchPokemonDetails;
      const weightLbs = (weight * 0.220462)?.toFixed(2);
      const heightInches = height * 3.93701;
      const feet = Math.floor(heightInches / 12);
      const inches = Math.round(heightInches % 12);

      // Format the height as "feet' inches"
      const formattedHeight = `${feet}' ${inches}"`;

      setPokemonDetails({
        height: formattedHeight,
        weight: weightLbs,
        specieName: species.name || ''
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
  }, [pokemonEvolutionChain]);

  useEffect(() => {
    if (!isEmpty(errorInEvolutionChain)) {
      setErrorMessageInEvolutionChain(errorInEvolutionChain)
    }
  }, [errorInEvolutionChain]);

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
    if (!getPokemonSpeciesLoading && !isEmpty(pokemonSpecies)) {
      const { evolution_chain } = pokemonSpecies || {};
      if (!isEmpty(evolution_chain?.url)) dispatch(GetEvolutionChain({ url: evolution_chain.url }));
    }
  }, [getPokemonSpeciesLoading, pokemonSpecies]);

  useEffect(() => {
    const localStorageHistory = localStorage.getItem("pokemonSearchHistory");

    if (localStorageHistory === null) {
      localStorage.setItem("pokemonSearchHistory", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(SetClearState());
    }
  }, []);

  return (
    <div>

      <div style={{ display: 'flex', marginTop: '60px' }}>
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          sx={{ marginLeft: '12px', width: '120px' }}
        >
          Go Back
        </Button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '60px' }}>
        {
          (getPokemonLoading) ?
            <Box sx={{ display: 'flex' }}> <CircularProgress /> </Box>
            : null
        }
      </div>

      <PokemonDetails
        getPokemonSpeciesLoading={getPokemonSpeciesLoading}
        getPokemonEvolutionChainLoading={getPokemonEvolutionChainLoading}
        evolutionChainFetched={evolutionChainFetched}
        searchedPokemon={params?.name || ''}
        spritesList={spritesList}
        pokemonDetails={pokemonDetails}
        abilityList={abilityList}
        moveList={moveList}
        evolutionChainList={evolutionChainList}
        errorMessageInEvolutionChain={errorMessageInEvolutionChain}
      />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '60px' }}>
        <div> {
          !isEmpty(errorMessage) ? <div>
            <h3>{errorMessage}</h3>
          </div> : null
        } </div>
      </div>

    </div>
  );
};

export default SearchPokemonPage;
