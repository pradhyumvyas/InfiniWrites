import React, { useEffect } from 'react'
import {Container, PostForm} from '../index.js'
import appwriteService from "../../appWrite/config.js";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
   const [post, setPost] = React.useState(null)
   const {slug} = useParams()
   const navigate = useNavigate()

   useEffect(() => {
      if(slug){
         appwriteService.getPost(slug)
         .then((post)=>{
            setPost(post)
         })
      }else{
         navigate('/')
      }
   }, [slug, navigate])
  return post?
  <div className="py-8">
       <Container>
         <PostForm post={post} />
       </Container>
  </div>
  :null
}

export default EditPost