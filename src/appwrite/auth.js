import conf from '../conf/conf';
import {Client,Account,ID} from "appwrite";

/*
import { Client, Account, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<PROJECT_ID>');                 // Your project ID

const account = new Account(client);

const user = await account.create(
    ID.unique(), 
    'email@example.com', 
    'password'
);
: Ye achhi practice ni hai coz har baar account.create() hme manually dena padega to jo register jo mera component bnega to whn pe hme sb ye expose krna pdega so thoda sa issue aa skta hai so isse better approach hai jo hum use krenge
*/

//? Will make a class now


export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectID);
            this.account= new Account(this.client); //account yhn pe bnaya mene  client bn jaaner ke baad
    }


    /*
    *Normal Method using appwrite
    import { Client, Account, ID } from "appwrite";

    const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<PROJECT_ID>');               // Your project ID

    const account = new Account(client);

    const promise = account.create('[USER_ID]', 'email@example.com', '');
    ? Since account cretaion ke time sbse pehle userId dena hai

    promise.then(function (response) {
    console.log(response); // Success
    }, function (error) {
    console.log(error); // Failure
    });

    */
    //ab yhn pe ek aur construcutre usekrunga jisme mai appwrite ko call karunga 
    // so baad me agar appwrite se shift hona pde to idhr se kr sku rather than appwrite ko directly use krte huye
    //upar promises de ke bnaya hai isliye async await use kr rha hu 

    async createAccount({email, password, name}){
        //kbhi kbhi fail bhi ho skta hai isliye try and catch me bnaya hu me 
        try {
            console.log("Creating account with email:", email);
            const userAccount=await this.account.create(ID.unique(),email,password,name) 
            //since UserID is compulsory 

            if(userAccount){
                 //return userAccount; //iski jegeh seedhe login kra denge

                //call another method
                console.log("Account Created attempting login:");
                
                return this.login({email,password});

            }else{
                console.log("Returing User Acoount",userAccount);
                
                return userAccount;
            }
        } catch (error) {
            console.log("Not able to create account",error.message);
            alert("Not able to create account")
            throw error;
        }
    }
    //after account creation login 
    async login({email,password}){
        try {
            console.log('Attempting login with',email,password);
            
            return await this.account.createEmailPasswordSession(email,password);//doc se dekha
        } catch (error) {
            console.log("Issue with logging in",error.message)
            throw error;
        }
        console.log(import.meta.env.VITE_APPWRITE_URL);
         
    }

    //getting the statust of the current user if he's logged in or not
    async getCurrentUser(){
        //console.log(import.meta.env.VITE_APPWRITE_URL);
        
        try {
            return await this.account.get(); //Get the currently logged in user.
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            
        }
        return null;
    }
    
    //logout session
    //https://appwrite.io/docs/references/cloud/server-nodejs/account#deleteSessions
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}
//ab class bnaya hai toh object bnana pdega ek jo jisme class ko instantiate kr du 
const authService = new AuthService(); //new object bnaya hai class use krke isse jo class ke andar ke constructure hain use use kr lenge . lga ke 

export default authService