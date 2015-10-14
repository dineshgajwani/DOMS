var faker = require('faker');
var bcrypt = require('bcrypt-nodejs');

var users = [];

var mysql = require('mysql');
var details = require('./details');

var connection = mysql.createConnection(details.connection);

connection.query('USE ' + details.database);

for (var i = 0; i < 10; i++) {
  var newUser = {};
  newUser.username = faker.internet.userName();
  newUser.password = bcrypt.hashSync("12345", null, null)
  newUser.storename = faker.company.companyName();
  newUser.storeemail = faker.internet.email();
  newUser.storephone = faker.phone.phoneNumber();
  newUser.storephone = newUser.storephone.substring(0,11).replace(/[^0-9]/g, "");
  newUser.storeaddress = faker.address.streetAddress();
  users.push(newUser);
  console.log(newUser);
  var insertUser = "INSERT INTO users ( username, password, storename, storeemail, storephone, storeaddress) values (?,?,?,?,?,?)";

  connection.query(insertUser, [newUser.username, newUser.password, newUser.storename, newUser.storeemail, newUser.storephone, newUser.storeaddress], function (err, rows) {
    if (err) {console.log(err);}
    console.log(rows);
    //newUser.id = rows.insertId;
    //return done(null, newUser);
  });
}

connection.end();
