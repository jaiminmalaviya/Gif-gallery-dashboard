import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(req, { params }) {
   try {
      const interval = params.slug
      const { startDate, endDate } = await req.json()

      if (!startDate || !endDate) {
         return NextResponse.json('Missing required fields: startDate, endDate', { status: 200 })
      }

      let pipeline = []

      if (interval === 'daily') {
         pipeline = [
            {
               $match: {
                  $and: [
                     {
                        $expr: {
                           $gte: [
                              '$createdAt',
                              {
                                 $dateFromString: {
                                    dateString: startDate,
                                 },
                              },
                           ],
                        },
                     },
                     {
                        $expr: {
                           $lte: [
                              '$createdAt',
                              {
                                 $dateFromString: {
                                    dateString: endDate,
                                 },
                              },
                           ],
                        },
                     },
                  ],
               },
            },
            {
               $group: {
                  _id: {
                     day: { $dayOfMonth: '$createdAt' },
                     month: { $month: '$createdAt' },
                     year: { $year: '$createdAt' },
                  },
                  count: { $addToSet: { gifId: '$gifId', userId: '$userId' } },
               },
            },
            {
               $sort: {
                  '_id.year': 1,
                  '_id.month': 1,
                  '_id.day': 1,
               },
            },
            {
               $project: {
                  _id: 0,
                  day: '$_id.day',
                  month: '$_id.month',
                  year: '$_id.year',
                  favorites: { $size: '$count' },
               },
            },
         ]
      } else if (interval === 'weekly') {
         pipeline = [
            {
               $match: {
                  $and: [
                     {
                        $expr: {
                           $gte: [
                              '$createdAt',
                              {
                                 $dateFromString: {
                                    dateString: startDate,
                                 },
                              },
                           ],
                        },
                     },
                     {
                        $expr: {
                           $lte: [
                              '$createdAt',
                              {
                                 $dateFromString: {
                                    dateString: endDate,
                                 },
                              },
                           ],
                        },
                     },
                  ],
               },
            },
            {
               $group: {
                  _id: {
                     week: { $week: '$createdAt' },
                     month: { $month: '$createdAt' },
                     year: { $year: '$createdAt' },
                  },
                  count: { $addToSet: { gifId: '$gifId', userId: '$userId' } },
               },
            },
            {
               $sort: {
                  '_id.year': 1,
                  '_id.month': 1,
                  '_id.week': 1,
               },
            },
            {
               $project: {
                  _id: 0,
                  week: '$_id.week',
                  month: '$_id.month',
                  year: '$_id.year',
                  favorites: { $size: '$count' },
               },
            },
         ]
      } else if (interval === 'monthly') {
         pipeline = [
            {
               $match: {
                  $and: [
                     {
                        $expr: {
                           $gte: [
                              '$createdAt',
                              {
                                 $dateFromString: {
                                    dateString: startDate,
                                 },
                              },
                           ],
                        },
                     },
                     {
                        $expr: {
                           $lte: [
                              '$createdAt',
                              {
                                 $dateFromString: {
                                    dateString: endDate,
                                 },
                              },
                           ],
                        },
                     },
                  ],
               },
            },
            {
               $group: {
                  _id: {
                     month: { $month: '$createdAt' },
                     year: { $year: '$createdAt' },
                  },
                  count: { $addToSet: { gifId: '$gifId', userId: '$userId' } },
               },
            },
            {
               $sort: {
                  '_id.year': 1,
                  '_id.month': 1,
               },
            },
            {
               $project: {
                  _id: 0,
                  month: '$_id.month',
                  year: '$_id.year',
                  favorites: { $size: '$count' },
               },
            },
         ]
      } else {
         return NextResponse.json('Interval is not defined', { status: 200 })
      }

      const favoriteCounts = await prisma.favorite.aggregateRaw({
         pipeline,
      })

      return NextResponse.json(favoriteCounts, { status: 200 })
   } catch (error) {
      console.error(error)
      return NextResponse.json(error.message, { status: 400 })
   }
}
