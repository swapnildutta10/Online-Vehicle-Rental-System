import { CiLocationOn } from "react-icons/ci";
import { PiSeatLight } from "react-icons/pi";
import { GiEternalLove, GiMoebiusTrefoil } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { LuBookMinus } from "react-icons/lu";
import { LiaDoorOpenSolid } from "react-icons/lia";
import { MdOutlineLocalGasStation, MdSpeed } from "react-icons/md";
import 'react-day-picker/dist/style.css';
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useLoaderData } from "react-router-dom";
import toast from 'react-hot-toast'
import useAxiosPublic from "../hooks/useAxiosPublic";
import useBookings from "../hooks/useBookings";


const CardDetails = () => {
   const { user, setUser } = useAuth();
   const cars = useLoaderData();
   const [, refetch] = useBookings();
   const axiosPublic = useAxiosPublic();
   const [show, setShow] = useState(false)
   const handleShow = () => {
      setShow(!show)
   }
   const { photo, title, location, locationURL, tourCode, speed, fuelType, seats, doors, price, fuel, } = cars;

   // Ensure user is set from localStorage if not present
   useEffect(() => {
      if (!user) {
         const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
         if (storedUser) {
            setUser && setUser(storedUser);
         }
      }
   }, []);

   const handleBooking = async (e) => {
      e.preventDefault();
      const form = e.target;
      const startDate = form.startDate.value;
      const endDate = form.endDate.value;
      const email = user?.email;
      const userPhoto = user?.photoURL;
      const userName = user?.displayName
      const bookingData = {
         startDate, endDate, email, userPhoto, photo, title, tourCode, userName
      }

      try {
         const res = await axiosPublic.post(`/booking?tourCode=${tourCode}`, bookingData)
         console.log(res.data);
         if (res.data.insertedId) {
            refetch()
            toast.success('You have booked successfully!')

         }
      } catch (error) {
         console.log(error);
         if(error.status === 409){
            return toast.error('The car has booked already!')
         }
         toast.error(error.message)
      }
   }

   // Share button handler
   const handleShare = () => {
      if (navigator.share) {
         navigator.share({
            title: title,
            text: `Check out this car: ${title}`,
            url: window.location.href
         });
      } else {
         navigator.clipboard.writeText(window.location.href);
         toast.success("Link copied to clipboard!");
      }
   };

   // Wishlist handler (local demo)
   const handleWishlist = () => {
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlist.push(cars);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      toast.success("Added to wishlist!");
   };

   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

   if (!currentUser) {
      return (
         <div className="flex items-center justify-center h-screen">
         <span className="text-red-500">
           Please <Link to="/login" className="underline text-purple-600">login</Link> or <Link to="/register" className="underline text-purple-600">register</Link> to book the car.
         </span>
      </div>
      );
   }

   // Get today's date in yyyy-mm-dd format
   const [today, setToday] = useState('');

   useEffect(() => {
       const now = new Date();
       const yyyy = now.getFullYear();
       const mm = String(now.getMonth() + 1).padStart(2, '0');
       const dd = String(now.getDate()).padStart(2, '0');
       setToday(`${yyyy}-${mm}-${dd}`);
   }, []);

   return (
      <div>
         <div className="">
            <img src={photo} alt="" className="w-full max-h-[65vh] object-cover rounded-xl mt-2" />
         </div>
         <h1 className="text-3xl sm:text-4xl font-semibold py-6">{title}</h1>

         <div className="flex items-center  justify-between">
            <div className="flex items-center  space-x-6 sm:space-x-10">
               <div className="flex items-center space-x-2 text-gray-600">
                  <CiLocationOn />
                  <span>{location}</span>
               </div>
               <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`} target="_blank" rel="noopener noreferrer" className="underline font-semibold">Show on map</Link>
               <div className="flex items-center space-x-2 text-gray-600">
                  <LuBookMinus />
                  <span>Tour Code : <span className="font-semibold text-black underline">{tourCode}</span></span>
               </div>
            </div>

            <div className="flex items-center  space-x-4">
               <div className="flex items-center space-x-1 p-2 px-4 border rounded-full hover:bg-gray-100 cursor-pointer" onClick={handleShare}>
                  <IoShareSocialOutline />
                  <p>Share</p>
               </div>
               <div className="flex items-center space-x-1 p-2 px-4 border rounded-full hover:bg-gray-100 cursor-pointer" onClick={handleWishlist}>
                  <GiEternalLove />
                  <p>Wishlist</p>
               </div>
            </div>
         </div>

         {/* details */}

         <div className="flex gap-6 mt-10">
            <div className="basis-[65%] space-y-6">
               <div className="p-10 grid grid-cols-3 gap-6 border shadow-[0px_0px_6px_0px] shadow-gray-300 rounded-xl">
                  <div className="p-4 border flex items-center justify-center space-x-2 bg-yellow-50 text-xl">
                     <MdSpeed />
                     <span>{speed}</span>
                  </div>
                  <div className="p-4 border flex items-center justify-center space-x-2 bg-yellow-50 text-xl">
                     <MdOutlineLocalGasStation />
                     <span>{fuelType}</span>
                  </div>
                  <div className="p-4 border flex items-center justify-center space-x-2 bg-yellow-50 text-xl">
                     <span>Automatic</span>
                  </div>
                  <div className="p-4 border flex items-center justify-center space-x-2 bg-yellow-50 text-xl">
                     <PiSeatLight />
                     <span>{seats} Seats</span>
                  </div>
                  <div className="p-4 border flex items-center justify-center space-x-2 bg-yellow-50 text-xl">
                     <LiaDoorOpenSolid />
                     <span>{doors} Doors</span>
                  </div>
                  <div className="p-4 border flex items-center justify-center space-x-2 bg-yellow-50 text-xl">
                     <GiMoebiusTrefoil />
                     <span>{fuel}L</span>
                  </div>

               </div>

               <div className="border shadow-[0px_0px_6px_0px] shadow-gray-300 p-10 rounded-xl">
                  <div className="space-y-5">
                     <div onClick={handleShow} className="flex items-center justify-between cursor-pointer  duration-500">
                        <h2 className="text-xl font-bold">Overview</h2>
                        <IoIosArrowDown className={`text-xl transform duration-500 ${show ? 'rotate-180' : ''}`} />
                     </div>

                     <div className={`text-justify space-y-4 overflow-hidden transition-all duration-1000 ${show ? 'max-h-0' : 'max-h-screen '}`}>
                        <p className="text-[15px] font-light">Elevate your Las Vegas experience to new heights with a journey aboard The High Roller at The LINQ. As the tallest observation wheel in the world, standing at an impressive 550 feet tall, The High Roller offers a bird's-eye perspective of the iconic Las Vegas Strip and its surrounding desert landscape. From the moment you step into one of the spacious cabins, you'll be transported on a mesmerizing adventure, where every turn offers a new and breathtaking vista of the vibrant city below.</p>
                        <p className="text-[15px] font-light">Whether you're a first-time visitor or a seasoned Las Vegas aficionado, The High Roller promises an unparalleled experience that will leave you in awe. With its climate-controlled cabins and immersive audio commentary, this attraction provides a unique opportunity to see Las Vegas from a whole new perspective, while learning about its rich history and famous landmarks along the way.</p>
                     </div>
                  </div>

               </div>

            </div>
            <div className="basis-[33%] ">
               <div className="border rounded-xl">
                  <h3 className="bg-gray-100 py-6 px-4 font-semibold text-2xl rounded-t-xl">Bookings Form</h3>
                  <form onSubmit={handleBooking} className=" px-4 py-6 space-y-4">
                     <div className="space-y-1">
                        <label className="font-semibold">From:</label>
                        <input
                           type="date"
                           name="startDate"
                           required
                           min={today}
                           className="border p-2 w-full rounded-md"
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="font-semibold">To:</label>
                        <input
                           type="date"
                           name="endDate"
                           required
                           min={today}
                           className="border p-2 w-full rounded-md"
                        />
                     </div>
                     <div className="space-y-1">
                        <p className="font-semibold">Max-Guests : {seats - 1}</p>

                     </div>
                     <p className="text-lg font-semibold">Price for one day : <span className="text-blue-600">${price}</span></p>
                     <hr />
                     <p className="text-lg font-semibold">Total Price : <span className="text-green-600">${price}</span></p>
                     {
                        user ? <input type="submit" value="Book" className="bg-purple-600 text-white p-2.5 rounded-md w-full text-sm font-semibold cursor-pointer active:bg-purple-700" /> : <p className="text-sm text-red-600 bg-red-50 p-2.5 rounded-sm text-center">please <Link to='/login' className="hover:underline">login</Link> or <Link to='/register' className="hover:underline">register</Link> to book the car.</p>
                     }
                  </form>
               </div>


            </div>
         </div>
      </div>
   );
};

export default CardDetails;