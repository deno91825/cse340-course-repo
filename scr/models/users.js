import pool from "./db.js";
import bcrypt from "bcrypt";
import db from "./db.js";

export async function createUser(name, email, passwordHash) {
    const sql = `
        INSERT INTO users
        (name, email, password_hash, role_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    const values = [
        name,
        email,
        passwordHash,
        1
    ];

    const result = await pool.query(sql, values);

    return result.rows[0];
}

const findUserByEmail = async (email) => {
    const query = `
        SELECT user_id, name, email, password_hash, role_id
        FROM users
        WHERE email = $1
    `;

    const queryParams = [email];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {

    const user = await findUserByEmail(email);

    if (!user) {
        return null;
    }

    const passwordMatch = await verifyPassword(
        password,
        user.password_hash
    );

    if (!passwordMatch) {
        return null;
    }

    delete user.password_hash;

    return user;
};

export {
    authenticateUser
};