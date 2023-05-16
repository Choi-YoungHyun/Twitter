import { userVirtualId } from '../db/database.js';
import Mongoose from 'mongoose';


//db 생성 
//required:true : 반드시 저장해라 
const userSchema = new Mongoose.Schema({ 
    username: { type:String, required:true},
    name: { type:String, required:true},
    email: { type:String, required:true},
    password: { type:String, required:true},
    url: String
})

userVirtualId(userSchema); 

//Users collection 생성(형태는 스키마 형태를 따라서)
const User = Mongoose.model('User',userSchema); 


//objectID는 primary key + auto_increment와 같은 것이 자동으로 들어감

    export async function findByUsername(username){
        return User.findOne({username})
    }

    export async function createUser(user){
        return new User(user).save().then((data)=>data.id)
    }

    export async function findById(id){
        return User.findById(id)

    }
