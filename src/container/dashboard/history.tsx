import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, Grid } from '@mui/material';

import { Pokemon } from '../../models/pokemon'

const SearchHistory = () => {
  const [searchedPokemonList, setSearchedPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    const historyList = JSON.parse(localStorage.getItem("pokemonSearchHistory"));

    if (historyList.length) {
      setSearchedPokemonList(historyList);
    }
  }, []);

  return (
    <div>
      <h1>Search History</h1>
      {
          !searchedPokemonList.length ? <h4>Nothing search yet </h4> : null
      }
      {searchedPokemonList.length > 0 && (
        <div>
          <Typography variant="h6" gutterBottom>
            Here is some list of pokemon you have searched
          </Typography>
          <Grid container spacing={2}>
            {searchedPokemonList.map((result, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Paper
                  elevation={2}
                  style={{
                    padding: '8px',
                    textAlign: 'center',
                    backgroundColor: 'rgb(22, 118, 210, 1)'
                  }}
                >
                  <Link to={`/pokemon/${result.name}`} style={{ color: 'white', textDecoration: 'none' }}>
                    {result.name}
                  </Link>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div >
  );
};

export default SearchHistory;
