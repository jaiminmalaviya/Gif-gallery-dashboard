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
         text: 'Top Trending Keywords',
      },
      datalabels: {
         display: true,
         color: 'white',
         font: {
            weight: 'bold',
         },
         formatter: (value, context) => context.dataset.customLabels[context.dataIndex] || '',
      },
   },
   scales: {
      x: {
         stacked: true,
      },
      y: {
         stacked: true,
      },
   },
}

const KeywordChart = ({ startDate, endDate, selectedInterval }) => {
   const [fetchData, setFetchData] = useState([])

   useEffect(() => {
      ;(async () => {
         try {
            const response = await fetch(`/api/top-keywords/${selectedInterval}`, {
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

   const colorPalette = [
      'rgb(204,39,56, 0.9)',
      'rgb(0,168,198, 0.9)',
      'rgb(153,102,255, 0.9)',
      'rgb(247,120,37, 0.9)',
      'rgb(255,55,132, 0.9)',
   ]

   const keywordDatasets = Array.from({ length: 5 }, (_, index) => ({
      label: `Keyword ${index + 1}`,
      data: fetchData.map((item) => item?.keywords[4 - index]?.count),
      customLabels: fetchData?.map((item) => item?.keywords[4 - index]?.keyword),
      backgroundColor: colorPalette[index % colorPalette.length],
   }))

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
      datasets: keywordDatasets,
   }

   return (
      <Chart
         options={options}
         data={data}
         colSpan={4}
      />
   )
}

export default KeywordChart
