import React,{useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select, RTE, isShowLoader, isHideLoader} from '../index.js'
import appWriteService from "../../appWrite/config.js"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';



function PostForm({post}) {
   const userData = useSelector((state) => {
      return state.auth.userData
   })

   const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
      defaultValues: {
         title: post?.title || "",
         slug: post?.slug || "",
         content: post?.content || "",
         status: post?.status || "active",
      }
   })
   const navigate = useNavigate()
   const [img, setImg] = React.useState(null)

   const submit = async(data) => {
      isShowLoader();
      if(post){
         const file = data.image[0]?appWriteService.uploadFile(data.image[0]):null

         if(file){
            appWriteService.deleteFile(post.image)
         }
         const dbPost = await appWriteService.updatePost(post.$id,{
            ...data,
            createdBy: userData.data.name,
            image: file ? file.$id :undefined,
         })
         if(dbPost){
            navigate(`/post/${dbPost.$id}`)
         }
      } else{
         
         const file = await appWriteService.uploadFile(data.image[0])

         if(file){
            const fileId = file.$id
            data.image = fileId
            const dbPost = await appWriteService.createPost({
               ...data,
               createdBy: userData.data.name,
               userId: userData?.data?.$id,
            })
            if(dbPost){
               navigate(`/post/${dbPost.$id}`)
            }
         }
      }
      isHideLoader();
   }
   const slugTransform = useCallback((value) => {
      if(value && typeof value === "string"){
         return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
      }
      return '';
   },[])


   
   useEffect(() => {
      const subscription = watch((value, {name}) => {
         if(name === "title"){
            setValue("slug", slugTransform(value.title), {shouldValidate: true})
         }
      })
      if(post){
         appWriteService.getFilePreview(post?.image)
         .then((res) => {
            setImg(res)
         })
      }
      return () => subscription.unsubscribe();
   },[watch, slugTransform, setValue]);
   
  return (
   <form onSubmit={handleSubmit(submit)} className="flex flex-wrap dark:text-slate-400">
      <div className="w-2/3 px-2">
         <Input
           label="Title :"
           placeholder="Title"
           className="mb-4"
           {...register("title", { required: true })}
         />
         <Input
           label="Slug :"
           placeholder="Slug"
           className="mb-4 text-cyan-950"
           {...register("slug", { required: true })}
           onInput={(e) => {
               setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
           }}
         />
         <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
         <Input
           label="Featured Image :"
           type="file"
           className="mb-4"
           accept="image/png, image/jpg, image/jpeg, image/gif"
           {...register("image", { required: !post })}
         />
         {post && (
           <div className="w-full mb-4">
               <img
                   src={img}
                   alt={post.title}
                   className="rounded-lg"
               />
           </div>
         )}
         <Select
           options={["active", "inactive"]}
           label="Status"
           className="mb-4 bg-slate-400"
           {...register("status", { required: true })}
         />
         <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full mt-50">
           {post ? "Update" : "Add"}
         </Button>
      </div>
   </form>
  )
}

export default PostForm