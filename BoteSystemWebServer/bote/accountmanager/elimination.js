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

router.post('/elimination', (request, response) => {
	var mynum = request.body.mynum;
	console.log(request.body);

	client.query('delete from USERCLASSES where userNum=' + mynum, (error, results) => {
		if(error)
			response.send(JSON.parse('{"result":"fail"}'));
		client.query('update USER set userAuthor=' + 3 + ' where userNum=' + mynum, (error, results) => {
			if(error)
				response.send(JSON.parse('{"result":"fail"}'));
			else
				response.send(JSON.parse('{"result":"ok"}'));
		});
	});
});

module.exports = router;
