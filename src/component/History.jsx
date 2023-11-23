import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import AxiosService from '../common/Apiservice';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import dumbell from '../assets/dumbbell-solid.svg';
import personrunning from '../assets/person-running-solid.svg'

const History = () => {

  const [combinedHistory, setCombinedHistory] = useState([]);
  const [loading,setLoading]=useState(false);
  const [searchTerm, setSearchTerm] = useState('');
   

  const filteredHistory = combinedHistory.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let navigate=useNavigate();

  const getCombinedHistory = async () => {
    try {
       setLoading(true);

      const cardioRes = await AxiosService.get('/exercise/cardio');
      const resistanceRes = await AxiosService.get('/exercise/resistance');

      const combined = [...cardioRes.data.cardio, ...resistanceRes.data.resistance];
      combined.sort((a, b) => new Date(b.date) - new Date(a.date));

      setCombinedHistory(combined);
       
    } catch (error) {
        
      toast.error(error.response.data.message || "Error Occured")
      navigate('/login')
        
    }finally{
        setLoading(false);
    }
  };


  useEffect(() => {
    getCombinedHistory();
  }, []);

  return (
      <div className='container'>
            <div className='text-center'>
                  <h1>History</h1> 
                  <hr />
            </div>
         <div>
           <input type="text" placeholder="Search exercises Name..."  className='form-control mb-5 '  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
           
         </div>
       <div className="container-fluid text-center" >
        {
          loading ? (
            <Spinner animation="border" role="status" variant='warning' >
            <span className="visually-hidden ">Loading...</span>
            </Spinner>
          ):(<Table striped bordered hover responsive >
            <thead >
              <tr>
                <th className='col'>Date</th>
                <th className='col'>Icon</th>
                <th className='col'>Exercise Type</th>
                <th className='col'>Name</th>
                <th className='col'>Calories Burned (kcal)</th>
                <th className='col'>Details</th>
              </tr>
            </thead>
            <tbody >
            {filteredHistory.map((exercise) => (
               <tr key={exercise._id}>
               <td>{new Date(exercise.date).toLocaleDateString()}</td>
               <td>
                 {exercise.type === 'cardio' ? (
                   <img src={personrunning} alt="personrunning" width="24px" height="24px"/>
                 ) : (
                   <img src={dumbell} alt="dumbell"  width="24px" height="24px"/>
                 )}
               </td>

               <td>{exercise.type === 'cardio' ? 'Cardio' : 'Resistance'}</td> 
               <td>{exercise.name}</td>
               <td>{exercise.caloriesBurned}</td>
               <td>
                 <Button variant="secondary" onClick={()=>navigate(`/exercise/${exercise.type}/${exercise._id}`)}>View</Button>
               </td>
             </tr>
             ))}
            </tbody>
          </Table>
          
          
          ) }
          
          </div>
      </div>
  );
};

export default History;