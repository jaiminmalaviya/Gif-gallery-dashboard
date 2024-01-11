import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(req) {
   try {
      const { startDate, endDate } = await req.json()

      if (!startDate || !endDate) {
         return NextResponse.json('Missing required fields: startDate, endDate', { status: 200 })
      }

      const pipeline = [
         {
            $match: {
               $and: [
                  {
                     $expr: {
                        $gte: ['$timestamp', { $dateFromString: { dateString: startDate } }],
                     },
                  },
                  {
                     $expr: {
                        $lte: ['$timestamp', { $dateFromString: { dateString: endDate } }],
                     },
                  },
               ],
            },
         },
         {
            $group: {
               _id: '$keyword',
               count: { $sum: 1 },
            },
         },
         {
            $sort: { count: -1 },
         },
         {
            $limit: 1,
         },
      ]

      const totalActiveUsersPipeline = [
         {
            $match: {
               $and: [
                  {
                     $expr: {
                        $gte: ['$loginTime', { $dateFromString: { dateString: startDate } }],
                     },
                  },
                  {
                     $expr: {
                        $lte: ['$loginTime', { $dateFromString: { dateString: endDate } }],
                     },
                  },
               ],
            },
         },
         {
            $group: {
               _id: '$userId',
               count: { $sum: 1 },
            },
         },
         {
            $group: {
               _id: null,
               totalActiveUsers: { $sum: 1 },
            },
         },
      ]

      const totalFavoritesPipeline = [
         {
            $match: {
               $and: [
                  {
                     $expr: {
                        $gte: ['$createdAt', { $dateFromString: { dateString: startDate } }],
                     },
                  },
                  {
                     $expr: {
                        $lte: ['$createdAt', { $dateFromString: { dateString: endDate } }],
                     },
                  },
               ],
            },
         },
         {
            $group: {
               _id: {
                  gifId: '$gifId',
                  userId: '$userId',
               },
            },
         },
         {
            $group: {
               _id: null,
               totalUniqueFavorites: { $sum: 1 },
            },
         },
      ]

      const topTrendingKeyword = await prisma.searchKeyword.aggregateRaw({
         pipeline,
      })

      const totalActiveUsers = await prisma.loginTime.aggregateRaw({
         pipeline: totalActiveUsersPipeline,
      })

      const totalFavorites = await prisma.favorite.aggregateRaw({
         pipeline: totalFavoritesPipeline,
      })

      const dashboardStats = {
         topTrendingKeyword,
         totalActiveUsers,
         totalFavorites,
      }

      return NextResponse.json(dashboardStats, { status: 200 })
   } catch (error) {
      console.error(error)
      return NextResponse.json(error.message, { status: 400 })
   }
}
