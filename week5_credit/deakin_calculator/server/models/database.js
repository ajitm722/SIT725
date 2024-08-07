// server/database.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db(process.env.DB_NAME);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    process.exit(1);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };

