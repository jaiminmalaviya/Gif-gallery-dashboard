import Link from 'next/link'

const Navbar = () => {
   return (
      <nav className="container flex justify-between items-center sm:py-8 py-4 sm:mb-2 mb-0 backdrop-blur">
         <Link href="/">
            <h1 className="md:text-5xl text-4xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text md:leading-[64px] leading-[48px]">
               Dashboard
            </h1>
         </Link>
      </nav>
   )
}

export default Navbar
