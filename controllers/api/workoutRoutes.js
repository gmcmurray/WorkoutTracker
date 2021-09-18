const router = require('express').Router();
const db = require('../../models')

router.get("/", async (req, res) => {
  try {
    let doc = await db.Workout.find({}).sort({ "day": "ascending" });
    res.json(doc);
  }
  catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    let doc = await db.Workout.create(req.body);
    res.json(doc);
  }
  catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
});

router.get("/range", async (req, res) => {
  try {
    let doc = await db.Workout.find({}).sort({ "day": "descending" });
    // let doc = await db.Workout.find({}).sort({ "day": "descending" });
    let seven = [];
    console.log('doc length',doc.length)
    let sup = Math.min(7,doc.length)
    for (let index = 0; index < sup; index++) {
      seven.push(doc[index])
    }
    res.send(doc);
  }
  catch (err) {
    res.status(500).json(err)
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

router.put("/:id", async (req, res) => {
  try {
    let body = req.body;
    let id = req.params.id;
    const doc = await db.Workout.findOneAndUpdate({ _id: id }, { $push: { excersises: body } }, { new: true });
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

// router.get("/range", async (req, res) => {
//   console.log("range route")
//   try {
//     let doc = await db.Workout.find({}).sort({ "day": -1 });
//     // let doc = await db.Workout.find({}).sort({ "day": "descending" });
//     let seven = [];
//     console.log('doc length',doc.length)
//     let sup = Math.min(7,doc.length)
//     for (let index = 0; index < sup; index++) {
//       seven.push(doc[index])
//     }
//     res.send(doc);
//   }
//   catch (err) {
//     res.status(500).json(err)
//   }
// });

module.exports = router