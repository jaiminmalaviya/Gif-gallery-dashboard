import Link from 'next/link'

const Navbar = () => {
   return (
      <nav className="container flex justify-between items-center sm:py-4 py-1 mb-6 lg:mb-8 sm:pl-0 pl-2 m-auto border-b border-gray-400">
         <Link
            href="/"
            className="outline-0"
         >
            <h1 className="md:text-5xl text-4xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text md:leading-[64px] leading-[48px]">
               Dashboard
            </h1>
         </Link>
      </nav>
   )
}

export default Navbar
