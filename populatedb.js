#! /usr/bin/env node

console.log('This script populates some test categories to the database.');
console.log('Usage .: node populatedb "<some_connection>"');

const userArgs = process.argv.slice(2);

const Category = require('./models/category');
const Brand = require('./models/brand');

const categories = [];
const brands = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

const createCategory = async (index, name, description) => {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
};

const populateCategory = async () => {
  console.log('Adding categories');
  await Promise.all([
    createCategory(
      0,
      'String',
      'String instruments—also termed stringed or chordophones—originate or produce sound from vibrating strings.'
    ),
    createCategory(
      1,
      'Percussion',
      `These instruments are sounded by striking or scraping the instruments using a beater or rubbing the instruments with one's hand.`
    ),
    createCategory(
      2,
      'Keyboard',
      'The keyboard instruments are characterized by standard keyboard, though their operations vary in range and usage.'
    ),
  ]);
};

const main = async () => {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await populateCategory();
  // await createBrand();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
};

main().catch((err) => console.log(err));
