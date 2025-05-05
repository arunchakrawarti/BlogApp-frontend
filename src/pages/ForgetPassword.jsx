import axios from 'axios';
import React, { useRef, useState } from 'react'

const ForgetPassword = () => {
    const [msg, setmsg] = useState('');
    let emailRef = useRef()
    
    const handleSubmit = async()=>{
        let value = emailRef.current.value;
        console.log(value)
        let res = await axios.post('https://blogapp-jtdv.onrender.com/users/resetPassword',{email:value});
        let data = res.data;
        console.log(data)
        setmsg(data.msg)
    }
  return (
    <div className='mt-48 bg-slate-700 px-5 py-3 w-max rounded-md mx-auto'>
        <h1 className='text-3xl mb-4'>{msg}</h1>
        <h1 className='text-white mb-3'>forget password page</h1>
        <input ref={emailRef} type="text" className=' rounded-md px-3 py-2' placeholder='enter youn email' />
        <button onClick={handleSubmit} className='bg-green-950 text-white rounded-md px-3 py-2 ml-5'>submit</button>
    </div>
  )
}

export default ForgetPassword
