/*jshint node:true */
var express = require('express');
var bodyParser = require('body-parser');
var Datastore = require('nedb');

var app = express();

var todoDB = new Datastore({filename: __dirname + '/db/todo.db', autoload: true});

var responseCallback = function (res, err, payload) {
    var response = {
        error: false,
        payload: null
    };
    if (err) {
        response.error = err;
    } else {
        response.payload = payload;
    }
    res.json(response);
};

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/api/todos', function (req, res) {
    todoDB.find({}).sort({date: 1}).exec(responseCallback.bind(null, res));
});

app.post('/api/todos', function (req, res) {
    var todo = req.body;
    todo.date = Date.now();
    todoDB.insert(req.body, responseCallback.bind(null, res));
    todoDB.persistence.compactDatafile();
});


app.delete('/api/todos/:id', function (req, res) {
    var id = req.params.id;
    if (!id) {
        responseCallback(res, 'No ID specified', null);
    } else {
        todoDB.remove({ _id: id }, {}, responseCallback.bind(null, res));
        todoDB.persistence.compactDatafile();
    }
});

app.put('/api/todos/:id', function (req, res) {
    var id = req.params.id;
    if (!id) {
        responseCallback(res, 'No ID specified', null);
    } else {
        todoDB.update({ _id: id }, {$set: req.body}, responseCallback.bind(null, res));
        todoDB.persistence.compactDatafile();
    }
});

module.exports = app;