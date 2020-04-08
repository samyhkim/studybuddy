const db = require("../config/db");
const Deck = require("../models/decks");

const addDeck = (deck) => {
  Deck.create(deck).then((deck) => {
    console.log("New Deck Added");
    db.connection.close();
  });
};

const findDeck = (title) => {
  // Make case insensitive
  const search = new RegExp(title, "i");
  Deck.find({ title: search }).then((deck) => {
    console.log(deck);
    console.log(`${deck.length} matches`);
    db.connection.close();
  });
};

module.exports = { addDeck, findDeck };
