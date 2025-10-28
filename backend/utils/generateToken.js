// FILE: backend/utils/generateToken.js

const jwt = require('jsonwebtoken');

// NOTE: We need to install the 'jsonwebtoken' library next!

const generateToken = (id) => {
    // Uses the secret key from the .env file (JWT_SECRET) to sign the token
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d', // Token expires in 1 day (standard security practice)
    });
};

module.exports = generateToken;