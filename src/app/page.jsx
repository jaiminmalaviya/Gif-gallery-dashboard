'use client'

import DashboardStats from '@/components/DashboardStats'
import DashboardStatsCard from '@/components/DashboardStatsCard '
import DateRangeForm from '@/components/DateRangeForm'
import FavoriteChart from '@/components/FavoriteChart'
import KeywordChart from '@/components/KeywordChart'
import LoginChart from '@/components/LoginChart'
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import Link from 'next/link'
import { useState } from 'react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels)

export default function Home() {
   const [startDate, setStartDate] = useState('2023-12-05')
   const [endDate, setEndDate] = useState('2024-01-15')

   const handleSubmit = (newStartDate, newEndDate) => {
      setStartDate(newStartDate)
      setEndDate(newEndDate)
   }

   return (
      <div className="flex flex-col justify-center min-h-screen">
         <nav className="flex justify-between items-center sm:p-8 p-4 md:px-16 sm:mb-2 mb-0">
            <Link href="/">
               <h1 className="md:text-5xl text-4xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text md:leading-[64px] leading-[48px]">
                  Dashboard
               </h1>
            </Link>
         </nav>

         <DateRangeForm onSubmit={handleSubmit} />

         <DashboardStats
            startDate={startDate}
            endDate={endDate}
         />

         <div className="grid lg:grid-cols-2 grid-cols-1">
            <LoginChart
               startDate={startDate}
               endDate={endDate}
            />
            <FavoriteChart
               startDate={startDate}
               endDate={endDate}
            />
            <KeywordChart
               startDate={startDate}
               endDate={endDate}
            />
         </div>
      </div>
   )
}
