import React,{useState} from 'react'
import { Button, Modal } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux'

const Sidebar = () => {

  const [loading, setloading] = useState(false);

    let userStore = useSelector((state)=>state.user)
    console.log(userStore)

    //***********MODLE OPEN part start here **********/
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
      
      //**************Form Details part start here***********/
      const [formDetails, setformDetails] = useState({
        title:'',
        description:'',
        file:[]
      });
      console.log(formDetails)

      const handleInputChanger = (e)=>{
        // console.log(e.target.name)//title
        // console.log(e.target.value)//a
        setformDetails({...formDetails,[e.target.name]:e.target.value})
       
      }
      const handleFileChanger = (e)=>{
        let files = e.target.files;
        let filesArr = [...files]
        // console.log(filesArr)
    
        setformDetails({...formDetails,file:filesArr})
        
      }
      //using fileReader
      // const handleSubmit =async (e)=>{
      //   e.preventDefault()
    
      //   function covertInString(fileobj){
      //     return new Promise((resolve,reject)=>{
      //       let reader = new FileReader();
      //       reader.readAsDataURL(fileobj)
      //       reader.onload= ()=>{
      //         resolve(reader.result)
      //       }
      //       reader.onerror=()=>{
      //         reject(reader.error)
      //       }
      //     })
      //   }
    
      //   let arr = formDetails.file.map((fileobj)=>{     // [promise,promise]
      //     let x = covertInString(fileobj)
      //     return x
      //   })
    
      //   let StringArr = await Promise.all(arr).then((ans)=>ans)
      //   // console.log(StringArr)  //[string,string]
    
      //   let finalArr = StringArr.map((string)=>{
      //     let obj = {};
      //     if(string.split('/')[0].split(':')[1]==='image'){
      //      obj.resource_type="image",
      //      obj.url=string
      //     }
      //     else{
      //      obj.resource_type="video",
      //      obj.url=string
      //     }
          
      //     return obj
      //   })
       
      //   // console.log(finalArr)
    
      //   let finalobj = {
      //     title:formDetails.title,
      //     description:formDetails.description,
      //     file:finalArr
      //   }
    
      //   console.log(finalobj)
    
      //   let res = await axios.post('http://localhost:8080/posts/create',finalobj,{
      //     headers:{
      //       'Authorization':userStore.token
      //     }
      //   });
      //   let data = res.data;
      //   console.log(data)
      //   if(data.success===true){
      //     setformDetails({
      //       title:'',
      //       description:'',
      //       file:[]
      //     })
      //     setIsModalOpen(false);
      //     props.getAllUserPost()
      //   }
    
      // }

      //using cloudunary
      const handleSubmit =async (e)=>{
        e.preventDefault()

        setloading(true)
        
        let arr = formDetails.file.map((fileobj)=>{     // [promise,promise]
          // let x = covertInString(fileobj)
          // return x
          let formData = new FormData();
          formData.append('file',fileobj)
          formData.append('upload_preset','BlogApp')
            let res1 = axios.post(`https://api.cloudinary.com/v1_1/dbdiloyej/upload`,formData)//dbdiloyej is your cloudinary name
            return res1
        })
    
        let StringArr = await Promise.all(arr).then((ans)=>ans)
        console.log(StringArr)  //[string,string]

        let finalArr = StringArr.map((item)=>{
          let obj = {};
          obj.url = item.data.secure_url;
          obj.resource_type = item.data.resource_type
          return obj
        })

        console.log(finalArr)
    
        let finalobj = {
          title:formDetails.title,
          description:formDetails.description,
          file:finalArr
        }
    
        // console.log(finalobj)
    
        let res = await axios.post('https://blogapp-jtdv.onrender.com/posts/create',finalobj,{
          headers:{
            'Authorization':userStore.token
          }
        });
        let data = res.data;
        console.log(data)
        if(data.success===true){
          setformDetails({
            title:'',
            description:'',
            file:[]
          })
          setIsModalOpen(false);
          props.getAllUserPost()

          setloading(false)
        }
    
      }

  return (
    <div className='fixed left-0 top-[80px]'>
       <div>
          {/* <button  className='bg-green-400 px-3 py-2 rounded-md'>Create</button> */}
          <Button type="primary" onClick={showModal}>
        Create
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       { loading===true?"loading...":  <form action=""  className='flex flex-col'>
          <label className='mb-2' htmlFor="">Title</label>
          <input value={formDetails.title} name='title' onChange={handleInputChanger} className='outline-none my-2 border border-gray-400 px-4 py-2 rounded-md ' type="text" />
          <label className='mb-2' htmlFor="">Description</label>
          <textarea value={formDetails.description} name='description' onChange={handleInputChanger}  className='outline-none my-2 border border-gray-400 px-4 py-2 rounded-md ' id=""></textarea>
          <label className='mb-2 px-4 py-2 bg-amber-800 w-max text-white rounded-md hover:bg-amber-700' htmlFor="file">Image/Video</label>
          <input multiple onChange={handleFileChanger} id='file' hidden className='outline-none my-2 border border-gray-400 px-4 py-2 rounded-md ' type="file" />
          <div className='flex gap-5 justify-center'>
            {
              formDetails.file.map((ele,i)=>{
                return ele.type.split('/')[0] ==='image'? <img key={i} className='h-32 w-32' src={URL.createObjectURL(ele)} alt="" />:<video key={i} controls className='h-32 w-32' src={URL.createObjectURL(ele)}></video>
              })
            }
          </div>
          <button onClick={handleSubmit} className='px-4 py-2 bg-sky-950 text-white rounded-md hover:bg-sky-700'>Submit Post</button>
        </form>}
      </Modal>
        </div>
    </div>
  )
}

export default Sidebar
