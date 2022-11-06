export function createDeck(): string[] {
  const suits = ['H', 'D', 'C', 'S'];
  const ranks = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'T',
    'J',
    'Q',
    'K',
    'A',
  ];
  let deck = [];

  for (let suitCounter = 0; suitCounter < suits.length; suitCounter++) {
    for (let rankCounter = 0; rankCounter < ranks.length; rankCounter++) {
      deck.push(ranks[rankCounter] + suits[suitCounter]);
    }
  }
  return deck;
}

export function shuffleDeck(deck: string[]) {
  for (let i = 0; i < 52; i++) {
    let tempCard = deck[i];
    let randomIndex = Math.floor(Math.random() * 52);
    deck[i] = deck[randomIndex];
    deck[randomIndex] = tempCard;
  }
}
