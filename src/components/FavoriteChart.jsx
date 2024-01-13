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
         text: 'Number of Favorites',
      },
      datalabels: {
         color: 'white',
         font: {
            weight: 'bold',
         },
      },
   },
}

const FavoriteChart = ({ startDate, endDate, selectedInterval }) => {
   const [fetchData, setFetchData] = useState([])

   useEffect(() => {
      ;(async () => {
         try {
            const response = await fetch(`/api/favorites-count/${selectedInterval}`, {
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
            label: 'Favorites',
            data: fetchData.map((item) => item.favorites),
            backgroundColor: 'rgba(255, 99, 132)',
            customLabel: fetchData.map((item) => item.favorites),
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

export default FavoriteChart
