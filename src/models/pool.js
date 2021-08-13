import { Pool } from 'pg';
import { dbHostName,dbUser,dbName,dbPort,userPassword } from '../../config'
 const pool = new Pool({
    user:dbUser,
    host:dbHostName,
    database:dbName,
    password:userPassword,
    port:dbPort
})

export default pool;