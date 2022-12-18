const mongoose = require("mongoose");

// ==========================================================
// ==========================================================
// Mongoose Functionality
// ==========================================================
// ==========================================================
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://group4:CAmnZDqsEZG5BhAh@cluster0.p5rbdcl.mongodb.net/?retryWrites=true&w=majority" || process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit();
  }
};

module.exports = connectDB;
