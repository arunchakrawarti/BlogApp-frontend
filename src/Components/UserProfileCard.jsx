import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaHeart } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";

const UserProfileCard = (props) => {

    let userStore = useSelector((state)=>state.user);
    let user = userStore.user
    console.log(userStore)


    const [allPosts, setallPosts] = useState([]);
    console.log(allPosts)

    let likesLength = 0
    allPosts?.forEach((post)=>{
      likesLength = likesLength+ post.likes.length
    })
    console.log(likesLength)

    props.getLikes(likesLength)

    const getUserPost = async()=>{
        let res = await axios.get(`https://blogapp-jtdv.onrender.com/posts/userPost/${user._id}`)
        let data = res.data;
        console.log(data)
        setallPosts(data.posts)
    }

    useEffect(()=>{
        getUserPost()
    },[])

    const handleLike = async(postId)=>{
      console.log(postId)
      let res = await axios.get(`https://blogapp-jtdv.onrender.com/posts/like/${postId}`,{
        headers:{
          'Authorization':userStore.token
        }
      })
      let data = res.data;
      console.log(data)
      getUserPost()
    }
  return (
    <div>
      {
        allPosts.map((ele)=>{
            return <article className="rounded-xl border relative border-gray-700 bg-gray-800 p-4 mb-4">

             <div className='absolute right-4 top-4'>
              <span className='flex'> <FaHeart color={ele.likes.includes(userStore.user._id)? 'red':''} onClick={()=>handleLike(ele._id)} size={25}/> <sub>{ele.likes.length}</sub></span>
              <span className='flex mt-6'> <GoCommentDiscussion size={25}/> <sub>{ele.comments.length}</sub></span>
             </div>

            <div className="flex items-center gap-4">
              {/* <img
                alt=""
                // src="https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                src={ele?.user?.profilePic?.url}
                className="size-16 rounded-full object-cover"
              /> */}

             <img
               alt=""
               src={user?.profilePic}
               className="size-16 rounded-full object-cover"
             />

          
              <div>
                <h3 className="text-lg font-medium text-white">Arun chakrawarti</h3>
          
                {/* <div className="flow-root">
                  <ul className="-m-1 flex flex-wrap">
                    <li className="p-1 leading-none">
                      <a href="#" className="text-xs font-medium text-gray-300"> Twitter </a>
                    </li>
          
                    <li className="p-1 leading-none">
                      <a href="#" className="text-xs font-medium text-gray-300"> GitHub </a>
                    </li>
          
                    <li className="p-1 leading-none">
                      <a href="#" className="text-xs font-medium text-gray-300">Website</a>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
          
            <ul className="mt-4  space-y-2">
              <li>
                <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
                  {/* <strong className="font-medium text-white">Project A</strong> */}
          
                  <p className="mt-1 text-xs font-medium text-gray-300">
                    {ele.title}
                  </p>
                </a>
              </li>
          
              <li>
                <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
                  {/* <strong className="font-medium text-white">Project B</strong> */}
          
                  <p className="mt-1 text-xs font-medium text-gray-300">
                    {ele.description}
                  </p>
                </a>
              </li>
            </ul>
          </article>
        })
      }
    </div>
  )
}

export default UserProfileCard




