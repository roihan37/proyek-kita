
const { getDatabase } = require("../config/mongoConnection");
const { hash } = require("../helpers/bcryptjs");

class User {
    static getCollection(){
        const db = getDatabase(); // pastikan ini tidak null
  return db.collection("users")
    }

    static async createUser(user){
        return this.getCollection().insertOne({
            businessType : user.businessType, 
            companyLocation : user.companyLocation, 
            companyName : user.companyName, 
            name : user.name, 
            email : user.email, 
            phoneNumber : user.phoneNumber, 
            password : hash(user.password)
        })
    }
    
}

module.exports = User