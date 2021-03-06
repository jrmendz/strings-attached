const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 3000;


const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.listen(port, '0.0.0.0');

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

var routes = require('./app/routes/approutes'); //importing route
routes(app); //register the route
