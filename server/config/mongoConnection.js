
const { MongoClient } = require("mongodb");


const connectionString = "mongodb://127.0.0.1:27017";
// const connectionString = "mongodb+srv://proroihan:pCpM7tfJrfcmZtma@roihan.wuzucp7.mongodb.net/test";

let db = null;

// Fungsi untuk koneksi ke db
const mongoConnect = async () => {
  const client = new MongoClient(connectionString);

  try {
    await client.connect()
    // client.db("nama-database-yang-akan-digunakan")
    const database = client.db("ProyekkitaDB");

    // Nilai variable global yang akan diset
    db = database;
    // console.log(database);

    return database;
  } catch (err) {
    // await client.close();
    console.log(err);
  }
};


const getDatabase = () => {
    if (!db) console.log("⚠️ Database not initialized!");
    return db;
  };

module.exports = {
  mongoConnect,
  // Export getDatabase-nya
  getDatabase,
};
