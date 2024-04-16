import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Admin = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      console.log('Fetching statistics...');   
      try {
        const token = localStorage.getItem('token');  
        const response = await axios.get('http://127.0.0.1:8000/api/statistics', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
  
    fetchStatistics();
  }, []); // Prazan niz zavisnosti kako bi se efekat izvršio samo jednom
  
  
  return (
    <div style={{ height: '400px' }}>  // Postavljena je fiksna visina za div
      <h2>Statistics</h2>
      {statistics && statistics.length > 0 ? (
        <Bar
          data={{
            labels: statistics.map(property => property.title),
            datasets: [{
              label: 'Number of Rentals',
              data: statistics.map(property => property.reservations_count),
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1
            }]
          }}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              x: {
                type: 'category',
                ticks: {
                  beginAtZero: true
                }
              },
              y: {
                type: 'linear',
                beginAtZero: true
              }
            }
          }}
          height={400}  // Eksplicitno definisana visina za grafikon
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Admin;
