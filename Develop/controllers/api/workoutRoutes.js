const router = require('express').Router();
const db = require('../../models')

  // matches createWorkout in api.js
router.post("/", async (req, res) => {
  try{
  let doc = await  db.Workout.create(req.body);
      res.json(doc);
  }
  catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
    });
 

router.put("/:id", async (req, res) => {
  // matches createWorkout in api.js
  try{
    let body = req.body;
    let id = req.params.id;
    const doc =  await db.Workout.findOneAndUpdate({_id : id}, { $push: { excersises: body } }, { new: true });
    res.json(doc);
  }
  catch(err){
    res.json(err);

  }  
    });
 

router.get("/range", (req,res)=>{
    db.Workout.find({})
    .then(wkout => {
        res.json(wkout)
    })
    .catch(err => {
        res.json(err)
    });
})

router.get("/workouts/:id", (req,res)=>{
  let id = req.params.id;
  db.Workout.find({_id:id})
  .then(wkout => {
      res.json(wkout)
  })
  .catch(err => {
      res.status(405).json(err)
  });
})


router.get("/workouts/range", async (req,res)=>{
  try{
    let doc = await db.Workout.find({}).sort({'day': 'desc'});
    console.log(doc)
    res.json(doc)

  }
  catch(err){
    res.status(500).json(err)
  }
   
  });
 



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