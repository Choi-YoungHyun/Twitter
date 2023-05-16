import { config } from '../config.js'
import Mongoose, { Schema } from 'mongoose';

export async function connectDB(){
    return Mongoose.connect(config.db.host)
}

export function userVirtualId(schema){
    schema.virtual('id')        
    .get(function(){return this._id.toString()});
    schema.set('toJSON',{virtuals:true})
    schema.set('toObject',{virtuals:true})
}

 //가상속성

export function getUsers(){
    return db.collection('users')
}

export function getTweets(){
    return db.collection('tweets')
}

