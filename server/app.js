const express = require("express");
const cors = require("cors");
// const  connectDB  = require("./config/mongoConnection");
const router = require('./routers/index');
const { default: connectDB } = require("./config/mongoConnection");
const app = express();
const port = 4001;



app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

connectDB();


// const PORT = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
// Jadi sekarang sebelum masuk ke routing di bawah,
// kita harus koneksi ke db kita terlebih dahulu

