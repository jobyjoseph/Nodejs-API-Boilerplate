const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const genres = [
  { id: 1, name: "Action"},
  { id: 2, name: "Thriller"},
  { id: 3, name: "Comedy"},
];


/*==== Get all genres ====*/
app.get("/api/genres", (req, res) => {
  res.send(genres);
});


/*==== Get one genre ====*/
app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => {
    return g.id === parseInt(req.params.id)
  });

  // Invalid id
  if(!genre)
    return res.status(404).send("Invalid id");

  // Valid case
  return res.send(genre);
});


/*==== Create genre ====*/
app.post("/api/genres", (req, res) => {
  // Invalid genre value
  const {error} = validateGenre(req.body);
  if(error)
    return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  }
  genres.push(genre);
  res.send(genre);
});

/*==== Update genre ====*/
app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => {
    return g.id === parseInt(req.params.id)
  });

  // Invalid id
  if(!genre)
    return res.status(404).send("Invalid id");

  // Invalid genre value
  const {error} = validateGenre(req.body);
  if(error)
    return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

/*==== Delete genre ====*/
app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => {
    return g.id === parseInt(req.params.id)
  });

  // Invalid id
  if(!genre)
    return res.status(404).send("Invalid id");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});


/*==== Validate genre ====*/
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}


/*==== Start server ====*/
app.listen(3000, () => {
  console.log("Server is listening...");
});