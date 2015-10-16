var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var details = require('../database/details');

var connection = mysql.createConnection(details.connection);

connection.query('USE ' + details.database);

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

router.use(isLoggedIn);

<<<<<<< HEAD
=======

>>>>>>> 75b66943c1fb6ed905cd99c74391c89cbfabff40
router.route('/orders')
  .get(function (req, res) {
    var data;
    connection.query('SELECT * FROM orders WHERE orders.id = ? ',[req.user.id], function (err, rows) {
      if (err) {throw err;}
      data = rows;
      res.render('orders.ejs', {
        data: data
      });
      console.log(data);
      console.log("ALL ORDERS");
      console.log(req.user.id);
    });
  })
  .post(function (req, res) {
    var order = {
      description: req.body.description,
      tip: req.body.tip,
      price: req.body.price,
      id: req.user.id
    };

    var insertOrder = "INSERT INTO orders ( description, tip, price, id) values (?,?,?,?)";
<<<<<<< HEAD

=======
>>>>>>> 75b66943c1fb6ed905cd99c74391c89cbfabff40
    connection.query(insertOrder, [order.description, order.tip, order.price, order.id], function (err, rows) {
      if (err) {throw err;}
      console.log(rows);
      norder.id = rows.insertId;
      res.redirect('/profile/orders');
    });
  });

  router.route('/orders/:id')
  .get(function (req, res) {
    var id = req.params.id;

    connection.query("SELECT * FROM orders WHERE orders.oid = ? AND orders.id = ?", [id, req.user.id], function (err, rows) {
      if(err) {throw err;}

      console.log(rows);
      res.render('singleOrder.ejs', {
        order: rows[0]
      });
    });
  });

  router.route('/orders/:id/delete')
  .get(function (req, res) {
    connection.query('DELETE FROM orders WHERE orders.oid = ?', [req.params.id], function (err, rows) {
      if(err) {throw err;}
      res.redirect('/profile/orders');
    });
  });

module.exports = router;
