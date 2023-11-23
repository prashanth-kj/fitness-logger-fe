import React from 'react'
import { useNavigate } from 'react-router-dom';
import fitnessImage from '../assets/man-running-morning-park_296728-45.avif'
import heartpulse from '../assets/heart-pulse-solid.svg'


function Dashboard() {

  let navigate=useNavigate();

  return (
  <>
      <div className="dashboard-container">
          <div className="dashboard-container">
            <img src={fitnessImage} alt="Fitness Image" className="dashboard-image" />
          </div>
         
      </div>
       <div className="dashboard-text">
          <h1 className='m-2'>Welcome to Your Fitness Dashboard</h1>
          <p className='dashboard-p1 m-2'>Track your cardio and resistance exercises to  stay fit and healthy.</p>
          <div className="dashboard-buttons">
            <button className="btn  w-50 p-2 m-2" onClick={() => navigate('/exercise')} style={{backgroundColor:"yellow", color:"black"}}>
                  <h4 ><img src={heartpulse} alt="heart pulse" width="24px" /> Get Active</h4>
            </button>
           
          </div>
        </div>
  </>
    
  )
}

export default Dashboard
