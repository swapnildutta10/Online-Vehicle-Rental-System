import { useState } from "react";
import Card from "../../components/Card";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const AllCars = () => {

   const [cars, setCars] = useState([])
   const [page, setPage] = useState(0)
   const [hasMore, setHasMore] = useState(true)

   const axiosPublic = useAxiosPublic();



   const getCars = async () =>{
      try{
         const res = await axiosPublic.get(`/cars?page=${page}`)
         const newCars = res.data;

         if(newCars.length < 3){
            setHasMore(false)
         }
         setCars(prev => [...prev, ...res.data])
      }
      catch(err){
         console.log(err);
      }
   }

   useQuery({
      queryKey : ['cars'],
      queryFn : getCars
   })

   
   return (
      <div className="py-12">

         {/* <form onSubmit={handleSearch} className="max-w-2xl mx-auto border flex rounded-full group focus-within:border-red-500">
            <input type="text" name="search" placeholder="Search Item Names" className="w-full outline-none rounded-l-full p-2" />
            <input type="submit" value="Search" className="p-3 px-6 text-sm font-semibold bg-[#fb320f] text-white rounded-r-full cursor-pointer" />
         </form> */}


         {/* all items */}
         <h3 className="text-xl font-semibold py-6">Total Items : {cars.length}</h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {
               cars.map(car => <Card key={car._id} car={car}></Card>)
            }
         </div>

         {hasMore && <div className="text-center mt-8">
            <button onClick={() => {
               setPage(prev => prev + 1)
               getCars()
            }} className="btn">See More</button>
         </div>}

      </div>
   );
};

export default AllCars;