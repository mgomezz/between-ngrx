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
app.get("/api/user/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((usr) => usr.id === id);
  res.json(user);
});

//ADD USER
app.post("/api/user", (req, res) => {
  const user = req.body.user;
  const id = randomId(idlen);
  user.id = id;
  users.push(user);
  res.json({ status: true, message: `User ${user.firstName} added succesfully` });
});

//DELETE USER
app.delete("/api/user/:id", (req, res) => {
  console.log("deleting user:::", req.params.id);
  const id = req.params.id;
  users = users.filter((user) => user.id !== id);
  res.json({
    status: true,
    message: `User ${id} deleted succesfully`,
    data: users,
  });
});

//UPDATE USER
app.put("/api/hero", (req, res) => {
  var user = req.body.user;
  users = users.map((usr) => {
    if (usr.id === user.id) usr = user;
    return usr;
  });
  res.json({ status: true, message: `User ${user.name} edited succesfully` });
});

//SERVER UP NOTIFICATION
app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
