# React Blackjack

A simple Blackjack game built with React for the frontend and Express.js for the backend. The backend handles all game logic and state, while the frontend provides an interactive UI for playing the game.

## Features
- Play Blackjack against a dealer
- Backend logic ensures fair play and game state
- REST API endpoints for game actions (start, hit, stand)
- Responsive and modern UI
- Card colors change based on suit

## Getting Started

### Prerequisites
- Node.js and npm installed

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo-name.git
   cd React-blackjack
   ```
2. Install backend dependencies:
   ```sh
   cd server
   npm install
   ```
3. Install frontend dependencies:
   ```sh
   cd ../client
   npm install
   ```

### Running the App
1. Start the backend server:
   ```sh
   cd server
   node index.js
   ```
2. Start the frontend React app (in a new terminal):
   ```sh
   cd client
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser to play.

## API Endpoints
- `GET /api/start-game` — Start a new game
- `GET /api/player-hit` — Player draws a card
- `GET /api/player-stand` — Player stands, dealer plays

## Project Structure
```
React-blackjack/
  client/    # React frontend
  server/    # Express backend
```
