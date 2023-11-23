import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AxiosService from '../common/Apiservice.jsx';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Cardio() {
     
    let [name,setName]=useState("");
    let [intensityLevel,setIntensityLevel]=useState("");
    let [weight,setWeight]=useState("");
    let [distance,setDistance]=useState("");
    let [duration,setDuration]=useState("");
    
    let navigate= useNavigate();

    const [selectedDate, setSelectedDate] = useState(null);
  
    const handleDateChange =(date) => {
         setSelectedDate(date);
    };
 
  
   const createCardio=async(e)=>{
     e.preventDefault();

        try {
             let res=await AxiosService.post('/exercise/cardio' ,{
                name:name,
                intensityLevel:intensityLevel,
                weight: weight, 
                distance:distance, 
                duration: duration, 
                date:selectedDate
             })

             if(res.status==201){
                 toast.success(res.data.message);
                 navigate('/dashboard')
             }
        } catch (error) {
             
             toast.error(error.response.data.message || "Error Occured")
        }
   }


  return (
    <div className='container-fluid  cardiocard' style={{ minHeight: '100vh'}}>
          <h1 className='text-center '>Add Exercise</h1> 
          <hr />
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
      
    <div className='container-fluid p-4 shadow '  style={{maxWidth:"400px",backgroundColor:"transparent"}}>
        
        <Form >
            <Form.Group className="mb-3 " >   
                <Form.Label className="form-label ">Cardio Name</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e)=>setName(e.target.value)} >
                  <option value="">select cardio name</option>
                  <option value="Walking">Walking</option>
                  <option value="Running">Running</option>
                  <option value="Cycling">Cycling</option>
                  <option value="Swimming">Swimming</option>
                  <option value="Jumping_jacks">Jumping_jacks</option>
                  
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 mt-3" >
                <Form.Label className="form-label">Intensity Level</Form.Label>
                <Form.Select aria-label="Default select example"  onChange={(e)=>setIntensityLevel(e.target.value)}>
                  <option value="">select Intensity Level</option>
                  <option value="slow">slow</option>
                  <option value="moderate">moderate</option>
                  <option value="fast">fast</option>
                 
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label className="form-label">Weight (kg)</Form.Label>
                <Form.Control type="number" className="form-control" placeholder="0" min="0"  onChange={(e)=>setWeight(Number(e.target.value))}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="form-label">Distance (km)</Form.Label>
                <Form.Control type="number" className="form-control" placeholder="0" min="0"  onChange={(e)=>setDistance(Number(e.target.value))}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="form-label">Duration (minutes)</Form.Label>
                <Form.Control type="number" className="form-control" placeholder="0" min="0" onChange={(e)=>setDuration(Number(e.target.value))}/>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label className="form-label d-block">Date</Form.Label>
              <DatePicker
                 className="form-control"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
              />
            </Form.Group>
            
            <Button className='btn btn-secondary w-100 mt-3' onClick={(e)=>createCardio(e)} >
                Add Cardio
            </Button>

        </Form>
    </div>
    </div>
</div>
  )
}

export default Cardio
