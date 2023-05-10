
import { db } from '../db/database.js'

// let tweets = [
//     {
//     id:'1',
//     text:'첫 트윗입니다!!',
//     createdAt: Date.now().toString(),
//     userId:'1'
//     },
//     {
//     id:'2',
//     text:'안녕하세요!!',
//     createdAt: Date.now().toString(),
//     userId:'1'
//     }
// ];


//

const SELECT_JOIN = 'select tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw left join users as us on tw.userid = us.id'

const ORDER_DESC = 'ORDER BY tw.createdAt desc'


export async function getAll() {
    return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`)
    .then((result)=>result[0])
}



export async function getAllByUsername(username) {
    return db.execute(`${SELECT_JOIN} where us.username=? ${ORDER_DESC} `,[username])
    .then((result)=>result[0])
}

export async function getById(id) {
    return db.execute(`${SELECT_JOIN} where tw.id=?`,[id])
    .then((result)=>result[0][0])
}

export async function create(text, userId) {
    return db.execute('insert into tweets (text,createdAt,userid) values (?,?,?)',[text,new Date(),userId])
    .then((result)=>console.log(result))
}


export async function update(text,id) {
    return db.execute("update tweets SET text=? where id=?",[text,id]).then(()=>getById(id))
}

export async function remove(id) {
    return db.execute('delete from tweets where id=?',[id])
}

