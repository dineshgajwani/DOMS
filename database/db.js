var mysql = require('mysql');
var details = require('./details');

var connection = mysql.createConnection(details.connection);

connection.query('DROP DATABASE ' + details.database);
connection.query('CREATE DATABASE ' + details.database);

console.log("Database Created");

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

console.log("Store Owner Table Created");

connection.query('\
CREATE TABLE `' + details.database + '`.`' + details.driver_table + '` ( \
    `did` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(20) NOT NULL  DEFAULT "abc", \
    `password` CHAR(60) NOT NULL  DEFAULT "123", \
    `name` VARCHAR(20) NOT NULL, \
    `address` CHAR(60) NOT NULL, \
    `email` VARCHAR(50) NOT NULL, \
    `phone` VARCHAR(20) NOT NULL, \
        PRIMARY KEY (`did`), \
    UNIQUE INDEX `id_UNIQUE` (`did` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
)');

console.log("Driver Table Created");

connection.query('CREATE TABLE `' + details.database + '`.`' + details.orders_table + '` (\
    `oid` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `description` VARCHAR(20) NOT NULL, \
    `status` CHAR(60) NOT NULL  DEFAULT "123", \
    `tip` VARCHAR(20) NOT NULL, \
    `feedback` VARCHAR(20) NOT NULL, \
    `price` VARCHAR(20) NOT NULL, \
    `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \
    `address` CHAR(60) NOT NULL, \
    `did` INT UNSIGNED NOT NULL, \
    `id` INT UNSIGNED NOT NULL , \
    PRIMARY KEY (`oid`), \
    FOREIGN KEY (`did`) REFERENCES doms.driver(did) ON DELETE CASCADE, \
    FOREIGN KEY (`id`) REFERENCES doms.users(id) ON DELETE CASCADE)'
);

console.log("Order Table Created");

connection.end();
