const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin",
    email: "gialamhuynh3004@gmail.com",
    password: bcrypt.hashSync("lamdeptrai ", 10),
    isAdmin: true,
  },
  {
    name: "Dugn CHu ",
    email: "dugnchu@gmail.com",
    password: bcrypt.hashSync("dungchode ", 10),
    isAdmin: false,
  },
  {
    name: "Bu ",
    email: "bungu@gmail.com",
    password: bcrypt.hashSync("bubucu ", 10),
    isAdmin: false,
  },
  {
    name: "i am GIa",
    email: "gialam@gmail.com",
    password: bcrypt.hashSync("lamdeptrai ", 10),
    isAdmin: false,
  },
];

module.exports = users;
