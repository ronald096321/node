const express = require("express");

const mongoose = require("mongoose");
const app = express();
app.use(express.json());

// const products = [];
// Mongo DB connection
mongoose
  .connect("mongodb+srv://vinaypk07:Sinvin@cluster0.uzscmqy.mongodb.net/")
  .then(() => {
    console.log("connection eastiblished");
  })
  .catch((error) => {
    console.log("connection failed");
  });

// express server
app.listen(3000, () => {
  console.log("server listining at port 3000");
});

// Starter code
app.get("/", (req, res) => {
  res.send("Hello World");
});

//Product :  name ,price ,category , and stock

// create Product schema

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  stock: Number,
});

// create model

const ProductModel = mongoose.model("Product", productSchema);

// Create
app.post("/addProduct", async (req, res) => {
  const body = req.body;
  const product = new ProductModel(body);
  const productResult = await product.save();
  //   products.push(body);
  console.log(productResult);
  res.status(201).json("document created");
});
// find

// get All Products

app.get("/getProducts", async (req, res) => {
  const products = await ProductModel.find();
  console.log(products);
  res.send(products);
});

app.get("/getProduct/:name", (req, res) => {
  const parm = req.params.name;
  // let index =
});
// Delete
