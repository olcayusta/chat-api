import pool from '../db'

class MessageService {
    async saveMessage(message: string) {
        const {rows} = await pool.query(`INSERT INTO message (content, "userId", "roomId")
                                         VALUES ($1, $2, $3)
                                         RETURNING *`, [message, 1, 1])
        return rows[0]
    }

    async getAllMessages() {
        const {rows} = await pool.query(`SELECT id,
                                                content,
                                                "creationTime",
                                                (SELECT row_to_json(u) AS "user" FROM "user" u WHERE m."userId" = u.id)
                                         FROM message m`)
        return rows
    }
}

export const messageService = new MessageService()
