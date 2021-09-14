const mongoose = require("mongoose");
const opts = { toJSON:{virtuals: true}};
// const workSchema = mongoose.Schema;

const WorkOutSchema = mongoose.Schema({
    day: {
        type: Date,
        default: Date.now,
        required: "day is required"
    },

    exercises: [
        {
            // Required fields
            type: {type:String, required:true},
            name: {type:String, required:true},
            duration: {type:Number, required:true},
            // Optional fields
            weight:{type:Number, required:false},
            reps:{type:Number, required:false},
            sets: {type:Number, required:false},
            distance: {type:Number, required:false},
        }
    ]

});

WorkOutSchema.virtual('total').get(function() {
    function averager(array){
        if(array.length>0){
            let sumel =0;
            for (let index = 0; index < array.length; index++) {
                sumel += array[index]/array.length;
            }
            return sumel;
        }
        else return 0;
    }
    return this.exercises.map(dev=> dev.duration).reduce(averager);
  });

// Virtual totalDuration - loop over all excersizes to tally all hours
// search for to JSON

const Workout = mongoose.model("Workout", WorkOutSchema);

module.exports = Workout;