const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express(),
  randomId = require("random-id");
bodyParser = require("body-parser");
port = 3080;

const idlen = 10;
var users = [];
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../ui/build")));

//GET ALL USERS
app.get("/api/users", (req, res) => {
  console.log("api/users called!");
  res.json(users);
});

//GET USER BY ID
app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((usr) => usr.id === id);
  res.json(user);
});

//ADD HERO
app.post("/api/users/create", (req, res) => {
  const user = req.body.user;
  users.push(user);
  res.json(user);
});

//DELETE HERO
app.delete("/api/users/:id", (req, res) => {
  console.log("deleting user:::", req.params.id);
  const id = req.params.id;
  const user = users.find((usr) => usr.id === id);
  users = users.filter((user) => user.id !== id);
  res.json(user);
});

//UPDATE USER
app.put("/api/users/update", (req, res) => {
  var user = req.body.user;
  users = users.map((usr) => {
    if (usr.id === user.id) usr = user;
    return usr;
  });
  res.json(user);
});

//SERVER UP NOTIFICATION
app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
