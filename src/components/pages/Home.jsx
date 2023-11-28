import React,{useEffect, useState} from 'react'
import appwriteService from "../../appWrite/config.js"
import {Container, PostCard, isShowLoader, isHideLoader} from '../index.js'

function Home() {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
         isShowLoader();
         appwriteService.getPosts([])
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
      }, [])
     if(posts.length === 0){
      return(
         <div className="w-full py-8 mt-4 text-center">
            <Container>
               <div className="flex flex-wrap">
                  <div className="p-2 w-full">
                     <h1 className="text-2xl font-bold hover:text-gray-500">
                        Login to Read Posts
                     </h1>
                  </div>
               </div>
            </Container>
         </div>
      )
     }
     return(
      <div className="w-full py-8">
         <Container>
            <div className="flex flex-wrap">
               {posts.map((post)=>(
                  <div key={post.$id} className="p-2 w-1/4">
                     <PostCard {...post} />
                  </div>
               ))}
            </div>
         </Container>
      </div>
     )
}

export default Home