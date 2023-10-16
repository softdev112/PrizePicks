import React from 'react';
import {
  Route,
  Routes,
  BrowserRouter as Router
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Layout from './layout';

import PokemonDetails from '../src/container/dashboard/pokemon-details';
import Pokemon from '../src/container/dashboard';
import SearchHistory from '../src/container/dashboard/history';

const theme = createTheme();

const App = () => (
  <div className="App">
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Pokemon />} />
            <Route exact path="/history" element={<SearchHistory />} />
            <Route exact path="/pokemon/:name" element={<PokemonDetails />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  </div>
);

export default App;
