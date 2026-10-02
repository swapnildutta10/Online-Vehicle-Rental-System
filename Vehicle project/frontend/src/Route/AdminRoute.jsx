import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AdminRoute = ({ children }) => {
   const { user, loading } = useAuth();
   const [isAdmin, isLoading] = useAdmin();
   const navigate = useNavigate();

   useEffect(() => {
      if (!user) {
         const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
         if (storedUser) {
            // setUser is not available here, but user will be set on login/register page
         }
      }
   }, [user]);

   if (loading || isLoading) {
      return <p className='text-5xl font-semibold'>Loading...</p>
   }

   // Allow access if user is admin, otherwise redirect to login
   if (isAdmin?.role === 'admin' && user) {
      return children;
   }
   if (!user) {
      return <Navigate to='/login' />;
   }
   return <Navigate to='/' />;
};

export default AdminRoute;