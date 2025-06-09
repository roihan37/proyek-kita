const { mongoConnect, getDatabase } = require("./config/mongoConnection.js");

const run = async () => {
  await mongoConnect(); // connect to DB
  const db = getDatabase();

  const collection = db.collection("menus");

  // 🔁 Insert contoh data
  await collection.insertOne({
    name: "Udon Spicy",
    price: 30000,
    available: true,
    category: "noodle",
  });

  // 🔍 Fetch data dan tampilkan
  const data = await collection.find().toArray();
  console.log("📦 Data di database:");
  console.log(data);
};

run();
