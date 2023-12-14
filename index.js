var express = require("express");
var mongoose = require("mongoose");
let path = require("path");
var cors = require("cors");

var app = express();
app.use(cors());
app.use(express.json());

var productSchema = mongoose.Schema({
  _id: Number,
  name: String,
  price: Number,
  color: String,
  manufacturer: String,
  startingDateAvailable: String,
  endingDateAvailable: String,
  image: String,
  description: String,
});
var Product = mongoose.model("Product", productSchema);

mongoose
  .connect("mongodb://localhost/Products")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.get("/", function (req, res) {
  res.send("Hello world!");
});

// products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(500).send("Error fetching products");
  }
});

// products/:id
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product) return res.status(404).send("Product not found");
    res.send(product);
  } catch (err) {
    res.status(500).send("Error fetching product");
  }
});

// products update by id
app.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      upsert: true,
    });
    res.send(product);
  } catch (err) {
    res.status(500).send("Error updating product");
  }
});

// products delete by id
app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.send("Product deleted");
  } catch (err) {
    res.status(500).send("Error deleting product");
  }
});

app.get("/products/:id/:field", async (req, res) => {
  try {
    // products/identifiers
    if (req.params.id === "identifiers") {
      const products = await Product.find();
      return res.send(products.map((e) => ({ _id: e._id })));
    }

    // products/images/{filename}
    if (req.params.id === "images" && req.params.field) {
      return res.sendFile(`images/${req.params.field}`, { root: __dirname });
    }

    // products/:id/field
    if (req.params.id && req.params.field) {
      const product = await Product.findOne({ _id: req.params.id }).exec();
      if (!product) return res.status(404).send("Product not found");
      return res.send({ [req.params.field]: product[req.params.field] });
    }
    res.status(404).send("Id or field not found");
  } catch (err) {
    res.status(500).send("Error fetching product");
  }
});

// products update field by id
app.patch("/products/:id/:field", async (req, res) => {
  try {
    const update = { [req.params.field]: req.body.value };
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true }
    );
    if (!product) return res.status(404).send("Product not found");
    res.send(product);
  } catch (err) {
    res.status(500).send("Error updating product");
  }
});

// products/page/:skip/:limit
app.get("/products/page/:skip/:limit", async (req, res) => {
  try {
    const skip = parseInt(req.params.skip);
    const limit = parseInt(req.params.limit);
    const products = await Product.find().skip(skip).limit(limit);
    res.send(products);
  } catch (err) {
    res.status(500).send("Error fetching products");
  }
});

app.listen(3000);
