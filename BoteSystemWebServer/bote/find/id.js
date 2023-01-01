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


router.post('/id', (request, response) => {
	var username = request.body.myname;
	var userphone = request.body.myphone;
	console.log(request.body);
	client.query('select userID from 1team.USER where userName="' + username + '" and userPhone="' + userphone + '"', (error, results) => {
		var userid;
		results.forEach((item, index) => {
			userid = item.userID;
		});
		response.send(JSON.parse('{"userid":"' + userid + '"}'));
	});
});

module.exports = router;
