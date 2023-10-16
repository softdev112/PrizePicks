import React from 'react';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Paper, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import CircularProgress from '@mui/material/CircularProgress';

import { PokemonDetailsProps } from '../models/pokemon';

const PokemonDetails: React.FC<PokemonDetailsProps> = ({
  evolutionChainFetched,
  searchedPokemon,
  pokemonDetails,
  abilityList,
  moveList,
  evolutionChainList,
  errorMessageInEvolutionChain,
  spritesList,
  getPokemonSpeciesLoading,
  getPokemonEvolutionChainLoading
}) => {
  return (
    <div>
      {spritesList.length ? (
        <div style={{ overflowX: 'auto', margin: '20px 0', height: 250 }}>
          <Grid container spacing={2}>
            {spritesList.map((img, index) => (
              <Grid item xs={12} sm={6} md={12} lg={3} key={index}>
                <ImageListItem
                  sx={{
                    justifyContent: 'center',
                    width: 250,
                    height: 150,
                    border: '1px solid'
                    // background: 'rgb(22, 118, 210, 1)' // 'rgb(34, 193, 195)', // 'rgb(240, 240, 240)' // 'rgb(34, 193, 195)',
                  }}
                >
                  <img
                    srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${img}?w=164&h=164&fit=crop&auto=format`}
                    alt={img}
                    loading="lazy"
                  />
                </ImageListItem>
              </Grid>
            ))}
          </Grid>
        </div>
      ) : null}

      {(isEmpty(pokemonDetails.height) || isEmpty(pokemonDetails.weight) || !abilityList?.length) ? null : (
        <>
          <Card elevation={4} sx={{ margin: '14px', padding: '16px' }}>
            <CardContent>
              <Typography variant="body1" gutterBottom>
                <strong>Pokemon Details </strong>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="body1">
                    <strong>Pokemon:</strong> {searchedPokemon}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1">
                    <strong>Height:</strong> {pokemonDetails.height}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1">
                    <strong>Weight:</strong> {pokemonDetails.weight + ' lb'}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1">
                    <strong>Specie:</strong> {pokemonDetails.specieName}
                  </Typography>
                </Grid>
              </Grid>
              {abilityList.length > 0 && (
                <div>
                  <strong>Abilities : </strong>
                  <span>
                    {abilityList.map((result, index) => (
                      <span style={{ marginRight: '8px' }} key={index}>{result + ' '}</span>
                    ))}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {moveList.length > 0 && (
        <div>
          <br />
          <Typography variant="h5" gutterBottom>
            Moves
          </Typography>
          <Grid container spacing={2}>
            {moveList.map((result, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Paper elevation={2} style={{ padding: '8px', textAlign: 'center' }}>
                  {result}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      <div>
        <br />
        {
          evolutionChainFetched && evolutionChainList?.length ?
            <Typography variant="h5" gutterBottom>
              Evolution
            </Typography>
            : evolutionChainFetched && evolutionChainList?.length === 0 ? <>
              <Typography variant="h5" gutterBottom>
                Evolution
              </Typography>
              <Typography variant="h6" gutterBottom>
                No evolution to show for this pokemon
              </Typography>
            </>
              : null
        }

        <div>
          {(getPokemonSpeciesLoading || getPokemonEvolutionChainLoading) ?
            <Box sx={{ display: 'flex', justifyContent: 'center' }}> <CircularProgress /> </Box>
            : null
          }
        </div>
        <Grid container spacing={2} sx={{ marginBottom: '50px' }}>
          {evolutionChainList.map((result, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper
                elevation={2}
                style={{
                  padding: '8px',
                  textAlign: 'center',
                  backgroundColor: 'rgb(22, 118, 210, 1)'
                }}
              >
                <Link to={`/pokemon/${result}`} style={{ color: 'white', textDecoration: 'none' }}>
                  {result}
                </Link>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
      {!isEmpty(errorMessageInEvolutionChain) ? 'Sorry some issue in getting evolution chain' : null}
    </div>
  );
};

export default PokemonDetails;
