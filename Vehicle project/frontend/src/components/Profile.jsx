import useAuth from "../hooks/useAuth";


const Profile = () => {
   const {user} = useAuth();
   
   // Get user from localStorage if not present
   let displayName = user?.name || user?.displayName || "";
   let photoURL = user?.photoURL || user?.photo || "";
   let email = user?.email || "";
   if (!displayName || !email) {
      const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
      if (storedUser) {
         displayName = storedUser.name;
         email = storedUser.email;
         photoURL = storedUser.photo || "";
      }
   }

   return (
      <div className="max-w-sm mx-auto px-3 my-20 py-10 border rounded-xl">
         <div className="flex items-center justify-center mb-6">
            {photoURL ? (
               <img src={photoURL} className="rounded-full w-24" alt="Profile" />
            ) : (
               <div className="rounded-full w-24 h-24 bg-gray-200 flex items-center justify-center text-3xl">
                  {displayName ? displayName[0].toUpperCase() : "?"}
               </div>
            )}
         </div>
         <div className="pt-4 space-y-3">
            <p><span className="font-semibold">Name </span> <span className="text-purple-700">: {displayName}</span></p>
            <p><span className="font-semibold">Email </span> <span className="text-purple-700">: {email}</span></p>
         </div>
      </div>
   );
};

export default Profile;