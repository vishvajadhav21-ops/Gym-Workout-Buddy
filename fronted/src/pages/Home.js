// import React, { useEffect, useState } from 'react'
import { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

function Home() {
  //  const[workouts , setWorkouts] = useState(null);

  const {workouts , dispatch} = useWorkoutContext();
  const {user} = useAuthContext();
   
   // fetch workouts from the backend
   useEffect( () => {
     const fetchWorkouts = async () =>{
        const response = await fetch('/api/workouts/' , {
          headers : {
             'Authorization' : `Bearer ${user.token}`
          }
        });
        const json = await response.json();

        if(response.ok){
            // setWorkouts(json);
            dispatch({type : 'SET_WORKOUTS' , payload : json})
        }
     }

     if(user){
fetchWorkouts();
     }
     
   }, [dispatch , user])

  return (
    <div className='home'>
       <div className="workouts">
          {
            workouts && workouts.map( (each) => (
                // <p key={each._id} >{each.title}</p>
                <WorkoutDetails key = {each._id} each ={each}/>
            ))
          }
       </div>
       <WorkoutForm/>
    </div>
  )
}

export default Home
