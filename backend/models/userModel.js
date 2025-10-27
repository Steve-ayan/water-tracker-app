// FILE: backend/models/userModel.js

const { pool } = require('../server'); // Import the database connection pool
const bcrypt = require('bcryptjs');

// Function to find a user by their email (used for login and registration check)
const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0]; // Returns the user object or undefined
};

// Function to create a new user (Registration)
const createUser = async (email, password, first_name) => {
    // Hash the password securely before storing it (Standard Security Practice)
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const query = `
        INSERT INTO users (email, password_hash, first_name)
        VALUES ($1, $2, $3)
        RETURNING user_id, email, first_name, date_joined; // Return safe data
    `;
    const { rows } = await pool.query(query, [email, password_hash, first_name]);
    return rows[0];
};

module.exports = {
    findUserByEmail,
    createUser,
};