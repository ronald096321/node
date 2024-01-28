const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb+srv://vinaypk07:Sinvin@cluster0.uzscmqy.mongodb.net/")
  .then(() => {
    console.log("connection eastiblished");
  })
  .catch((e) => {
    console.log("connection failed : ", e);
  });

app.get("/", (req, res) => {
  res.send("Hellow World");
});

app.listen(3000, () => {
  console.log("server is started");
});
