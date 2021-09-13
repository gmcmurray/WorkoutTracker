const mongoose = require("mongoose");
const opts = { toJSON:{virtual: true}};
const Schema = mongoose.Schema;

const WorkOutSchema = new Schema({
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

// Virtual totalDuration - loop over all excersizes to tally all hours
// search for to JSON

const Workout = mongoose.model("Workout", WorkOutSchema);

module.exports = Workout;
