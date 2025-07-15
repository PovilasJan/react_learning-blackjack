import Deck from './src/Deck.js';
import Card from './src/Card.js';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;
app.use(cors());

let playerCards = [];
let dealerCards = [];

// Example API endpoint
app.get('/api/blackjack', (req, res) => {

  res.json({ message: 'Blackjack API is working!' });

});

// API endpoint to start a new game
app.get('/api/start-game', (req, res) => {
  let { playerCards: newPlayerCards, dealerCards: newDealerCards, status } = startGame();
  playerCards = newPlayerCards;
  dealerCards = newDealerCards;
  let playerValue = countValue(playerCards);
  let dealerValue = countValue(dealerCards);
  if (playerValue === 21) {
    if (dealerValue === 21) {
      status = 'draw';
    } else {
      status = 'win';
    }
  }

res.json({ playerCards, dealerCards, playerValue, dealerValue, status });
});

app.get('/api/player-hit', (req, res) => {

  let { card, status } = hit();
  playerCards.push(card);
  let playerValue = countValue(playerCards);
res.json({ playerCards,playerValue,status });
});

app.get('/api/player-stand', (req, res) => {

  let {dealerCards, status } = stand();
  let dealerValue = countValue(dealerCards);
res.json({dealerCards,dealerValue,status});
});

//  start game
//reshuffle deck

function startGame() {

  playerCards = [];
  dealerCards = [];
  deck = new Deck();
  deck.shuffle();
  playerCards.push(deck.dealCard());
  playerCards.push(deck.dealCard());

  dealerCards.push(deck.dealCard());
  if(countValue(playerCards) === 21){
    return { playerCards, dealerCards, status: 'blackjack' };
  } 

  return { playerCards, dealerCards, status: 'playing' };  

}
function hit(){
  const card = deck.dealCard();
  if (!card) return { status: 'bust' };
  
  const currentValue = countValue(playerCards.concat(card));
  
  if (currentValue > 21) {
    return { card, status: 'bust' };
  } else if (currentValue === 21) {
    return {  card, status: 'win' };
  } else {
    return { card:card, status: 'playing' };
  }  

}
function stand() {
  while (countValue(dealerCards) < 17) {
    dealerCards.push(deck.dealCard());
  }

  const playerValue = countValue(playerCards);
  const dealerValue = countValue(dealerCards);
  
  if (dealerValue > 21 || playerValue > dealerValue) {
    return { playerCards, dealerCards, status: 'win' };
  } else if (playerValue < dealerValue) {
    return { playerCards, dealerCards, status: 'lose' };
  } else {
    return {  dealerCards, status: 'draw' };
  }
}



function countValue(cards) {
  let value = 0;
  let aces = 0;
  for (let card of cards) {
    if (card.number === 'A') {
      aces++;
      value += 11;
    } else if (['J', 'Q', 'K'].includes(card.number)) {
      value+= 10;
    } else {
      value+= parseInt(card.number, 10);
    }
  }
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }
  return value;
}



let deck = new Deck();
deck.shuffle();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




