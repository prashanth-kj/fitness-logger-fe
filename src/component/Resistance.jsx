import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AxiosService from '../common/Apiservice.jsx';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Resistance() {
       
  let [name,setName]=useState("");
  let [userweight,setUserWeight]=useState("");
  let [weightLift,setWeightLift]=useState("");
  let [sets,setSets]=useState("");
  let [reps,setReps]=useState("");
  
  let navigate= useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange =(date) => {
       setSelectedDate(date);
  };


 const createResistance=async(e)=>{
   e.preventDefault();

      try {
           let res=await AxiosService.post('/exercise/resistance' ,{
              name: name,
              userweight: userweight, 
              weightLift: weightLift, 
              sets: sets, 
              reps: reps,
              date: selectedDate
           })

           if(res.status==201){
               toast.success(res.data.message);
               navigate('/dashboard')
           }
      } catch (error) {
           console.log(error);
           toast.error(error.response.data.message || "Error Occured")
      }
 }


  return (
    <div className='container-fluid  resistancecard' style={{ minHeight: '110vh'}}>
        <h1 className='text-center text-info'>Add Exercise</h1> 
        <hr />
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100%'}}>
    <div className='container-fluid p-4 shadow '  style={{maxWidth:"400px", backgroundColor:"transparent"}}>
        <Form >
            <Form.Group className="mb-3 " >   
                <Form.Label className="form-label text-info ">Resistance Name</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e)=>setName(e.target.value)} >
                  <option value="">select Resistance name</option>
                  <option value="WeightLifting">Weightlifting</option>
                  <option value="push-ups">push-ups</option>
                  <option value="pull-ups">pull-ups</option>
                  <option value="squats">squats</option>
                  <option value="bicep_curls">bicep_curls</option>
                  <option value="leg_press">leg_press</option>
                  <option value="shoulder_press">shoulder_press</option>
                 
                </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3" >
                <Form.Label className="form-label text-info">UserWeight (kg)</Form.Label>
                <Form.Control type="number" className="form-control" placeholder="0"  min="0" onChange={(e)=>setUserWeight(Number(e.target.value))}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="form-label text-info">WeightLift (kg)</Form.Label>
                <Form.Control type="number" className="form-control" placeholder="0"  min="0"  onChange={(e)=>setWeightLift(Number(e.target.value))}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="form-label text-info">Sets</Form.Label>
                <Form.Control type="number" className="form-control"  placeholder="0" min="0" onChange={(e)=>setSets(Number(e.target.value))}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="form-label text-info">Reps</Form.Label>
                <Form.Control type="number" className="form-control" placeholder="0" min="0"  onChange={(e)=>setReps(Number(e.target.value))}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label d-block text-info" >Date</Form.Label>
              <DatePicker
                 className="form-control"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                
              />
            </Form.Group>
            
            <Button className='btn btn-info text-white w-100 mt-3' onClick={(e)=>createResistance(e)} >
                Add Resistance
            </Button>

        </Form>
    </div>
    </div>
</div>
  )
}

export default Resistance