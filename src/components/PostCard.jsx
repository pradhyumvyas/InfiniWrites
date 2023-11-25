import React from 'react'
import appwriteService from "../appWrite/config.js"
import { Link } from 'react-router-dom'

function PostCard({$id, title, image}) {
  const [img, setImg] = React.useState(null)

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