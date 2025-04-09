
# Rick and Morty Character Explorer

A modern web application for exploring characters from the Rick and Morty universe. This interactive app allows you to search for your favorite characters, view their details, and navigate through the multiverse with a sleek, responsive UI.

### Known improvements:

- **Font**: if you use dark mode and portal mode on, in some places the glassmorphism can make it hard to read the text, you can hide the portal to make it easier to read if it troubles you


## Features

- **Character Search**: Find any character from the Rick and Morty universe
- **Detailed Character Profiles**: View comprehensive information about each character
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Theme Switching**: Toggle between light and dark modes
- **Portal Background**: Enjoy an immersive portal effect backdrop
- **Internationalization**: Available in English and Portuguese
- **Custom Font Toggle**: Switch between standard font and the special "WubbaLubbaDubDub" font

## Technologies

- **React 19**: Latest version of the React library for building user interfaces
- **TypeScript**: For type-safe JavaScript development
- **Vite**: Modern build tool for faster development experience
- **TailwindCSS**: Utility-first CSS framework for styling
- **Tanstack Query**: Data-fetching and state management
- **i18next**: Internationalization framework
- **Axios**: Promise-based HTTP client
- **Vitest**: Testing framework compatible with Vite
- **Cypress**: End-to-end testing framework

## Getting Started

### Prerequisites

- Node.js (v16.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/matheusaugm/https://github.com/matheusaugm/rick-and-morty-tracker.git
   cd rick-and-morty-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

#### Development Mode
```bash
npm run dev
```
This starts the development server at http://localhost:5173

#### Build for Production
```bash
npm run build
```

#### Preview Production Build
```bash
npm run preview
```

### Testing

#### Unit and Integration Tests
```bash
npm run test        # Run tests once
npm run test:watch  # Run tests in watch mode
npm run test:coverage  # Generate test coverage report
```

#### End-to-End Tests
```bash
npm run cypress      # Open Cypress in interactive mode
npm run test:e2e     # Run end-to-end tests in the browser
npm run test:e2e:headless  # Run end-to-end tests headlessly
```

### Linting
```bash
npm run lint       # Check for lint errors
npm run lint:fix   # Fix lint errors automatically
```

## Project Structure

- `/src`: Source code
  - `/components`: UI components organized by atomic design principles
  - `/hooks`: Custom React hooks
  - `/contexts`: React context providers
  - `/services`: API services
  - `/pages`: Page components
  - `/i18n`: Internationalization configuration
  - `/lib`: Utility functions
  - `/test`: Test utilities and mocks
- `/public`: Static assets
- `/cypress`: End-to-end tests

## API

This project uses the [Rick and Morty API](https://rickandmortyapi.com/) to fetch character data.


## Credits 

- [Rick and Morty API](https://rickandmortyapi.com/)
- [Font creator post](https://www.reddit.com/r/rickandmorty/comments/pxyg17/ive_made_new_rick_and_morty_font_called_wubba/)
- [Glowing button creator](https://codepen.io/kocsten/pen/rggjXp)