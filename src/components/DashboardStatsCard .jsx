const DashboardStatsCard = ({ title, data }) => {
   return (
      <div class="block max-w-[20rem] text-center m-auto w-full p-6 border  rounded-lg shadow-lg bg-black border-gray-700 hover:bg-black/80">
         <p class="text-4xl font-bold text-white">{data}</p>
         <h5 class="mt-3 font-normal tracking-tight text-gray-300">{title}</h5>
      </div>
   )
}

export default DashboardStatsCard
