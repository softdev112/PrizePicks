import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, CssBaseline, Container } from '@mui/material';
import { StyledHeader, StyledList, StyledListItem } from '../styles/styled-header';

export default function Index({ children }) {
  return (
    <div>
      <CssBaseline />
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <StyledHeader>
            <Typography variant="h6">Pokedex</Typography>
            <nav>
              <StyledList>
                <StyledListItem>
                  <NavLink style={{ color: 'white', textDecoration: 'none' }} to="/" exact>Home</NavLink>
                </StyledListItem>
                <StyledListItem>
                  <NavLink style={{ color: 'white', textDecoration: 'none' }} to="/history">History</NavLink>
                </StyledListItem>
              </StyledList>
            </nav>
          </StyledHeader>
        </Toolbar>
      </AppBar>
      <Container>
        {children}
      </Container>
    </div>
  );
}
