import { Link, NavLink } from 'react-router-dom';
import { CiBookmarkCheck, CiMenuBurger } from "react-icons/ci";
import logo from '../assets/logo.png'
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import useBookings from '../hooks/useBookings';


const Nav = () => {
    const { user, logOut } = useAuth();
    

    const [scrollPosition, setScrollPosition] = useState(0)
    const [showNav, setShowNav] = useState(true)
    const [menu, setMenu] = useState(false)
    const [bookings] = useBookings();
   

    const handleLogout = () => {
        // Remove user from localStorage for local auth
        localStorage.removeItem("currentUser");
        localStorage.removeItem("registeredUser");
        // Optionally, clear other user-related data if needed
        if (typeof logOut === 'function') logOut();
        window.location.href = "/login";
    }

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            if (currentScrollPos < scrollPosition) {
                setShowNav(true)
            }
            else {
                setShowNav(false)
            }
            setScrollPosition(currentScrollPos)
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [scrollPosition])


    return (
        <nav className={`fixed top-0 left-0 right-0  shadow-sm z-50 bg-purple-100/80 backdrop-blur-3xl transition-transform duration-500 ease-in-out ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="bg-purple-50 flex items-center justify-between px-8 py-4">
                <Link to='/'>
                    <img src={logo} alt="" className='w-14' />
                </Link>
                <ul className='font-semibold text-gray-600 space-x-6 nav items-center hidden md:flex'>
                    <NavLink
  to="/"
  className={({ isActive }) =>
    isActive
      ? "text-purple-700 font-bold underline underline-offset-4"
      : "text-gray-700 font-semibold"
  }
>
  Home
</NavLink>
                    <NavLink to='/about'>About</NavLink>
                    <NavLink to='/cars'>Cars</NavLink>
                    {user && <NavLink to='/dashboard/statistics'>Dashboard</NavLink>}
                    

                </ul>

                <div className='flex items-center space-x-4'>
                    {
                        user ? <div className='flex items-center space-x-6 cursor-pointer'>
                            <Link to="/dashboard/manageBookings" className='relative'>
                                <CiBookmarkCheck className='text-2xl' />
                                <span className='absolute -top-2 -right-2 bg-purple-600 text-white px-1 rounded-full text-xs'>{bookings.length}</span>

                            </Link>
                            <Link to='/profile'><img src={user?.photoURL} referrerPolicy="no-referrer" className='w-10 h-10 rounded-full object-cover' /></Link>                            
                            <span onClick={handleLogout} className='text-sm mr-4 bg-purple-600 text-white px-2 py-1 rounded-md hidden md:block'>Log Out</span>
                        </div>
                            :
                            <button className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-xl ml-6 hover:bg-purple-700 transition">
  Create Account
</button>
                    }
                    <div onClick={() => setMenu(true)} className='text-2xl md:hidden cursor-pointer'>
                        <CiMenuBurger className='' />
                    </div>
                </div>

                {/* side menu */}

                <ul className={`font-semibold text-gray-600 nav  absolute flex flex-col items-start bg-white w-[250px] h-screen top-0 right-0 py-5 pl-10 pr-2 space-y-5 md:hidden duration-500  ${menu ? 'mr-0' : '-mr-72'}`}>
                    <div className='w-full flex items-center justify-end'>
                       {user && <span onClick={handleLogout} className='text-sm mr-4 bg-red-600 text-white px-2 py-1 rounded-md'>Log Out</span>}
                        <IoCloseOutline
                        onClick={() => setMenu(false)} className='text-3xl cursor-pointer' />
                    </div>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/about'>About</NavLink>
                    <NavLink to='/cars'>Cars</NavLink>
                    {user && <NavLink to='/dashboard/statistics'>Dashboard</NavLink>}
                    {!user && <NavLink to='login'>Login</NavLink>}

                </ul>

            </div>
        </nav>
    );
};

export default Nav;