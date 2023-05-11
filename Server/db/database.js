import { config } from '../config.js'
import SQ from 'sequelize'

const {host ,user, password, database } = config.db

export const sequelize = new SQ.Sequelize(database,user,password,{
    host,
    dialect:'mysql',
    logging:false,
    timezone:"Asia/Tokyo"
})

//logging : 로그기록을 남길지 여부
//dialect : DB종류
