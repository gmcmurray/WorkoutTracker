const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

app.get("/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbNote => {
      res.json(dbNote);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;