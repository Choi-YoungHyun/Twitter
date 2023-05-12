import { getUsers } from '../db/database.js';
import MongoDb from 'mongodb'


//objectID는 primary key + auto_increment와 같은 것이 자동으로 들어감
const ObjectID = MongoDb.ObjectId;

    export async function findByUsername(username){
        return getUsers().find({username})
        .next()
        .then(mapOptionalUser)
    }

    export async function createUser(user){
        return getUsers().insertOne(user)
        .then((result)=>{
            console.log(result)})
    }

    export async function findById(id){
        return getUsers().find({_id:new ObjectID(id)})
        .next()
        .then(mapOptionalUser)
    }

    function mapOptionalUser(user){
        return user ? {...user,id:user._id.toString()} : user
    }