
const { MongoClient } = require("mongodb");


const connectionString = "mongodb://127.0.0.1:27017";
// const connectionString = "mongodb+srv://proroihan:pCpM7tfJrfcmZtma@roihan.wuzucp7.mongodb.net/test";

let db = null;

// Fungsi untuk koneksi ke db
const mongoConnect = async () => {
    const client = new MongoClient(connectionString);
    try {
      const database = client.db("MeragumeudonDB");
      db = database;
      console.log("✅ MongoDB connected successfully!");
      return database;
    } catch (err) {
      console.log(err);
    }
  };
  
  const getDatabase = () => db;
  
  
module.exports = {
  mongoConnect,
  // Export getDatabase-nya
  getDatabase,
};
