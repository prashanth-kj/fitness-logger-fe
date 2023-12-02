import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AxiosService from '../common/Apiservice';
import Spinner from 'react-bootstrap/Spinner';
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
import heartpulse from '../assets/heart-pulse-solid.svg'
function Signup() {
    let [name,setName]=useState("");
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    let [loading,setLoading]=useState(false)
     let navigate= useNavigate();
     
  let createUser=async(e)=>{
       e.preventDefault();

        try {
            setLoading(true); 

            let res= await AxiosService.post('/user/create',{
                 name,
                 email,
                 password
            })
             if(res.status==201){
                  toast.success(res.data.message);
                  navigate('/login')
             }
        } catch (error) {
            toast.error("Please fill all the details")
        }finally{
           setLoading(false)
        }
  }

  return (
      
    <div className='container' style={{ height:'100vh'}}>
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
       <div className='container-fluid' style={{maxWidth:"400px"}}>
             <div className='d-flex justify-content-center align-items-center mb-4'  style={{color:"cadetblue"}}>
                <img src={heartpulse} alt="heartpulse" width="25px" height="24px" className='mb-1 mx-2' /><h4>Fitness Logger</h4>
             </div>
       <Form>
         <Form.Group className="mb-3" >
             <Form.Label className="form-label">Name</Form.Label>
             <Form.Control type="text" className="form-control" placeholder="Enter your name"  onChange={(e)=>setName(e.target.value)} required/>
         </Form.Group>
         <Form.Group className="mb-3" >
             <Form.Label className="form-label">Email address</Form.Label>
             <Form.Control type="email" className="form-control" placeholder="name@example.com"  onChange={(e)=>setEmail(e.target.value)} required/>
         </Form.Group>
         <Form.Group className="mb-3" >
             <Form.Label className="form-label">Password</Form.Label>
             <Form.Control type="password" className="form-control" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} required/>
         </Form.Group>

         <Button className='btn  w-100 mt-3' onClick={(e)=>createUser(e)} style={{backgroundColor:"cadetblue", border:"1px solid cadetblue"}}>
            {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  <span className="visually-hidden">Loading...</span>
                </>
              ) : (
                'Submit'
              )}
         </Button>
          
         </Form>
       </div>
      </div>
    </div>
    
  )
}

export default Signup