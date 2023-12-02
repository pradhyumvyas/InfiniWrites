import React from 'react'
import appwriteService from "../appWrite/config.js"
import { Link } from 'react-router-dom'
import ownerIcon from '../assets/images/leader.png'
import { useSelector } from "react-redux";


function PostCard({$id, title, image, userId}) {
  const [img, setImg] = React.useState(null)

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = userId && userData ? userId === userData.data?.$id : false;

  React.useEffect(() => {
    appwriteService.getFilePreview(image)
    .then((res) => {
      setImg(res)
    })
    .catch((err) => {
      console.log(err)
    })
  })

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-30 dark:bg-slate-500 rounded-xl p-4 ">
         <div className="w-full justify-center mb-4">
            <img src={img} alt={title} className='rounded-xl h-[200px] w-[300px]'/>
         </div>
         <h2 className='text-xl font-bold dark:text-slate-400'
         >{title}</h2>

        {isAuthor && (
            <div className="absolute flex justify-right align-right mt-[-12px] ml-[-13px]">
            <div className="flex p-1">
              <img src={ownerIcon} alt="owner" title='Owner' className='w-6 h-6' />
            </div>
          </div>
          )}
      </div>
    </Link>
  )
}

export default PostCard