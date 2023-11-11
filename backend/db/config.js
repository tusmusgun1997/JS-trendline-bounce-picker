const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://tusmusgun:tusharYADAV%402105@cluster0.fljgt.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'stocks_market'
    });
    console.log("MongoDB connected");

    return connectDB

  } catch (error) {
    console.log(error.message);
    console.log("error in mongo");
    process.exit();
  }
};

module.exports = connectDB;
