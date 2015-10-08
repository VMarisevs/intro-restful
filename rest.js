var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var todos = [
  'Clean dog.'
  , 'Buy Groceries.'
  , 'Send letter.'
];

app.get('/', function(req, res) {
    res.json({ message: 'It works!' });   
});

app.get('/todo', function(req, res) {
    res.json(todos);   
});

app.get('/todo/:num', function(req, res) {	
    res.json(todos[req.params.num]);
});


/* Advanced 1 */
// New route to delete item from todos array using id number (link):
// http://127.0.0.1:8000/remove/2
app.get('/remove/:num', function(req, res) {
	
	id = req.params.num;
	
	// checking if the ellemnt id is correct for index of array
	if (id > -1) {
		todos.splice(id, 1);
	}
	
    res.json(todos);
});


/* Advanced 2 */
// New route to add item using HTTP POST request using curl (command):
// curl.exe -X POST --data "newTodos=Some new To do" http://127.0.0.1:8000/add
app.post('/add', function(req, res) {
	
	var newTodos = req.body.newTodos;
	
	todos.push(newTodos);
    res.json(todos);
});

var server = app.listen(8000);
