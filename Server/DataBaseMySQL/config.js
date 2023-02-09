const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "157.230.27.218",
  port: "5300",
  user: "abdelwaheb",
  password: "$pass02031947KT",
  database: "abdelwaheb_db",
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

module.exports = {connection};