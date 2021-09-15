const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./controllers");
const apiroutes = require('./controllers/api');
const PORT = process.env.PORT || 3000;
const app = express();
const db = require('./models')

app.use(logger("dev"));
// app.use(routes);
// app.use(apiroutes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
 });

app.get("/api/workouts/range", async (req, res) => {
  try {
    let doc = await db.Workout.find({}).sort({ "day": "descending" });
    let seven = [];
    for (let index = 0; index < 7; index++) {
      seven.push(doc[index])
    }
    res.json(seven);
  }
  catch (err) {
    res.status(500).json(err)
  }
});

app.get("/api/workouts", async (req, res) => {
  try{
  let doc = await  db.Workout.find({});
      res.json(doc);
  }
  catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
    });
 
 //create new workout
app.post("/api/workouts", async (req, res) => {
  try{
  let doc = await  db.Workout.create(req.body);
      res.json(doc);
  }
  catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
    });
 
// Add new excersize to workout
app.put("/api/workouts/:id", async (req, res) => {
  try{
    let body = req.body;
    let id = req.params.id;
    const doc =  await db.Workout.findOneAndUpdate({_id : id}, { $push: { exercises: body } }, { new: true });
    res.json(doc);
  }
  catch(err){
    res.json(err);

  }  
    });
 

app.get("/api/workouts/:id", async (req,res)=>{
  try{
  let id = req.params.id;
  let wkout = await db.Workout.find({_id:id})

      res.json(wkout)
  }
  catch(err){
    res.status(405).json(err)
  }
      
  });
 


// app.put("/api/workouts/:id", (req, res) => {
//     const {id: _id} = req.params ;
//     const body = req.body;
//     db.Workout.findOneAndUpdate(body)
//       .then(({ _id }) => db.Workout.findOneAndUpdate({}, 
//           { $push: { notes: _id } }, { new: true }))
//       .then(dbUser => {
//         res.json(dbUser);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   });


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
