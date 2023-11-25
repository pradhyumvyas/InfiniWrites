import conf from "../conf/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service{
   client = new Client();
   databases;
   storage;

   constructor(){
      this.client
         .setEndpoint(conf.appWriteUrl)
         .setProject(conf.appWriteProjectID)
      this.databases = new Databases(this.client);
      this.storage = new Storage(this.client);
   }

   async createPost({title, slug, content, image, status, userId}){
      try {
         return await this.databases.createDocument(conf.appWriteDatabaseID,conf.appWriteCollectionID, slug, {
            title,
            content,
            image,
            status,
            userId
         })
      } catch (error) {
         console.log("AppWrite:: createPost -- Error");
      }
   }

   async updatePost(slug,{title, content, image, status, userId}){
      try {
         return await this.databases.updateDocument(conf.appWriteDatabaseID,
            conf.appWriteCollectionID, slug, {
            title,
            content,
            image,
            status,
            userId
         })
      } catch (error) {
         console.log("AppWrite:: updatePost -- Error");
      }
   }

   async deletePost(slug){
      try {
         return await this.databases.deleteDocument(conf.appWriteDatabaseID, conf.appWriteCollectionID, slug)
      } catch (error) {
         console.log("AppWrite:: deletePost -- Error");
      }
   }
   
   async getPost(slug){
      try {
         return await this.databases.getDocument(conf.appWriteDatabaseID, conf.appWriteCollectionID, slug)
      } catch (error) {
         console.log("AppWrite:: getPost -- Error");
      }
   }

   
   async getPosts(queries = [Query.equal("status","active")]){   //ADD ENUM VALUE
      try {
         return await this.databases.listDocuments(
            conf.appWriteDatabaseID,
            conf.appWriteCollectionID,
            queries
         )
         
      } catch (error) {
         console.log("AppWrite:: getPosts -- error");         
      }
   }

   async uploadFile(file){
      try {
         return await this.storage.createFile(
            conf.appWriteBucketID,
            ID.unique(),
            file
         )
      } catch (error) {
         console.log("AppWrite:: uploadFile -- error", error);         
         return false
      }
   }

   async deleteFile(file){
      try {
          await this.storage.deleteFile(
            conf.appWriteBucketID, 
            file);
            return true;
      } catch (error) {
         console.log("AppWrite:: deleteFile -- error");         
         throw error
      }
   }
   async getFilePreview(file){
      try {
         const f = this.storage.getFilePreview(conf.appWriteBucketID, file)

         return await f
      } catch (error) {
         console.log("AppWrite:: getFilePreview -- error");         
      }
   }
}

const service = new Service();
export default service;