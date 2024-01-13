import React, { useState } from 'react'

const DateRangeForm = ({ onSubmit }) => {
   const [date, setDate] = useState({
      startDate: '2023-12-05',
      endDate: '2024-01-15',
      interval: 'daily',
   })

   const handleChange = (field, value) => {
      setDate((prevDate) => ({ ...prevDate, [field]: value }))
   }

   const handleSubmit = () => {
      onSubmit(date.startDate, date.endDate, date.interval)
   }

   return (
      <form className="flex flex-row items-center justify-center mb-4 md:gap-6 lg:gap-10 gap-4 flex-wrap">
         <div className="flex items-center justify-center space-x-4 max-sm:w-full">
            <label
               htmlFor="startDate"
               className="text-sm font-medium text-gray-600"
            >
               Start Date:
            </label>
            <input
               type="date"
               id="startDate"
               value={date.startDate}
               onChange={(e) => handleChange('startDate', e.target.value)}
               className="border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring focus:border-blue-300"
            />
         </div>

         <div className="flex items-center justify-center space-x-4 max-sm:w-full">
            <label
               htmlFor="endDate"
               className="text-sm font-medium text-gray-600"
            >
               End Date:
            </label>
            <input
               type="date"
               id="endDate"
               value={date.endDate}
               onChange={(e) => handleChange('endDate', e.target.value)}
               className="border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring focus:border-blue-300"
            />
         </div>

         <div className="flex relative mx-2">
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
               value={date.interval}
               onChange={(e) => {
                  handleChange('interval', e.target.value)
               }}
               className="border-2 border-white text-sm rounded-lg py-2 pl-3 pr-7 bg-gray-700 cursor-pointer text-white focus:outline-none appearance-none"
            >
               <option value="daily">Daily</option>
               <option value="weekly">Weekly</option>
               <option value="monthly">Monthly</option>
            </select>
         </div>
         <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 focus:ring focus:outline-none"
         >
            Submit
         </button>
      </form>
   )
}

export default DateRangeForm
