const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "164.90.183.141",
  user: "abdelwaheb",
  port: 5300,
  password: "$pass02031947KT",
  database: "abdelwaheb_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = { connection };
