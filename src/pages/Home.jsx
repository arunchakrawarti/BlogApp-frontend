import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../Components/Sidebar';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaHeart } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import { Modal } from 'antd';
import { IoSend } from "react-icons/io5";
import { toast } from 'react-toastify';


const Home = () => {

 

  let userStore = useSelector((state)=>state.user)
  console.log(userStore)
  
  const [AllPosts, setAllPosts] = useState([]);
  console.log(AllPosts)
  const getAllUserPost = async()=>{
     let res = await axios.get('https://blogapp-jtdv.onrender.com/posts/getAllpost');
     let data = res.data;
    //  console.log(data)
     setAllPosts(res.data.post)
  }

  useEffect(()=>{
    getAllUserPost()
  },[])
  

  

  const handleLikes = async(postId)=>{
    console.log(postId)
    let res = await axios.get(`https://blogapp-jtdv.onrender.com/posts/like/${postId}`,{
      headers:{
        'Authorization':userStore.token
      }
    })

    let data = res.data;
    console.log(data)
    getAllUserPost()
  }

  // comment post start here********************************
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const [selectedPost, setselectedPost] = useState("");
  console.log(selectedPost)
  const commentClicked=(obj)=>{
   setselectedPost(obj)
   setIsModalOpen(true);
  }

  const [commentValue, setcommentValue] = useState("");
  const handleCommentChanger=(e)=>{
    let value = e.target.value;
    // console.log(value)
    setcommentValue(value)

  }

  const handleCommentSubmit = async(postId)=>{
    // console.log(postId)
    //  console.log(commentValue)
    let res = await axios.post(`https://blogapp-jtdv.onrender.com/posts/comment/${postId}`,{text:commentValue},{
      headers:{
        'Authorization':userStore.token
      }
    })

    let data = res.data;
    console.log(data);

    if(data.success){
      toast.success('comment added successfully',{position:"bottom-right",theme:'dark'})
      getAllUserPost()
      setcommentValue('')
    }
  }
 
 
  return (
    <div>
      <div className='mt-16 bg-black'>
      <div className='flex gap-2'>

        <div className='flex-1'>
        <Sidebar getAllUserPost={ getAllUserPost}/>
        </div>
        
         <section className="w-[90%] bg-red-500">
  <div className="container px-6 py-10 mx-auto">
    <div className="w-full flex flex-col items-center">
      {
        AllPosts.map((ele)=>{
        //   return <div className='border-2 border-gray-500'>

        //   {ele.file.map((data)=>{
        //     return data.resource_type==='image'? <img className="object-cover object-center w-full h-64 rounded-lg lg:h-80" src={data.url} alt="" /> : <video className="object-cover object-center w-full h-64 rounded-lg lg:h-80" src={data.url}></video>
        //   })}

        //   {/* <img className="object-cover object-center w-full h-64 rounded-lg lg:h-80" src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt /> */}
        //   <div className="mt-8">
        //     <span className="text-blue-500 uppercase">category</span>
        //     <h1 className="mt-4 text-xl font-semibold text-white">
        //       {ele.title}
        //     </h1>
        //     <p className="mt-2 text-white dark:text-gray-400">
        //      {ele.description}
        //     </p>
        //     <div className="flex items-center justify-between mt-4">
        //       <div>
        //         <a href="#" className="text-lg font-medium text-white dark:text-gray-300 hover:underline hover:text-gray-500">
        //           John snow
        //         </a>
        //         <p className="text-sm text-white dark:text-gray-400">{ formatDistanceToNow(ele.createdAt, { addSuffix: true })}</p>
        //       </div>
        //       <a href="#" className="inline-block text-blue-500 underline hover:text-blue-400">Read more</a>
        //     </div>
        //   </div>
        // </div>
        return <div key={ele._id} className="w-[60%] relative mt-3 bg-blue-300 rounded-lg shadow-md">

          <div className='iconsBox absolute z-10 right-6 top-3 flex flex-col justify-center text-center'>
          <span className='flex justify-center'><FaHeart onClick={()=>handleLikes(ele._id)} color={ele.likes.includes(userStore.user._id)? 'red':''} size={30} /> <sub>{ele.likes.length}</sub> </span>
          <p>likes</p>
          <GoCommentDiscussion onClick={()=>commentClicked(ele)} size={30} className='mt-3 mx-auto'/>
          <p>comments</p>
          </div>

          <div className="mt-4">
      <div className="flex items-center">
        <div className="flex items-center ms-5">
          <img className="object-cover w-10 h-10 rounded-full" src={ele.userId.profilePic} alt="Avatar" />
          <a href="#" className="mx-2 font-semibold text-black dark:text-gray-200" tabIndex={0} role="link">{ele.userId.name}</a>
        </div>
        <span className="mx-1 text-xs text-black dark:text-gray-300">{ formatDistanceToNow(ele.createdAt, { addSuffix: true })}</span>
      </div>
    </div>

         

<Swiper
      spaceBetween={50}
      slidesPerView={1}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
    >
     
      
      {ele.file.map((data)=>{
        return <SwiperSlide>
           {data.resource_type==='image'? <img className="object-contain w-full h-64" src={data.url} alt="" /> : <video className="object-contain w-[80%] mx-auto h-64" src={data.url}></video>}
         </SwiperSlide>

          })}
      
    </Swiper>

  <div className="p-6">
    <div>
      <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">Product</span>
      <a href="#" className="block mt-2 text-xl font-semibold  transition-colors duration-300 transform dark:text-white text-black hover:text-gray-600 hover:underline" tabIndex={0} role="link">{ele.title}</a>
      <p className="mt-2 text-sm text-black dark:text-gray-400">{ele.description}</p>
    </div>
   
  </div>
  
  <div className='flex items-center gap-2 my-3 mx-5'>
        <img className=' w-10 h-10 rounded-full' src={userStore.user.profilePic} alt="" />
        <input value={commentValue} onChange={handleCommentChanger} type="text" className=' w-full outline-none border-2 border-gray-900 px-4 py-2 rounded-md' placeholder='enter the comments' />
        <button onClick={()=>handleCommentSubmit(ele._id)}><IoSend color='red' size={25}/></button>
        </div>

</div>

        })
      }
      
    </div>
  </div>
</section>
       </div>
       <div>
          <Modal title="Comments" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       <div className="max-w-xl mx-auto p-4 bg-white rounded-2xl shadow-md">
       
      {/* <h2 className="text-xl font-semibold mb-4">Comments</h2> 

       <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="3"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Post Comment
        </button>
      </form> */}



      <div className="space-y-4">
        {selectedPost?.comments?.map((obj) => (
          <div
            key={obj._id}
            className="border p-3 rounded-lg bg-gray-50 shadow-sm"
          >
            <img src={obj.user.profilePic} className='w-7 h-7 rounded-full mr-5' alt="" />
            <p className="font-medium">{obj.user.name}</p>
            <p className="text-gray-700">{obj.text}</p>
          </div>
        ))}
      </div>
    </div>
      </Modal>
          </div>
      </div>
    </div>
    
  )
}

export default Home
