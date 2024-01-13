import { useEffect, useState } from 'react'
import Chart from './Chart'

export const options = {
   responsive: true,
   plugins: {
      legend: {
         display: false,
         position: 'bottom',
      },
      title: {
         display: true,
         font: {
            size: '16px',
         },
         padding: {
            bottom: 14,
         },
         text: 'Number of Active Users',
      },
      datalabels: {
         color: 'white',
         font: {
            weight: 'bold',
         },
      },
   },
}

const LoginChart = ({ startDate, endDate, selectedInterval }) => {
   const [fetchData, setFetchData] = useState([])

   useEffect(() => {
      ;(async () => {
         try {
            const response = await fetch(`/api/login-count/${selectedInterval}`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  startDate,
                  endDate,
               }),
            })

            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()

            setFetchData(data)
         } catch (error) {
            console.error('Error fetching data:', error)
         }
      })()
   }, [selectedInterval, startDate, endDate])

   const labels = fetchData.map(
      (item) =>
         `${
            item.week + 1
               ? item.week +
                 1 +
                 (item.week === 0 ? 'st' : item.week === 1 ? 'nd' : item.week === 2 ? 'rd' : 'th') +
                 ' week of ' +
                 item.year
               : item.day
               ? item.day + '/' + item.month + '/' + item.year
               : item.month + '/' + item.year
         }`
   )

   const data = {
      labels,
      datasets: [
         {
            label: 'Active Users',
            data: fetchData.map((item) => item.activeUsers),
            backgroundColor: 'rgba(53, 162, 235)',
         },
      ],
   }

   return (
      <Chart
         options={options}
         data={data}
         colSpan={2}
      />
   )
}

export default LoginChart
