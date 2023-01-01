const express = require('express');
const mysql = require('mysql');

const router = express.Router();

const client = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: '1team',
	password: 'gachon654321',
	database: '1team'
});

router.post('/index', (request, response) => {
	client.query('select userPass from 1team.USER where userID="' + request.body.myid + '" and passAnswer="' + request.body.myanswer + '"', (error, results) => {
		if(results.length == 0)
			response.send(JSON.parse('{"mypass":"undefind"}'));
		results.forEach((item, index) => {
			response.send('{"mypass":"' + item.userPass + '"}');
		});
	});
});

module.exports = router;
