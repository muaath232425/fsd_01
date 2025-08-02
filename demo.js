const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Home Muaath</h1>");
});

app.get("/user/response/:id", (req, res) => {
  // sample users data
  const users = {
    1: { name: "Muaath", age: 17 },
    2: { name: "Halik", age: 30 },
    3: { name: "Sarjoon", age: 25 },
  };

  // request parameter get id value from root url
  const user_id = req.params.id;

  // get user prameter id from users arry sarch id
  const user = users[user_id];

  if (user) {
    // user in
    res.send(
      `<h1>User ID : ${user_id}</h1><h2>Name : ${user.name}</h2><h2>Age : ${user.age}</h2>`
    );
  } else {
    // user not found
    res.status(404).send("<h1>User not found</h1>");
  }
});

app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  res.send(`<h1>User id : ${id}</h1>`);
});

app.get("/contact", (req, res) => {
  res.send("<h1>Email : mmuaath30@gmail.com</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Muaath</h1>");
});

app.get("/query", (req, res) => {
  const query = req.query;

  res.send(`<h1>Query ${JSON.stringify(query)}</h1>`);
});

// animals data json
const animals = [
  { id: 1, name: "Dog" },
  { id: 2, name: "Cat" },
  { id: 3, name: "Elephant" },
  { id: 4, name: "Tiger" },
  { id: 5, name: "Lion" },
  { id: 6, name: "Monkey" },
  { id: 7, name: "Panda" },
  { id: 8, name: "Kangaroo" },
  { id: 9, name: "Zebra" },
  { id: 10, name: "Giraffe" },
];

// all animals get
app.get("/animals", (req, res) => {
  res.json(animals); // return json
});

// spaecific animal
app.get("/animals/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const animal = animals.find((x) => x.id === id);

  // if else shoet form
  animal ? res.json(animal) : res.send("Animal not found");
});

app.use((req, res) => {
  res.status(404).send("<h1>404 - Page Not Found</h1>");
});

app.listen(8080);
