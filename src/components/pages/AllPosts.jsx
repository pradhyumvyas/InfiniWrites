import React, {useState, useEffect} from 'react'
import appWriteService from "../../appWrite/config"
import {Container, PostCard, isShowLoader, isHideLoader} from '../index'

function AllPosts() {

   const [posts, setPosts] = useState([])

   useEffect(() => {
      isShowLoader();
       appWriteService.getPosts([])
       .then((res) => {
          if(res){
            setPosts(res.documents)
          }
       })
       .catch((err) => {
          console.log(err)
       })
       .finally(() => {
          isHideLoader();
       })
    },[])
  return (
    <div className='w-full py-8'>
      <Container>
         <div className="flex flex-wrap">
            {posts.map((post)=>(
               <div key={post.$id} className="p-2 w-1/4">
                  <PostCard {...post} />
                  {console.log("PostCard", post)}
               </div>
            ))}
         </div>
      </Container>
    </div>
  )
}

export default AllPosts