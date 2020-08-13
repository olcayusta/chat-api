import {Pool} from 'pg'

const pool = new Pool({
    database: 'chat',
    user: 'postgres',
    password: '123456'
})

export default pool
