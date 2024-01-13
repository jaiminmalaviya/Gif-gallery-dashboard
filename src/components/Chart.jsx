import { Bar } from 'react-chartjs-2'

const Chart = ({ options, data, colSpan }) => {
   const columnSpanClass = colSpan === 2 ? 'col-span-2' : 'lg:col-start-2 col-span-2'

   return (
      <div
         className={`relative border border-white shadow-lg rounded-xl ${columnSpanClass} xl:p-10 lg:p-8 sm:p-8 py-5 px-2 bg-white`}
      >
         <Bar
            options={options}
            data={data}
            width={500}
            height={300}
         />
      </div>
   )
}

export default Chart
