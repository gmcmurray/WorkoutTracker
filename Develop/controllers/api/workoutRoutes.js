const router = require('express').Router();
// const mongoose = require("mongoose");
const db = require('../../models')

router.post("/workouts", (req, res) => {
  // matches createWorkout in api.js
    db.Workout.create(req.body)
    .then(({ _id }) => db.Workout.findOneAndUpdate({}))
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/workouts", (req,res)=>{
    db.Workout.find({})
    .then(wkout => {
        res.json(wkout)
    })
    .catch(err => {
        res.json(err)
    });
})

router.get("/workouts/range", (req,res)=>{
  db.Workout.find({})
  .then(wkout => {
      res.json(wkout)
  })
  .catch(err => {
      res.json(err)
  });
})

router.put("/workouts/:id", (req, res) => {
    const {id: _id} = req.params ;
    const body = req.body;
    db.Workout.findOneAndUpdate(body)
      .then(({ _id }) => db.Workout.findOneAndUpdate({}, 
          { $push: { notes: _id } }, { new: true }))
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });


  module.exports = router