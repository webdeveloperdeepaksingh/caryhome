"use client";
import { BASE_API_URL } from '../../../utils/constant';
import Loading from './Loading';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement} from 'chart.js';

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    LineElement, 
    PointElement    
 );

const WeeklySalesChart : React.FC = () => {

    const [revenue, setRevenue] = useState<number[]>([]);
    const [revenueLabel, setRevenueLabel] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(()=>{
    async function fetchRevenue(){
    try 
        {
            const res = await fetch(`${BASE_API_URL}/api/weekly-sales`, {cache: "no-store"});
            if(!res.ok){
                throw new Error("Error fetching revenue.");
            }
            const revenueData = await res.json();
            
            const options: Intl.DateTimeFormatOptions = { weekday: 'short' }; 

            const revenueValue: Record<string, number> = {}; // Initialize an empty object

            revenueData.orderList.forEach((item: any) => {                
                const week = new Intl.DateTimeFormat('en-US', options).format(new Date(item.createdAt));
                const weeklyRevenue = item.usrProducts.reduce((acc: number, product: any) => acc + product.prodTotalPrice, 0);
                revenueValue[week] = (revenueValue[week] || 0) + weeklyRevenue;                
            });

            let value:number[]=[];
            let labels:string[]=[];

            for (const [week, weeklyRevenue] of Object.entries(revenueValue)) {
                labels.push(week);
                value.push(weeklyRevenue);
                //console.log(`Week: ${week}, Revenue: ${weeklyRevenue}`);
                // You can perform additional processing or output as needed
            }
            setRevenue(value);
            setRevenueLabel(labels);

            console.log(labels);
            console.log(value);
        } catch (error) {
            console.error("Error fetching revenue: ", error);
        } finally{
            setIsLoading(false);
        }
    }
    fetchRevenue();
    },[])
    
    const data = {
        labels: revenueLabel,        
        datasets: [
          {
            label: 'Weekly Sales',
            data: revenue,
            backgroundColor: 'indigo',
            borderColor: 'blue', 
            pointBorderColor:'aqua',
            fill: false,
          },
        ],
      };
      
    const options = {
    responsive: true,
    maintainAspectRatio: false,    
    };  
      
    if(isLoading){
        <div>
            <Loading/>
        </div>
    }

    return ( 
        <div>
           <div className='flex w-full'>
              <Line data={data} options={options} />
           </div>
        </div>
     );
}
 
export default WeeklySalesChart;