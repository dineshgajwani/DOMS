var LocalStartegy = require('passport-local').Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var details = require('../database/details');

var connection = mysql.createConnection(details.connection);

connection.query('USE ' + details.database);

module.exports = function(passport) {

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    connection.query("SELECT * FROM users WHERE id = ? ",[id], function (err, rows) {
      done(err, rows[0]);
    });
  });

  passport.use('local-signup',
    new LocalStartegy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, username, password, done) {
      connection.query("SELECT * FROM users WHERE username = ?",[username], function (err, rows) {
        if (err) { return done(err);}
        if (rows.length) {
          return done(null, false, req.flash('signupMessage', 'The username is already taken'));
        } else {
            var newUser = {
              username: username,
              password: bcrypt.hashSync(password, null, null)
            };

            var insertUser = "INSERT INTO users ( username, password ) values (?,?)";

            connection.query(insertUser, [newUser.username, newUser.password], function (err, rows) {
              newUser.id = rows.insertId;
              return done(null, newUser);
            });
        }
      });
    }));

    passport.use('local-login',
      new LocalStartegy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
      },
      function (req, username, password, done) {
        connection.query("SELECT * FROM users WHERE username = ?",[username], function (err, rows) {
          if(err) {return done(err);}
          if(!rows.length) {
            return done(null, false, req.flash('loginMessage', 'No user found'));
          }

          if(!bcrypt.compareSync(password, rows[0].password)) {
            return done(null, false, req.flash('loginMessage', 'Password incorrect'));
          }

          return done(null, rows[0]);
        });
      }
    ));
};
