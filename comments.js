// Create web server
// Run: node comments.js
// Test: curl -d "comment=Hello" http://localhost:3000/comments
// Test: curl http://localhost:3000/comments
// Test: curl -X DELETE http://localhost:3000/comments/0

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

var comments = [];

app.get('/comments', function(req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(comments.toString());
});

app.post('/comments', function(req, res) {
  if (req.body.comment) {
    comments.push(req.body.comment);
    res.send('Success!');
  } else {
    res.send('No comment sent');
  }
});

app.delete('/comments/:id', function(req, res) {
  var id = req.params.id;
  if (comments[id]) {
    comments.splice(id, 1);
    res.send('Success!');
  } else {
    res.send('No comment found');
  }
});

app.listen(3000);