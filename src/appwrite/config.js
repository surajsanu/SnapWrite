import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
       this.databases= new Databases(this.client);
       this.bucket= new Storage(this.client)
       
  }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            const documentId = ID.unique();
            const dbPost =await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
            return dbPost;
        } catch (error) {
            console.log("Appwrite Service :: createPost ::error", error);
        }
    }

    async updatePost(documentId,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: updatePost ::error", error);
        }
    }
    async deletePost(documentId){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId,
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deletePost ::error", error);
            return false;
        }
    }
    async getPost(documentId){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId,
            )
        } catch (error) {
            console.log("Appwrite Service :: getPost ::error", error);
        }
    }
    async getPosts(queries= [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite Service :: getPosts ::error", error);
            return false;
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadFile ::error", error);
            return false;
        }
    }
    async deleteFile(fileId){
          try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true
          } catch (error) {
            console.log("Appwrite Service :: deleteFile ::error", error);
            return false;
          }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

const service = new Service();
export default service;
