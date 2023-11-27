import React from 'react'
import appwriteService from "../appWrite/config.js"
import { Link } from 'react-router-dom'
import ownerIcon from '../assets/images/leader.png'
import { useSelector } from "react-redux";


function PostCard({$id, title, image, userId}) {
  const [img, setImg] = React.useState(null)

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = userId && userData ? userId === userData.data.$id : false;

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
      <div className="w-full bg-gray-100 rounded-xl p-4">
          {isAuthor && (
            <div className="flex justify-between bg-slate-300 w-10">
            <div className="flex p-1">
              <img src={ownerIcon} alt="owner" title='Owner' className='w-6 h-6' />
            </div>
          </div>
          )}
         <div className="w-full justify-center mb-4">
            <img src={img} alt={title} className='rounded-xl' />
         </div>
         <h2 className='text-xl font-bold'
         >{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard