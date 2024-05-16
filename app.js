var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const createNamespace = require('cls-hooked').createNamespace;
const userLogin = createNamespace('userLogin');

require('dotenv').config();

var indexRouter = require('./routes/index');
var v1 = require('./routes/api/v1');

const customResponse = require('./middlewares/customResponse');

var app = express();
var allowedOrigins = ['*'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        } return callback(null, true);
    }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(customResponse)
app.use('/', indexRouter);
app.use('/api/v1', v1);

console.log("Running")

module.exports = app;
