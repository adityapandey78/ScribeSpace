const conf={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectID:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseID:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteColletionID:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketID:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf
/**
 * 
 This is the `production grade` practice to have a seperate folder containing all the IDs so 
 //? Call krne me issue na ho and koi bug na aaye 
 */