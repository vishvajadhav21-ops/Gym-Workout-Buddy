const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');
// get all workouts
exports.getAllWorkouts = async (req, res)=>{
    
    try {
        const user_id = req.user._id
        const workouts = await Workout.find({user_id}).sort({createdAt : -1});

        if(!workouts){
            return res.status(404).json({error : "No workouts found"});
        }

        res.status(200).json(workouts);

    } catch (error) {
        console.log(error);
        
    }
}

// get a single workout

exports.getWorkout = async (req, res) =>{
    try {
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error : "No such workout found"});
        }

        const workout = await Workout.findById(id);

        if(!workout){
            return res.status(404).json({error : "No such workout found"});
        }

        res.status(200).json(workout);

    } catch (error) {
        console.log(error);
        
    }
}

// create a new workout

exports.createWorkout = async (req, res) =>{
    try {

      
        const {title , load ,reps} = req.body;

const emptyFields = [];

        if(!title){
            emptyFields.push('title');
        }
        if(!load){
            emptyFields.push('load');
        }
        if(!reps){
            emptyFields.push('reps');
        }

        if(emptyFields.length > 0){
            return res.status(400).json({error : "Please fill in all fields", emptyFields});
        }
  const user_id = req.user._id
        const workout = await Workout.create({title , load ,reps , user_id });

        res.status(200).json(workout);

    } catch (error) {
       res.status(400).json({error : error.message});
    }
}

// delete a workout

exports.deleteWorkout = async (req, res) =>{
    try {
        
 const {id} = req.params;
 if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error : "No such workout found"});
 }

 const workout = await Workout.findOneAndDelete({_id : id});

 if(!workout){
    return res.status(404).json({error : "No such workout found"});
 }

 res.status(200).json(workout);

    } catch (error) {
        console.log(error);
        
    }
}

// update a workout
exports.updateWorkout = async (req , res) =>{
    try{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "not such a workout"})
    }

    const workout = await Workout.findOneAndUpdate(
        {_id : id} ,
        {...req.body},
        {new : true}
    )

    if(!workout){
        return res.status(400).json({
            error : "not found"
        })
    }

    res.status(200).json(workout);
}catch(error){
   console.log(error);
   
}
}