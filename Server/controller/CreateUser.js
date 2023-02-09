const { connection } = require("../DataBaseMySQL/config");
const crypto = require("crypto");
const middleware = require("../middelwer/auth");
const utils = require("../middelwer/util");
const session = require("./session");
// const emailCheck = require("email-regex");
const geoip=require('geoip-lite')
// function validatephoneNumber() {
//   const PhoneNumberPattern = /^\d{10}$/;
//   return PhoneNumberPattern.test(PhoneNumber);
// }
module.exports = {
  CreateStudent: (req, res) => {
    console.log(req.body)
 
    var lastAtPos = req.body.email.lastIndexOf("@");
    var lastDotPos = req.body.email.lastIndexOf(".");
    var passwordHashed = crypto
      .createHash("sha256")
      .update(req.body.password, "utf8")
      .digest("hex");
    var query = `SELECT * from user where email="${req.body.email}"`
    connection.query(query,(err, results) => {
      if (err) {
        res.status(500).send(err);
      } else if (results.length > 0 && results[0].email === req.body.email) {
        res.status(200).send("user exist");
      } else if (!results.length && results === undefined) {
        res.status(202).send("chek somthing went wrong!");
      } else if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          req.body.email.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          req.body.email.length - lastDotPos > 2
        )
      ) {
        res.status(405).send("email is not the corect format");
      }  else {
        var query = `INSERT INTO user(username,email,phone_number,password,photo) VALUES("${req.body.username}","${req.body.email}","${req.body.phone_number}","${passwordHashed}","${req.body.photo}")`
        connection.query(query,(err, results) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send("user has been created");
          }
        });
      }
    });
  },

  VerifyStudent: (req, res) => {
    var passwordHashed = crypto
      .createHash("sha256")
      .update(req.body.password, "utf8")
      .digest("hex");

    // var repeatepasswordHshed=crypto.createHash('sha256').update(req.body.repeatepassword, 'utf8').digest('hex')
    const query = `SELECT * from user where email="${req.body.email}"`;
    connection.query(query, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else if (results.length > 0 && results[0].password === passwordHashed) {
        var session = utils.RandomString(32);
        middleware.CreateSession(req, res, results[0].user_id, session);
      } else if (
        results.length === 0 ||
        results[0].Password !== passwordHashed
      ) {
        res.status(200).send("somthing went wrong");
      } else {
        res.status(404).send("not fund");
      }
    });
  },
  logout: (req, res) => {
    session
      .delete(req.cookies.noja)
      .then((result) => {
        res.status(200).send("user loget out");
      })
      .catch((err) => {
        res.status(500).send("server err");
      });
  }
};