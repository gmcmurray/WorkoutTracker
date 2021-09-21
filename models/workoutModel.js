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
            type: {type:String, required:true, trim:true},
            name: {type:String, required:true,trim:true},
            duration: {type:Number, required:true,trim:true},
            // Optional fields
            weight:{type:Number, required:false,trim:true},
            reps:{type:Number, required:false,trim:true},
            sets: {type:Number, required:false,trim:true},
            distance: {type:Number, required:false,trim:true},
        }
    ]

},opts);

WorkOutSchema.virtual('totalDuration').get(function() {
    let totald = this.exercises.map(dev => (dev.duration) ? parseInt(dev.duration,10) : 0).reduce(function(accumulator,currentValue){
        return accumulator + currentValue;},0) ;
    return totald
    
  });

const Workout = mongoose.model("Workout", WorkOutSchema);

module.exports = Workout;
