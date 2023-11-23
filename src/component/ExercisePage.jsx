import React from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import personrunning from '../assets/person-running-solid.svg';
import dumbell from '../assets/dumbbell-solid.svg';

function ExercisePage() {
  let navigate = useNavigate();

  return (
    <>
       
      <div className='container  d-flex  flex-column   justify-content-center align-items-center flex-wrap gap-5 mt-3'>
          <div >
            <h1>Add Exercise</h1>
            <hr />
          </div>

          <div className='d-flex justify-content-center align-items-center flex-wrap gap-5 '>
          
              <div>
                  <Card
                  className='shadow rounded-4 mb-3'
                  onClick={() => navigate('/cardio')}
                  style={{ width: '11rem', height: '10rem', backgroundColor: 'dodgerblue', cursor: 'pointer' }}
                  >
                      <Card.Body className='text-center mt-4'>
                        <Card.Title >
                          <img src={personrunning} alt='person running' width='37px'/>
                        </Card.Title>
                        <Card.Text className='h3'>Cardio</Card.Text>
                      </Card.Body>

                  </Card> 
              </div>

              <div>
                  <Card
                  className='shadow rounded-4 mb-3'
                  onClick={() => navigate('/resistance')}
                  style={{ width: '11rem', height: '10rem', backgroundColor: 'orange', cursor: 'pointer' }}
                  >
                      <Card.Body className='text-center mt-4'>
                        <Card.Title>
                          <img src={dumbell} alt='dumbbell icon' width='50px' />
                        </Card.Title>
                        <Card.Text className='h3'>Resistance</Card.Text>
                      </Card.Body>
                  </Card>
              </div>

          </div>
    
      </div>
    
    
    </>
  );
}

export default ExercisePage;
