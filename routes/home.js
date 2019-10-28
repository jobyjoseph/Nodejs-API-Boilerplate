const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "First page",
    message: "Very big hello world"
  })
});

module.exports = router;