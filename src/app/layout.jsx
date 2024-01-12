import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
   title: 'GIF Gallery - Dashboard',
   description:
      'Explore insightful analytics and statistics for your GIF Gallery. Track active users, monitor the total number of favorites, and discover trending keywords. Gain valuable insights to enhance user engagement and optimize content based on user preferences.',
}

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body className={inter.className}>{children}</body>
      </html>
   )
}
