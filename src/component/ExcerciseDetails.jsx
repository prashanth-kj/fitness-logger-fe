import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AxiosService from '../common/Apiservice';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import Cycleimage from '../assets/back-view-muscular-cyclist-helmet-biking-park_247147-1349.avif'
import Weightliftimage from '../assets/fat-loss-workouts-for-this-festive-season-fb.jpg';
function ExcerciseDetails() {
    
    let {type,id}= useParams();
    let navigate =useNavigate();
    
    let [exercise,setExercise]=useState([]);

    let getExerciseDetails=async()=>{
             try {
                  
                   let res;

                   if(type=='cardio'){
                        res= await  AxiosService.get(`/exercise/cardio/${id}`);
                       
                        setExercise(res.data.cardio);
                   }
                   else{
                        res= await AxiosService.get(`/exercise/resistance/${id}`);
                      
                        setExercise(res.data.resistance);   
                   }

             } catch (error) {
                toast.error(error.response.data.message || "Error Occured")
                navigate('/login');
             }       
    }


    let handleDelete=async()=>{
          try {
              let res;
                  
                 if(type==="cardio"){
                     res=await AxiosService.delete(`/exercise/cardio/${id}`);
                     
                     if(res.status==200){
                         toast.success(res.data.message);
                         navigate('/history')
                     }
                 }else{
                       res= await AxiosService.delete(`/exercise/resistance/${id}`);
                       
                       toast.success(res.data.message);
                       navigate('/history')
                 }
                  
          } catch (error) {
               toast.error(error.response.data.message || "Error Occured")
          }
    }

    useEffect(()=>{
        if(id && type){
            getExerciseDetails(); 
        }
    
    },[])

    const backgroundImage = type === 'cardio' ? Cycleimage : Weightliftimage;
    
  return (
       <> 
              
          <div className='container-fluid'  style={{  backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover',backgroundPosition:"center", width:"100%", minHeight:"100vh"}}>
                <h1 className='text-center mt-2 text-white'>History</h1>
                <hr />
              <div className='d-flex justify-content-center m-4' style={{ height: '100%' }}>
                  <div className='container-fluid ' style={{maxWidth:"400px"}}>
                  <Card style={{ width: '18rem' ,backgroundColor:"ButtonShadow"}}>
                        <Card.Body className='text-black'>
                        <Card.Title className='text-center'>  {exercise.type}</Card.Title>
                        <Card.Text>Name: {exercise.name}</Card.Text>    
                            {type === 'cardio'? <Card.Text>Intensity: {exercise.intensityLevel}</Card.Text>:<Card.Text>Weight_Lift (kg): {exercise.weightLift}</Card.Text>}
                            {type === 'cardio'? <Card.Text>Distance: {exercise.distance}</Card.Text>:<Card.Text>Sets: {exercise.sets}</Card.Text>}
                            {type==='cardio'? <Card.Text>Duration: {exercise.duration}</Card.Text>:<Card.Text>Reps: {exercise.reps}</Card.Text>}
                            {type==='cardio'? <Card.Text>UserWeight (kg): {exercise.weight}</Card.Text> :<Card.Text>UserWeight (kg): {exercise.userweight}</Card.Text>   } 
                        <Card.Text>Calories Burned: {exercise.caloriesBurned} kcal</Card.Text>
                        <Card.Text>Date: {new Date(exercise.date).toLocaleDateString()}</Card.Text>
                    
                        <Button variant="danger" onClick={()=>handleDelete()}>Delete Exercise</Button>
                        &nbsp;
                        &nbsp;
                        <Button variant="info" onClick={()=>navigate('/history')}>Cancel</Button>
                        </Card.Body>
                    </Card>
                  </div>
              </div>
          </div>
       
       </>
  )
}

export default ExcerciseDetails