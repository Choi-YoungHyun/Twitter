import mysql from 'mysql2';
import { config } from '../config.js'

const pool = mysql.createPool({
    host:config.db.host,
    user:config.db.user,
    password:config.db.password,
    database:config.db.database
})

export const db = pool.promise();
//비동기처리를 위해 promise까지 넘김