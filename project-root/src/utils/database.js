const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db = null;

const connectToDatabase = async () => {
  try {
    await client.connect();
    db = client.db('your_database_name'); // Replace with your database name
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

const disconnectFromDatabase = async () => {
  try {
    await client.close();
    console.log('Disconnected from MongoDB!');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};

const find = async (collectionName, query) => {
  try {
    const collection = db.collection(collectionName);
    const result = await collection.find(query).toArray();
    return result;
  } catch (error) {
    console.error(`Error finding data in collection ${collectionName}:`, error);
    return null;
  }
};

const insert = async (collectionName, data) => {
  try {
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(data);
    return result;
  } catch (error) {
    console.error(`Error inserting data into collection ${collectionName}:`, error);
    return null;
  }
};

const update = async (collectionName, query, updateData) => {
  try {
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(query, { $set: updateData });
    return result;
  } catch (error) {
    console.error(`Error updating data in collection ${collectionName}:`, error);
    return null;
  }
};

const deleteOne = async (collectionName, query) => {
  try {
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne(query);
    return result;
  } catch (error) {
    console.error(`Error deleting data from collection ${collectionName}:`, error);
    return null;
  }
};

module.exports = {
  connectToDatabase,
  disconnectFromDatabase,
  find,
  insert,
  update,
  deleteOne,
};