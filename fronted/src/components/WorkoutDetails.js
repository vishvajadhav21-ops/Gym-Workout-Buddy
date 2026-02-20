import React from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';
// date fns
  import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({each}) => {
   
  const {user} = useAuthContext();

  const {dispatch} = useWorkoutContext();

const handleClick = async () =>{

if(!user){
  return
}

    const response = await fetch('/api/workouts/' + each._id , {
      method : 'DELETE',
       headers: {
                'Authorization' : `Bearer ${user.token}`
            }
    })
    const json = await response.json();
    
    if(response.ok){
       dispatch({type : 'DELETE_WORKOUT' , payload : json})
    }
}

  return (
    <div className='workout-details'>
      <h4>{each.title}</h4>
      <p><strong>Load  (in kgs) :</strong> {each.load}</p>
      <p><strong>Reps :</strong> {each.reps}</p>
      <p>{formatDistanceToNow(new Date(each.createdAt) , { addSuffix: true })}</p>
      <span  className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
    
  )
}


export default WorkoutDetails
