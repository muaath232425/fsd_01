const express = require("express");
// mongoose
const mongoose = require("mongoose");
const app = express();

const productsRouter = require("./routes/product");

// db connect mb
mongoose.connect(
  "mongodb+srv://mmuaath30:CrG2VbTSYmy3alKG@cluster0.nlnzkrx.mongodb.net/assignment?retryWrites=true&w=majority&appName=Cluster0"
);


// JSON body parse Most need
app.use(express.json());


// product rout
app.use("/products", productsRouter);

// 404
app.use((req, res) => {
  res.status(404).jeson("<h1>404 - Page Not Found</h1>");
});

app.listen(8085);
