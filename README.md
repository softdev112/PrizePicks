# Pokedex Web App

This is a simple web application that simulates a Pokedex. User are allowed to search and explore various Pokemon species. Below, you'll find an overview of the application's features, how to run it, possible improvements, and more.

## Features
- **Search by Name**:
 Users can able to search any Pokemon by their names.

- **Search History**:
 Able to see a history of what has been searched and revisit at anytime,history is only maintained if user have searched the valid pokemon

- **Pokemon Details**: 
Detailed information is provided about abilities, moves, species, sprites.

- **Evolution Chain**: 
User is able to see other evolutions of Pokemon and be able to navigate to specific Pokemon in the evolution chain.

- **Sleek Layout**: 
Try to apply application's layout is designed to resemble a Pokedex to some extend

- **Automated Test**: 
Automated tests that ensure the business logic implemented is correct. Not Covered in the Current Time Provided.

## Getting Started
To run the application locally, follow these steps:

1. Clone the repository to your local machine.
2. Move to the repo from terminal.
3. install project dependencies by npm i.
4. Start the development server by npm start.

## Technology Stack
- **Frontend**: React, Redux, Material-UI, Styled Components
- **Routing**: React Router
- **State Management**: Redux Toolkit
- **API Calls**: Axios
- **Utility Functions**: Lodash

The project is organized with the following folder structure:
 **`src/`**: The main source code for the app resides in this directory, and it's further organized as follows:
  - **`components/`**: React components used throughout the app.
  - **`container/`**: The Main Pages Used in this app.
  - **`layout/`**: Components that define the layout of the app, such as the header.
  - **`models/`**: Defines data models and interfaces used within the app.
  - **`redux/`**: Redux store setup, reducers, actions, and slices.
  - **`styles/`**: Styles, including styled components.
  - **`utils/`**: Utility functions, helpers, and constants used in the app.

- **Improvements In project**:
We can add more feature like 
1. Stats
2. Types
3. Weaknesses
4. Gender any many more
5. We can also improve the styling in this project, like some where using inline styles (where i need more styling i have add it in the styles)