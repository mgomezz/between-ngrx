const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express(),
  randomId = require("random-id");
bodyParser = require("body-parser");
port = 3080;

const idlen = 10;
var heroes = [];
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../ui/build")));

//GET ALL HEROES
app.get("/api/heroes", (req, res) => {
  console.log("api/heroes called!");
  res.json(heroes);
});

//GET HERO BY ID
app.get("/api/hero/:id", (req, res) => {
  const id = req.params.id;
  const hero = heroes.find((hero) => hero.id === id);
  res.json(hero);
});

//GET HEROES BY PART OF THE NAME
app.get("/api/heroes/:partialName", (req, res) => {
  const partialName = req.params.partialName.toLowerCase();
  const matchedHeroes = heroes.filter((hero) =>
    hero.name.toLowerCase().includes(partialName)
  );
  res.json(matchedHeroes);
});

//ADD HERO
app.post("/api/hero", (req, res) => {
  const hero = req.body.hero;
  const id = randomId(idlen);
  hero.id = id;
  heroes.push(hero);
  res.json({ status: true, message: `Hero ${hero.name} added succesfully` });
});

//DELETE HERO
app.delete("/api/hero/:id", (req, res) => {
  console.log("deleting hero:::", req.params.id);
  const id = req.params.id;
  heroes = heroes.filter((hero) => hero.id !== id);
  res.json({
    status: true,
    message: `Hero ${id} deleted succesfully`,
    data: heroes,
  });
});

//UPDATE HERO
app.put("/api/hero", (req, res) => {
  var hero = req.body.hero;
  heroes = heroes.map((hro) => {
    if (hro.id === hero.id) hro = hero;
    return hro;
  });
  res.json({ status: true, message: `Hero ${hero.name} edited succesfully` });
});

//SERVER UP NOTIFICATION
app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
