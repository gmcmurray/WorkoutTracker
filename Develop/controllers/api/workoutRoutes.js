const router = require('express').Router();
const { workoutModel } = require('../../models');
const mongoose = require("mongoose");


router.post("/workouts", ({ body }, res) => {
  // matches createWorkout in api.js
    db.Workout.create(body)
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


router.put("/workouts/:id", ({ body }, res) => {
    const {id: _id} = req.params ;// Assigning id to _id which is a es6 feature. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const body = {body};
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

  router.delete('/board/:id', (req, res) => {
    const {id: _id} = req.params // Assigning id to _id which is a es6 feature. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
     
  
    const newBoard = {
      _id,
      position
    }
  
    Board.findByIdAndUpdate(
      _id,
      newBoard,
      (err, updatedBoard) => {
        if (err) {
          res.json({
            newBoard,
            success: false,
            msg: 'Failed to update board'
          })
        } else {
          res.json({newBoard, success: true, msg: 'Board added'})
        }
      }
    )
  })

  module.exports = router