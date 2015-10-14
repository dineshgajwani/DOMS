// var knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host: 'localhost',
//     user: 'root',
//     password: 'manchesterisred',
//     database: 'doms',
//     charset: 'UTF8_GENERAL_CI'
//   }
// });
//
// var bookshelf = require('bookshelf')(knex);
//
// module.exports = bookshelf;

var mysql = require('mysql');
var details = require('./details');

var connection = mysql.createConnection(details.connection);

connection.query('DROP DATABASE ' + details.database);
connection.query('CREATE DATABASE ' + details.database);

connection.query('\
CREATE TABLE `' + details.database + '`.`' + details.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
    `storename` VARCHAR(50) NOT NULL, \
    `storeemail` VARCHAR(50) NOT NULL, \
    `storephone` VARCHAR(10) NOT NULL, \
    `storeaddress` VARCHAR(50) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
)');

console.log("Database Created");

connection.end();
