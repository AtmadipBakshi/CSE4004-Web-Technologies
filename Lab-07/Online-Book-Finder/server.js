const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

async function connectDB() {
    await client.connect();
    db = client.db("bookDB");
    console.log("MongoDB Connected");
}
connectDB();


// 1️⃣ Search Books by Title
app.get("/books/search", async (req, res) => {

    const title = req.query.title;

    const books = await db.collection("books")
        .find({ title: { $regex: title, $options: "i" } })
        .toArray();

    res.json(books);
});


// 2️⃣ Filter Books by Category
app.get("/books/category/:category", async (req, res) => {

    const category = req.params.category;

    const books = await db.collection("books")
        .find({ category: category })
        .toArray();

    res.json(books);
});


// 3️⃣ Sort by Price
app.get("/books/sort/price", async (req, res) => {

    const books = await db.collection("books")
        .find()
        .sort({ price: 1 })
        .toArray();

    res.json(books);
});


// 3️⃣ Sort by Rating
app.get("/books/sort/rating", async (req, res) => {

    const books = await db.collection("books")
        .find()
        .sort({ rating: -1 })
        .toArray();

    res.json(books);
});


// 4️⃣ Top Rated Books
app.get("/books/top", async (req, res) => {

    const books = await db.collection("books")
        .find({ rating: { $gte: 4 } })
        .limit(5)
        .toArray();

    res.json(books);
});


// 5️⃣ Pagination
app.get("/books", async (req, res) => {

    const page = parseInt(req.query.page) || 1;

    const limit = 5;
    const skip = (page - 1) * limit;

    const books = await db.collection("books")
        .find()
        .skip(skip)
        .limit(limit)
        .toArray();

    res.json(books);
});


app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});