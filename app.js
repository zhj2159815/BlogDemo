var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var looger = require('morgan');
var CFG = require('./config');
var routes = require('./routes');
var mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/test';
const db = mongoose.connect(dbUrl);

mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
});

var session = require('express-session');

var app = express();
app.use(favicon());
app.use(looger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// 允许跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("X-Powered-By", ' 3.2.1')

    if (req.method === "OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});

// app.use((err, req, res, next) => {
//     res.locals.message = err.message;
//     res.locals.error = err;
//     res.stauts = (err.status || 500);
//     next();
// });

app.get('/', routes.index);
//blog
app.get('/blogList', routes.blog.list);
app.post('/blogRemove', routes.blog.remove);
app.post('/blogAdd', routes.blog.add);
app.post('/blogSave', routes.blog.save);
//user
app.post('/login', routes.user.login);
app.post('/register', routes.user.register);

app.all('*', (req, res) => {
    res.status(404).send()
});

app.listen(CFG.port, (err, data) => {
    if (err)
        console.log('err: ', err);

    console.log('listen on port:' + CFG.port);
});