import pool from '../db'
import {User} from '../models/user.model'

class UserService {
    async save(displayName: string, picture: string): Promise<User> {
        const {rows} = await pool.query(`INSERT INTO "user" ("displayName", picture)
                                         VALUES ($1, $2)`, [displayName, picture])
        return rows[0]
    }

    async getAllUsers(): Promise<User[]> {
        const {rows} = await pool.query(`SELECT *
                                         FROM "user"`)
        return rows
    }
}

export const userService = new UserService()
