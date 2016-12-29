var passport = require('passport');

LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
  passport.use(use LocalStrategy({
    userNameField: 'username',
    passwordField: 'password'
  },

  function(username, password, done){
    var user = {
      username: username,
      password: password
    };
    done(null, user);
  }));
}
