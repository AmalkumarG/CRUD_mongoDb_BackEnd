const {MongoClient}=require("mongodb")
const {mongoConfig}=require("../confif")
class mongoDB{
    static connecttoMongodb=()=>{
        MongoClient.connect(mongoConfig.connectionURL).then((connection)=>{
            console.log("connected");
            this.db=connection.db(mongoConfig.database)
        }).catch((err)=>{
            console.log("not connected",err);
        })
    }
    
}
mongoDB.db=null

module.exports=mongoDB