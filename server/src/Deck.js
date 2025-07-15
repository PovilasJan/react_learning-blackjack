import Card from "./Card.js";

class Deck {

  constructor() {

    this.cards = this.generateDeck();

  }

  generateDeck() {

    const suits = ['♠', '♥', '♦', '♣'];
    const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    return suits.flatMap(suit => numbers.map(number => new Card(suit, number)));

  }

  shuffle() { 

    for (let i = this.cards.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];

    }

  }

  dealCard() {

    return this.cards.pop();

  }
  
}
export default Deck;