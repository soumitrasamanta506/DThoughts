import {Client, Databases, Storage, ID, Query} from "appwrite";
import conf from "../conf/conf";

class service{
    client;
    databases;
    storage;

    constructor(){
        this.client = new Client()
                        .setEndpoint(conf.endPointUrl)
                        .setProject(conf.projectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, fileId: image, content, userId}){
        try{
            const document = await this.databases.createDocument(
                conf.databaseId,
                conf.collectionId,
                ID.unique(),
                {
                    title,
                    image,
                    content,
                    userId
                }
            );
            return document;
        }
        catch(error){
            console.log(`appwrite :: service :: ${error.message}`);
            return null;
        }
    }
    async updatePost(documentId, {title, image, content}){
        try{
            return await this.databases.updateDocument(
                conf.databaseId,
                conf.collectionId,
                documentId,
                {
                    title,
                    image,
                    content
                }
            )
        }
        catch(error){
            console.log(`appwrite :: service :: ${error.message}`);
        }
    }
    async getPost(documentId){
        try{
            const document = await this.databases.getDocument(
                conf.databaseId,
                conf.collectionId,
                documentId
            );
            return document;
        }
        catch(error){
            console.log(`appwrite :: service :: ${error.message}`);
            return null;
        }
    }
    async getAllPost(){
        try{
            const documents = await this.databases.listDocuments(
                conf.databaseId,
                conf.collectionId,
                [
                    Query.orderDesc("$createdAt")
                ]
            );
            return documents;
        }
        catch(error){
            console.log(`appwrite :: service :: ${error.message}`);
            return [];
        }

    }
    async deletePost(documentId){
        try{
            return await this.databases.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                documentId
            )
        }
        catch(error){
            console.log(`appwrite :: service :: ${error.message}`);
            return false;
        }
    }

    async uploadFile(fileData){
        try{
            const fileInformation = await this.storage.createFile(
                conf.bucketId,
                ID.unique(),
                fileData
            );
            return fileInformation;
        }
        catch(error){
            console.log(`appwrite :: service :: ${error.message}`);
            return null;
        }
    }
    async getFilePreview(fileId){
        try{
            return await this.storage.getFilePreview(
                conf.bucketId,
                fileId
            );
        }
        catch(error){
            console.log(`appwrite :: service :: ${error.message}`);
        }
    }
    async deleteFile(fileId){
        try{
            return await this.storage.deleteFile(
                conf.bucketId,
                fileId
            );
        }
        catch(error){
            console.log(`appwrite :: service :: ${error.message}`);
            return false;
        }
    }
};

const appwriteService = new service();

export default appwriteService;