import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
   const { user } = useAuth();
   const axiosPublic = useAxiosPublic();
   // Try to get admin info from localStorage first
   let localAdmin = null;
   if (user) {
      const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
      if (storedUser && storedUser.email === user.email && storedUser.role === "admin") {
         localAdmin = { role: "admin" };
      }
   }
   const { data: isAdmin, isLoading, refetch } = useQuery({
      queryKey: ['user', user?.email],
      queryFn: async () => {
         // If local admin, return it
         if (localAdmin) return localAdmin;
         // Otherwise, try backend
         const { data } = await axiosPublic.get(`/user/${user?.email}`)
         return data;
      }
   })
   return [isAdmin, isLoading, refetch]
};

export default useAdmin;