const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => {
    return c.id === parseInt(req.params.id)
  })
  if (!course)
    return res.status(404).send("The given id not found");

  res.send(course);
});

app.post("/api/courses", (req, res) => {

  const { error } = validateCourse(req.body);
  if (error)
    return res.status(400).send(error);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {

  // Return 404 if id is invalid
  const course = courses.find((c) => {
    return c.id === parseInt(req.params.id)
  })
  if (!course)
    return res.status(404).send("The given id not found");

  const { error } = validateCourse(req.body);
  if (error)
    return res.status(400).send(error);

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  // Return 404 if id is invalid
  const course = courses.find((c) => {
    return c.id === parseInt(req.params.id)
  })
  if (!course)
    return res.status(404).send("The given id not found");

  // Deleting
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening in port " + port));