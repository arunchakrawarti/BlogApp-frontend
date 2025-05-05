import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/UserSlice';
import axios from 'axios';

const Navbar = () => {

  let dispatch = useDispatch()
  let userStore = useSelector((state)=>state.user)
  // console.log(userStore)
  let login = userStore.login;


  const [searchUsers, setsearchUsers] = useState([]);
  console.log(searchUsers)
  const handleSearchChanger=async(e)=>{
    // console.log(e.target.value)
    let value = e.target.value;
    let res = await axios.get(`https://blogapp-jtdv.onrender.com/users/search?q=${value}`);
    let data = res.data;
    // console.log(data.users)
    setsearchUsers(data.users)
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {  
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside); 
  }, []);

 

  return (
    <div>
      <nav className="bg-blue-700 z-50 fixed top-0 left-0 right-0 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BlogApp</span>
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse" ref={dropdownRef}>
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="sr-only">Open user menu</span>
              { login===true ? <img className="w-8 h-8 rounded-full" src={userStore.user.profilePic} alt="user photo" />
              :
              <img className="w-8 h-8 rounded-full" src="http://www.pngall.com/wp-content/uploads/5/Profile.png" alt="" />}
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="z-50 my-11 mt-60 text-base list-none absolute right-4  divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                
                <ul className="py-2" aria-labelledby="user-menu-button">
                <div className='bg-slate-400'>
  { login===true && <div className="px-4 py-3">
    <span className="block text-sm text-gray-900 dark:text-white">{userStore.user.name}</span>
    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{userStore.user.email}</span>
  </div>}
  <ul className="py-2" aria-labelledby="user-menu-button">  
    { login===true && <li>
      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link>
    </li>}
    { login===false && <li>
      <Link to="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Signup</Link>
    </li>}
    { login===false && <li>
      <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log in</Link>
    </li>}
    { login===true && <li onClick={()=>dispatch(logout())} className=" cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
     Log out
    </li>}
  </ul></div>


         </ul>
              </div>
            )}

            <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          <div className="items-center  justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul className="flex flex-col bg-blue-700 font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:items-center md:flex-row md:mt-0 md:border-0 md:bg-blue-700 text-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/" className="block py-2 px-3 text-white rounded-sm md:bg-transparent md:text-white md:p-0 md:dark:text-white" aria-current="page">Home</Link>
              </li>
              <li className='relative'>
                <input type="text" onChange={handleSearchChanger} className='px-4 py-2 outline-none border-2 text-black rounded-md' placeholder='search a friend..' />

                <div className='absolute mt-1 top-full w-full bg-white text-black'>
                  {
                    searchUsers?.map((ele)=>{
                      return <Link state={ele._id} to={'/FriendProfile'} className='flex items-center gap-5 my-2 pl-2 cursor-pointer'>
                        <img className='w-10 h-10 rounded-full' src={ele.profilePic} alt="" />
                        <p>{ele.name}</p>
                      </Link>

                    })
                  }
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;










