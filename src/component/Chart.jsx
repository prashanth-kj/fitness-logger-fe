import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import AxiosService from '../common/Apiservice';

ChartJS.register(ArcElement, Tooltip, Legend);

const initialData = {
    labels: [],
    datasets: [
      {
        label: 'calorie burning rate',
        data: [],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
        ],
        hoverOffset: 4,
      },
    ],
};

  const options = {

    maintainAspectRatio: false,
    responsive: true,
    
   };



function Chart() {

  const [cardioData, setCardioData] = useState(initialData);
  const [resistanceData,setResistanceData]=useState(initialData);
  
    const getCardioData = async () => {
      try {
        const res = await AxiosService.get('/exercise/cardio');
        
        const cardiosData = res.data.cardio;
            
          let  cumulativeCalories= {};

            cardiosData.forEach(cardioData=> {

                let {name,caloriesBurned}=cardioData;
                if(cumulativeCalories[name]){
                
                    cumulativeCalories[name] += caloriesBurned
                }else{
                    cumulativeCalories[name]=caloriesBurned
                }
              
            });
            
          
        const updatedData = {
          labels:  Object.keys(cumulativeCalories),
          datasets: [
            {
              label: 'calorie burning rate',
              data: Object.values(cumulativeCalories),
              backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(120, 34, 25)',
              ],
              hoverOffset: 4,
            },
          ],
        };

        setCardioData(updatedData);
      } catch (error) {
        console.log(error);
      }
    };
  
    const getResistanceData=async()=>{
      try {
          const res = await AxiosService.get('/exercise/resistance');
        
          const resistancesData = res.data.resistance;
              
            let  cumulativeCalories= {};
    
            resistancesData.forEach(resistanceData=> {
    
                  let {name,caloriesBurned}=resistanceData;
                  if(cumulativeCalories[name]){
                  
                      cumulativeCalories[name] += caloriesBurned
                  }else{
                      cumulativeCalories[name]=caloriesBurned
                  }
                
              });
              
            
    
          const updatedData = {
            labels:  Object.keys(cumulativeCalories),
            datasets: [
              {
                label: 'calorie burning rate',
                data: Object.values(cumulativeCalories),
                backgroundColor: [
                  'rgb(200, 50, 150)',
                  'rgb(100, 200, 50)',
                  'rgb(150, 100, 50)',
                  'rgb(50, 150, 200)',
                  'rgb(25, 120, 34)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)'
                  
                ],
                hoverOffset: 4,
              },
            ],
          };
    
          setResistanceData(updatedData);
      } catch (error) {
          console.log(error);
      }
    }


  useEffect(() => {
    getCardioData();
    getResistanceData();
  }, []);



  return (
    <>
        <h1 className='text-center'>Fitness Overview Chart</h1>
          <hr />

        <div className='d-flex justify-content-center align-item-center flex-wrap'> 
          
            <div style={{ width: '400px', height: '400px', float: 'left', margin:"30px"}}>
                <Doughnut data={cardioData} options={options} /> 
                <h2 className='text-center p-3'>Cardio</h2>        
            </div>

            <div style={{ width: '400px', height: '400px', float: 'left' ,margin:"30px"}}>
              <Doughnut data={resistanceData} options={options} />    
              <h2 className='text-center p-3'>Resistance</h2>
            </div>
     
         </div>

    </>

        
        
 
  );
}

export default Chart;





