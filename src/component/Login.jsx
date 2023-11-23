import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import AxiosService from '../common/Apiservice';
import Spinner from 'react-bootstrap/Spinner';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import heartpulse from '../assets/heart-pulse-solid.svg'


function Login() {
         
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    let [loading,setLoading]=useState(false)
    let navigate=useNavigate()

    let validateLogin=async(e)=>{
          e.preventDefault();

            try {
                 setLoading(true);

                  let res= await AxiosService.post('/user/login',{
                    email,
                    password
                  })
                  console.log(res);
                  if(res.status==201){
                       toast.success(res.data.message);
                       sessionStorage.setItem("token",res.data.token)
                       sessionStorage.setItem('user',JSON.stringify(res.data.user))
                       navigate('/dashboard')
                  }
                  
            } catch (error) {
                toast.error(error.response.data.message || "Error Occured")
                
            }finally{
              setLoading(false)
            }
    }

  return (
    <>
       <div className='container' style={{ height:'100vh'}}>
             
       <div className='d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
              
          <div className='container-fluid' style={{maxWidth:"400px"}}>
             <div className='d-flex justify-content-center align-items-center mb-4'  style={{color:"cadetblue"}}>
                <img src={heartpulse} alt="heartpulse" width="25px" height="24px" className='mb-1 mx-2' /><h4>Fitness Logger</h4>
             </div>
          <Form>
            <Form.Group className="mb-3" >
                <Form.Label className="form-label">Email address</Form.Label>
                <Form.Control type="email" className="form-control" placeholder="name@example.com"  onChange={(e)=>setEmail(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control type="password" className="form-control" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} required/>
            </Form.Group>
            <Button className="btn  w-100 mt-3" onClick={(e) => validateLogin(e)} style={{backgroundColor:"cadetblue", border:"1px solid cadetblue"}}>
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  <span className="visually-hidden">Loading...</span>
                </>
              ) : (
                'Login'
              )}
            </Button>
             
            <Form.Group className='text-center mt-4'>
                  <Form.Label ><Link to={'/forget-password'} style={{textDecoration:"none" ,color:"cadetblue"}} >Forget Password?</Link></Form.Label>
             </Form.Group>
            <Form.Group className='text-center mt-3'>
              <Form.Label >Don't have an account <Link to={'/signup'} style={{textDecoration:"none",color:"cadetblue"}}>signup?</Link></Form.Label> 
            </Form.Group>

            </Form>
          </div>
         </div>
       </div>
    </>
  )
}

export default Login