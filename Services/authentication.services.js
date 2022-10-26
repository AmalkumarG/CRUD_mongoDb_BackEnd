const mongoDB=require("../Services/MongoDb.services")
const mongoConfig=require("../confif")

const registerUser=async(user)=>{
    if(!user.username || !user.email || !user.password){
    return{
        status:false,message:"all fields are required"
    }}
    try{
    let userObject={
        username:user.username,
        email:user.email,
        password:user.password
    }
    let users=await mongoDB.db.collection(mongoConfig.mongoConfig.collections.Users).insertOne(userObject)
    console.log(users.acknowledged);
    return((users.acknowledged==true && users.insertedId) )? {
        status:true,message:"registration successfull"
    }:{
        status:false,message:"registration unsuccessfull"
    }

}
        catch(error){
            return{status:false,message:"userexist"}
        }
}
const userExist=async(query)=>{
    let messages={
        email:"this mail is already used",
        username:"user name taken"
    }
    try{
        let user=await mongoDB.db.collection(mongoConfig.mongoConfig.collections.Users).findOne(query);
        console.log("abcd","user");
        return (!user?
            {status:true,message:'not taken'}:
            {status:false,message:"taken "})
        
        
    }
    catch{

    }
}
const login=async(user)=>{
    try{
        let userdat=await mongoDB.db.collection(mongoConfig.mongoConfig.collections.Users).findOne({username:user.username})
        console.log(userdat);
        if(userdat){
            return(userdat.password==user.password?{status:true,message:"login"}:{status:false,message:"incorrect password"})
        }
        else 
        return{
            status:false,message:"incorrect username"
        }
    
    }   
    catch(err){
        console.log("error=",err);
    }
}
const change=async(user)=>{
    try{
        let update=await mongoDB.db.collection(mongoConfig.mongoConfig.collections.Users).findOneAndUpdate({username:user.username},{$set:{
            username:user.changeusername
        }})
        console.log(update);
        if(update.lastErrorObject.n==1){
            return{status:true,message:"updated"}

        }
        else return{status:false,message:"cant update"}
    }
    catch(error){
        return{status:false,message:"user already exist"}
    }

} 

const deleteuser=async(user)=>{
    try{
        let deleteRes=await mongoDB.db.collection(mongoConfig.mongoConfig.collections.Users).deleteOne({
            username:user.username
        })
        if(deleteRes.acknowledged && deleteRes.deletedCount==1 )
            return{status:true,message:"deleted"}
        else
            return{
                status:false,message:"user not found"
            }
    }
    catch(err){
        console.log(err);

    }
}

module.exports={registerUser,userExist,change,login,deleteuser}