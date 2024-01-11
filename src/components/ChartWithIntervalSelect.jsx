import { Bar } from 'react-chartjs-2'

const ChartWithIntervalSelect = ({ options, data, selectedInterval, setSelectedInterval }) => {
   return (
      <div className="relative border border-white shadow-lg rounded-xl xl:py-10 xl:px-16 lg:py-8 lg:px-12 sm:py-8 sm:px-10 p-5 sm:m-5 my-5 xl:m-10 bg-white">
         <div className="inline-flex absolute right-4 top-4">
            <svg
               className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 412 232"
            >
               <path
                  d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                  fill="#fff"
                  fillRule="nonzero"
               />
            </svg>
            <select
               id="interval"
               name="interval"
               value={selectedInterval}
               onChange={(event) => {
                  setSelectedInterval(event.target.value)
               }}
               className="border-2 border-white text-sm rounded-lg py-2 pl-3 pr-7 bg-gray-700 cursor-pointer text-white focus:outline-none appearance-none"
            >
               <option value="daily">Daily</option>
               <option value="weekly">Weekly</option>
               <option value="monthly">Monthly</option>
            </select>
         </div>
         <Bar
            options={options}
            data={data}
            width={500}
            height={300}
         />
      </div>
   )
}

export default ChartWithIntervalSelect
