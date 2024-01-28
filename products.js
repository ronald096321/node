const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb+srv://vinaypk07:Sinvin@cluster0.uzscmqy.mongodb.net/")
  .then(() => {
    console.log("connection eastiblished");
  })
  .catch(() => {
    console.log("DB connection failed");
  });

// Create Schema

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  stock: Number,
});

// Create Model
const ProductModel = mongoose.model("Product", productSchema);

// add Product

app.post("/addProduct", async (req, res) => {
  const data = req.body;
  const product = new ProductModel(data);
  const savedDocument = await product.save();
  res.status(201).send({
    message: "Data Inserted",
    data: savedDocument,
  });
});

// get products

app.get("/getAllProducts", async (req, res) => {
  const allProducts = await ProductModel.find();
  res.status(200).send(allProducts);
});

// get product by id

// app.get("/getProduct/:id", async (req, res) => {
//   const id = req.params.id;

//   const filteredProduct = ProductModel.find({ _id: id });
//   res.send(filteredProduct);
// });

// get product by category

app.post("/getProduct", async (req, res) => {
  const filterItem = req.body;
  //   const id = req.query.id;
  if (filterItem.category) {
    // console.log("category", category);
    const filteredProduct = await ProductModel.find({
      category: filterItem.category,
    });
    res.send(filteredProduct);
  } else {
    // console.log("id", id);
    const filteredProduct = await ProductModel.findById(filterItem.id);
    res.send(filteredProduct);
  }
});

app.listen(3000, () => {
  console.log("server listining at port 3000");
});
