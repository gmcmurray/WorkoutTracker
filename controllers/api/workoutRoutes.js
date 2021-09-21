const router = require('express').Router();
const db = require('../../models');
const express = require("express");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    let doc = await db.Workout.find({}).sort({ "day": 1 });
    res.json(doc);
  }
  catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
});

// create a workout
router.post("/", async (req, res) => {
  console.log(req.body)
  try {
    let doc = await db.Workout.create({});
    console.log(doc)
    let doc1 = await db.Workout.findOneAndUpdate({_id:doc._id},
      { $push: { exercises: req.body } }, 
      { new: true });  
    res.json(doc);
  }
  catch (err) {
    res.status(500).json(err);
  }
});
 
router.get("/range", async (req, res) => {
  try {
    let doc = await db.Workout.find({}).sort({ "day": -1}).limit(7);
    res.send(doc);
  }
  catch (err) {
    res.status(500).json({error:err})
      
  }
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  db.Workout.find({ _id: id })
    .then(wkout => {
      res.json(wkout)
    })
    .catch(err => {
      res.status(405).json(err)
    });
});

// Add excersize
router.put("/:id", async (req, res) => {
  try {
    let body = req.body;
    let id = req.params.id;
    const doc = await db.Workout.findOneAndUpdate(
      { _id: id }, 
      { $push: { exercises: body } }, 
      { new: true });
    res.json(doc);
  }
  catch (err) {
    res.json(err);

  }
});

router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let wkout = await db.Workout.deleteOne({ _id: id })

    res.json(wkout)
  }
  catch (err) {
    res.status(405).json(err)
  }
});

module.exports = router