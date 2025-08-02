const express = require("express");
// mongoose
const mongoose = require('mongoose');
const app = express();

const productsRouter = require("./routes/product");

const logger = require("./middleware/logger");

// db connect mb
mongoose.connect('mongodb+srv://mmuaath30:CrG2VbTSYmy3alKG@cluster0.nlnzkrx.mongodb.net/muaathdb?retryWrites=true&w=majority&appName=Cluster0');










// nedd to form sumit
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// viw
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

app.get("/about", (req, res) => {
  res.render("index", {
    title: "About",
  });
});





app.get("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const users = [
    { id: 1, name: "Muaath", age: 17 },
    { id: 2, name: "ROOTMASTER", age: 18 },
    { id: 3, name: "Ahsan", age: 30 },
    { id: 4, name: "MAtheen", age: 35 },
  ];

  const user = users.find((u) => u.id === userId);

  res.render("users", {
    user,
  });
});

app.use("/products", logger, productsRouter);

// img
app.use(express.static("public"));

// 404
app.use((req, res) => {
  res.status(404).jeson("<h1>404 - Page Not Found</h1>");
});

app.listen(8085);
