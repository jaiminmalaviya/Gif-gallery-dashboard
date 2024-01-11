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
                  _id: {
                     year: { $year: '$timestamp' },
                     month: { $month: '$timestamp' },
                     day: { $dayOfMonth: '$timestamp' },
                     keyword: '$keyword',
                  },
                  count: { $sum: 1 },
               },
            },
            {
               $sort: { count: -1 },
            },
            {
               $group: {
                  _id: { year: '$_id.year', month: '$_id.month', day: '$_id.day' },
                  keywords: {
                     $push: { keyword: '$_id.keyword', count: '$count' },
                  },
               },
            },
            {
               $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 },
            },
            {
               $project: {
                  _id: 0,
                  day: '$_id.day',
                  month: '$_id.month',
                  year: '$_id.year',
                  keywords: { $slice: ['$keywords', 5] },
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
                  _id: {
                     year: { $year: '$timestamp' },
                     month: { $month: '$timestamp' },
                     week: { $week: '$timestamp' },
                     keyword: '$keyword',
                  },
                  count: { $sum: 1 },
               },
            },
            {
               $sort: { count: -1 },
            },
            {
               $group: {
                  _id: { year: '$_id.year', month: '$_id.month', week: '$_id.week' },
                  keywords: {
                     $push: { keyword: '$_id.keyword', count: '$count' },
                  },
               },
            },
            {
               $sort: { '_id.year': 1, '_id.month': 1, '_id.week': 1 },
            },
            {
               $project: {
                  _id: 0,
                  week: '$_id.week',
                  month: '$_id.month',
                  year: '$_id.year',
                  keywords: { $slice: ['$keywords', 5] },
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
                  _id: {
                     year: {
                        $year: '$timestamp',
                     },
                     month: {
                        $month: '$timestamp',
                     },
                     keyword: '$keyword',
                  },
                  count: {
                     $sum: 1,
                  },
               },
            },
            {
               $sort: { count: -1 },
            },
            {
               $group: {
                  _id: {
                     year: '$_id.year',
                     month: '$_id.month',
                  },
                  keywords: {
                     $push: {
                        keyword: '$_id.keyword',
                        count: '$count',
                     },
                  },
               },
            },
            {
               $sort: { '_id.year': 1, '_id.month': 1 },
            },
            {
               $project: {
                  _id: 0,
                  month: '$_id.month',
                  year: '$_id.year',
                  keywords: {
                     $slice: ['$keywords', 5],
                  },
               },
            },
         ]
      } else {
         return NextResponse.json('Interval is not defined', { status: 200 })
      }

      const topKeywords = await prisma.searchKeyword.aggregateRaw({
         pipeline,
      })

      return NextResponse.json(topKeywords, { status: 200 })
   } catch (error) {
      console.error(error)
      return NextResponse.json(error.message, { status: 400 })
   }
}
