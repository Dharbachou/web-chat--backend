require('dotenv').config()

module.exports.app = {
    key: process.env.APP_KEY,
    port: process.env.APP_PORT,
    url: process.env.APP_URL
};

module.exports.db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD
};