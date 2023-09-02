#! /usr/bin/env node

console.log('This script populates some test categories to the database.');
console.log('Usage .: node populatedb "<some_connection>"');

const userArgs = process.argv.slice(2);

const Category = require('./models/category');
const Brand = require('./models/brand');
const Instrument = require('./models/instrument');
const Item = require('./models/item');

const categories = [];
const brands = [];
const instruments = [];
const items = [];

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

const createBrand = async (index, name, country) => {
  const brand = new Brand({ name: name, country: country });
  await brand.save();
  brands[index] = brand;
  console.log(`Added brand: ${name}`);
};

const populateBrand = async () => {
  console.log('Adding brands');
  await Promise.all([
    createBrand(0, 'Yamaha', 'Japan'),
    createBrand(1, 'Gibson', 'United States'),
    createBrand(2, 'Hofner', 'Germany'),
  ]);
};

const createInstrument = async (
  index,
  name,
  price,
  brand,
  description,
  category
) => {
  const instrument = new Instrument({
    name: name,
    price: price,
    brand: brand,
    description: description,
    category: category,
  });
  await instrument.save();
  instruments[index] = instrument;
  console.log(`Added instrument: ${name}`);
};

const populateInstrument = async () => {
  console.log('Adding instruments');
  await Promise.all([
    createInstrument(
      0,
      'Guitar',
      471.99,
      brands[0],
      'A classic guitar made of pine.',
      categories[0]
    ),
    createInstrument(
      1,
      'Drum',
      132.59,
      brands[1],
      'Handcrafted drum ornamented with tribal trinkets.',
      categories[1]
    ),
    createInstrument(
      2,
      'Piano',
      6042.0,
      brands[2],
      'Grand piano with high quality finishes.',
      categories[2]
    ),
  ]);
};

const createItem = async (index, instrument, status, date_added) => {
  const item = new Item({
    instrument: instrument,
    status: status,
    date_added: date_added,
  });
  await item.save();
  items[index] = item;
  console.log(`Added item`);
};

const populateItem = async () => {
  console.log('Adding items');
  await Promise.all([
    createItem(0, instruments[0], 'Sold'),
    createItem(0, instruments[1]),
    createItem(0, instruments[2], 'Reserved'),
  ]);
};

const main = async () => {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await populateCategory();
  await populateBrand();
  await populateInstrument();
  await populateItem();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
};

main().catch((err) => console.log(err));
