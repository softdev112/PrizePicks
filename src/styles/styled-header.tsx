import styled from 'styled-components';

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  color: white;
  margin-left: auto; // Move the list to the right
`;

export const StyledListItem = styled.li`
  margin-left: 16px; // Adjust as needed
  color: white;
  text-decoration: none
`;

export const LogoText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;
