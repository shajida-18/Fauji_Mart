const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "shajida@virat18",
  database: "projectFauji",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
