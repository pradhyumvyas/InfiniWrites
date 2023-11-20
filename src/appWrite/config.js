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
         console.log("createPost -- Error");
      }
   }

   async updatePost({title, slug, content, image, status, userId}){
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
         console.log("updatePost -- Error");
      }
   }

   async deletePost(slug){
      try {
         return await this.databases.deleteDocument(conf.appWriteDatabaseID, conf.appWriteCollectionID, slug)
      } catch (error) {
         console.log("deletePost -- Error");
      }
   }
   async getPost(slug){
      try {
         return await this.databases.deleteDocument(conf.appWriteDatabaseID, conf.appWriteCollectionID, slug)
      } catch (error) {
         console.log("getPost -- Error");
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
         console.log("getPosts -- error");         
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
         console.log("uploadFile -- error");         
         throw error
      }
   }

   async deleteFile(file){
      try {
          await this.storage.deleteFile(
            conf.appWriteBucketID, 
            file);
            return true;
      } catch (error) {
         console.log("deleteFile -- error");         
         throw error
      }
   }
   async getFilePreview(file){
      try {
         return this.storage.getFilePreview(conf.appWriteBucketID, file)  
      } catch (error) {
         console.log("getFilePreview -- error");         
      }
   }
}

const service = new Service();
export default service;