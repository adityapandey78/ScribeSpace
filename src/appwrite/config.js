import conf from '../conf/conf';
import {Client,ID,Databases,Storage,Query, Account} from "appwrite";
// https://appwrite.io/docs/references/cloud/client-web/databases Database DOCs
//https://appwrite.io/docs/products/storage/quick-start storage DOCs
export class Service{
    client= new Client();
    databases;
    bucket; //bucket matbl storage hi hai
    account; // Add account property

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);
            this.databases =new Databases(this.client);
            this.bucket= new  Storage(this.client);
            this.account = new Account(this.client); // Initialize account service
    }

    //*Post Upload service
    //Create post method
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteColletionID,
                ID.unique(),
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: Create Post:: error", error.message);
        }
    }

    //Update post Method
    //update doc me Document ID bhi dena hai so for the ease mene slug ko alag rakha hai
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteColletionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: Update Post:: error", error);
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteColletionID,
                slug, 
                console.log("Deleted the file")
                
            )
            return true; //delete ho gya hai bhai
        } catch (error) {
            console.log("Appwrite services :: Delete Post :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteColletionID,
                slug
            )
        } catch (error) {
            console.log("Appwrite Serivce :: getPost:: error", error);
            return false;
        }
    }
    //to get all the posts
    //idhjr queries use krenge taaki jo document activehain unhee hi lu me
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            console.log("Fetching posts with queries:", queries); // Debug log
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteColletionID,
                queries
            );
            console.log("Posts response:", response); // Debug log
            return response;
        } catch (error) {
            console.error("Appwrite Services :: getPosts :: error", error);
            return { documents: [] }; // Return empty array instead of false
        }
    }

    //*file upload service

    //https://appwrite.io/docs/products/storage/upload-download

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
            console.log("Upload file is  trying to upload the file")
        } catch (error) {
            console.log("Appwrite Services :: uploadFile():: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId,
            )
            return true;
        } catch (error) {
            console.log("Appwrite Services :: deletFile()::  error",error);
            return false;
        }
    }

    async getFileView(fileId) {
        try {
            const result= this.bucket.getFileView(
                conf.appwriteBucketID,
                fileId);
        return result.href;
              
        } catch (error) {
            console.log("Appwrite Services :: getFileView():: error", error);
            return '';
        }
    }

    async getUser(userId) {
        try {
            // Use databases to get user document instead of account
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                'users', // You need to create a users collection in your database
                userId
            );
        } catch (error) {
            console.log("Appwrite service :: getUser :: error", error);
            return null;
        }
    }
}

const service = new Service()
export default service //appwriteServices