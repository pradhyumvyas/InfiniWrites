import conf from "../conf/config.js";
import { Client, Account, ID } from "appwrite";
 
export class AuthService {
   client = new Client();
   account;

   constructor(){
      this.client
         .setEndpoint(conf.appWriteUrl)
         .setProject(conf.appWriteProjectID);
      this.account = new Account(this.client);
   }

   async  createAccount({email, password, name}){
      try{
         const userAccount = await this.account.create(ID.unique(), email, password, name);
         if(userAccount){
            // call method to redirect
            return this.loginAccount({email, password})
         }else{
            return userAccount
         }
      }catch(error){
         console.error("Error:- createAccount method");
         throw error;
      }
   }

   async loginAccount({email, password}){
      try{
         return await this.account.createEmailSession(email, password);
      }catch(error){
         console.error("Error:- loginAccount method");
         throw error
      }
   }
   async logoutAccount(){
      try {
         await this.account.deleteSessions();         
      } catch (error) {
         console.error("Error:- logoutAccount method");
         throw error;
      }
   }

   async getCurrentUser(){
      try {
         return await this.account.get();
      } catch (error) {
         console.error("Error:- getCurrentUser method", error);
      }

      return null;
   }
}

const authService = new AuthService();

export default authService;
