var jwt = require("jsonwebtoken");

var data = { username: "tinycloset" };
var token = jwt.sign(data, "puonguyen");

var tokenVerify = jwt.verify(token, "puonguyen");

console.log(token);
