#! /usr/bin/env node

console.log('This script populates some test categories to the database.');
console.log('Usage .: node populatedb "<some_connection>"');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require('./models/category');

const categories = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createCategory();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function createCategory() {
  console.log('Adding categories');
  await Promise.all([
    categoryCreate(
      0,
      'String',
      'String instruments—also termed stringed or chordophones—originate or produce sound from vibrating strings.'
    ),
    categoryCreate(
      1,
      'Percussion',
      `These instruments are sounded by striking or scraping the instruments using a beater or rubbing the instruments with one's hand.`
    ),
    categoryCreate(
      2,
      'Keyboard',
      'The keyboard instruments are characterized by standard keyboard, though their operations vary in range and usage.'
    ),
  ]);
}
