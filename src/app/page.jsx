'use client'

import DashboardStats from '@/components/DashboardStats'
import DashboardStatsCard from '@/components/DashboardStatsCard '
import DateRangeForm from '@/components/DateRangeForm'
import FavoriteChart from '@/components/FavoriteChart'
import KeywordChart from '@/components/KeywordChart'
import LoginChart from '@/components/LoginChart'
import Navbar from '@/components/Navbar'
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
      <div className="min-h-screen flex items-center flex-col m-auto">
         <Navbar />
         <div className="flex flex-col justify-center container m-auto">
            <DateRangeForm onSubmit={handleSubmit} />

            <DashboardStats
               startDate={startDate}
               endDate={endDate}
            />

            <div className="grid my-12 gap-8 gap-y-8 lg:grid-cols-2 grid-cols-1">
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
      </div>
   )
}
