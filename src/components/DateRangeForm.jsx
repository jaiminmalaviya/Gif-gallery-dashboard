import React, { useState } from 'react'

const DateRangeForm = ({ onSubmit }) => {
   const [date, setDate] = useState({
      startDate: '2023-12-05',
      endDate: '2024-01-15',
   })

   const handleChange = (field, value) => {
      setDate((prevDate) => ({ ...prevDate, [field]: value }))
   }

   const handleSubmit = () => {
      onSubmit(date.startDate, date.endDate)
   }

   return (
      <form className="flex flex-col md:flex-row items-center justify-center mb-4 md:gap-6 gap-4">
         <div className="flex items-center space-x-4">
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

         <div className="flex items-center space-x-4">
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
