import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

class auth{

    client;
    account;

    constructor(){
        this.client = new Client()
                            .setEndpoint(conf.endPointUrl)
                            .setProject(conf.projectId);
        
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try{
            const user = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            return user;
        }
        catch(error){
            console.log(`appwrite :: auth :: ${error.message}`);
            return false;
        }
    }

    async login({email, password}){
        try{
            const session = await this.account.createEmailPasswordSession(email, password);
            return session;
        }
        catch(error){
            console.log(`appwrite :: auth :: ${error.message}`);
            return null;
        }
    }

    async logout(){
        try{
            const result = await this.account.deleteSession('current');
            if(result)
                return true;
        }
        catch(error){
            console.log(`appwrite :: auth :: ${error.message}`);
            return false;
        }
    }
    async getCurrentUser(){
        try{
            const user = await this.account.get();
            return user;
        }
        catch(error){
            console.log(`appwrite :: auth :: ${error.message}`);
            return null;
        }
    }
};

const authService = new auth();

export default authService;