const mongoose = require('mongoose');

// Use process.env for MongoDB connection URI
const uri = process.env.MONGODB_URI || 'mongodb+srv://tusmusgun:tusharYADAV%402105@cluster0.fljgt.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB and specify the database name
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  dbName: process.env.DB_NAME, // Specify the database name here
});

// Get the default connection
const db = mongoose.connection;

// Event listeners for the MongoDB connection
db.on('connected', () => {
  console.log(`Connected to MongoDB at ${uri}`);
  console.log(`Using database: ${db.name}`);
});

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Export the database connection
module.exports = db;
