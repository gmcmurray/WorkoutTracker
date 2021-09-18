const router = require('express').Router();
const db = require('../../../models')

 
router.get("/", async (req, res) => {
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

  module.exports = router;
  
