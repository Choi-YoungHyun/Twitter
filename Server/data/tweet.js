import MongDb from 'mongodb'
import { getTweet } from '../controller/tweet.js';
import { getTweets } from '../db/database.js';
import * as UserRepository from './auth.js';

const ObjectID = MongDb.ObjectId;
console.log(ObjectID)




export async function getAll() {
    return getTweets()
    .find()
    .sort({createAt: -1})
    .toArray()
    .then(mapTweets)
    // return getTweets().find().toArray()
}

export async function getAllByUsername(username) {
    return getTweets()
    .find({username:username})
    .sort({createAt: -1})
    .toArray()
    .then(mapTweets)
};

export async function getById(id) {
    return getTweets()
    .find({_id:new ObjectID(id)})
    .next()
    .then(mapOptionalTweet);
}

export async function create(text, userId) {
    return UserRepository.findById(userId)
    .then((user)=>getTweets().insertOne({
        text,
        createAt: new Date(),
        userId,
        name:user.name,
        username:user.username,
        url:user.url
    }))
    .then((result)=>console.log(result)).then(mapOptionalTweet)
}

export async function update(id,text) {
    return  getTweets().findOneAndUpdate(
        {_id:new ObjectID(id)},
        {$set: {text} },
        {returnOriginal: false}
    ).then((result)=>result.value).then(mapOptionalTweet)
}

export async function remove(id) {
    return getTweets().deleteOne({_id: new ObjectID(id)})
}


function mapOptionalTweet(tweet){
    return tweet ? {...tweet, id:tweet._id.toString()} : tweet
}


function mapTweets(tweets){
    return tweets.map(mapOptionalTweet)
}