import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GoCommentDiscussion } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

const FriendProfile = (props) => {

  let userStore = useSelector((state)=>state.user);
  let token = useSelector((state)=>state.user.token);
  console.log(token)
  let original = userStore.user;
  // console.log(original._id)
  let originalId = original._id;
  console.log(originalId)

 
let location = useLocation();
let userId = location.state
console.log(userId)

const [userDetails, setuserDetails] = useState('');
async function getUserDetails (){
    let  res = await axios.get(`https://blogapp-jtdv.onrender.com/users/getSingleUser/${userId}`);
    let data = res.data;
    console.log(data)
    setuserDetails(data.user)
}

useEffect(()=>{
    getUserDetails()
},[userId])
  

 

   
  const [userPics, setuserPics] = useState({
    coverPic:"",
    profilePic:""
  });
  console.log(userPics)


  const [likesCount, setlikesCount] = useState(0);
  const getLikes = (ans)=>{
    console.log(ans)
    setlikesCount(ans)
  }

  const handleFollow=async()=>{
    let res = await axios(`https://blogapp-jtdv.onrender.com/users/follow/${userId}`,{
      headers:{
        'Authorization':token
      }
    })
    let data = res.data
    console.log(data)
    if(data.success){
      getUserDetails()
      props.getUserDetails()
    }
  }

  return (
    <div className='mt-16'>
      
      
<div className=" mx-auto w-[90%] bg-white shadow-xl rounded-lg text-gray-900">
  <div className="rounded-t-lg h-64 overflow-hidden relative">
    
    <img className="object-cover object-top w-full" src={userDetails?.coverPic} alt="Mountain" />
  </div>
  <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full">
  
    <img className="object-cover object-center rounded-full h-32" src={userDetails?.profilePic} alt="Woman looking front" />
  </div>
  <div className="text-center mt-2">
    <h2 className="font-semibold">{userDetails?.name}</h2>
    <p className="text-gray-500">{userDetails?.bio?userDetails?.bio:'enter the bio'}</p>
   {/* {!original.followings.includes(userId) && <button onClick={handleFollow} className='bg-green-950 text-white px-3 py-2 rounded-md'>Follow</button>}
    {original.followings.includes(userId) && <button onClick={handleFollow} className='bg-green-950 text-white px-3 py-2 rounded-md'>Unfollow</button>} */}

{!original.followings.includes(userId) && (
  <button
    onClick={handleFollow}
    disabled={userId === originalId}
    className='bg-green-950 text-white px-3 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed'
  >
    Follow
  </button>
)}

{original.followings.includes(userId) && (
  <button
    onClick={handleFollow}
    disabled={userId === originalId}
    className='bg-green-950 text-white px-3 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed'
  >
    Unfollow
  </button>
)}


  </div>
  <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
    <li className="flex flex-col items-center justify-around">
     
       <p className='font-bold'>Followings</p>
       <div>{userDetails?.followings?.length}</div>
    </li>
    <li className="flex flex-col items-center -ms-10 justify-between">
      
      <p className='font-bold'>Followers</p>
      <div>{userDetails?.followers?.length}</div>
    </li>
    <li className="flex flex-col items-center justify-around">
     
      <FaHeart size={30} color='red'/>
      <div>{likesCount}</div>
    </li>
  </ul>
 
</div>




<div className='flex gap-4 mt-4 mx-auto w-[90%]'>


<div className='w-[60%]'>
  {/* <UserProfileCard getLikes={getLikes}/> */}
   
</div>

</div>


    </div>
  )
}

export default FriendProfile
