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

router.get('/getclass', (request, response) => {
	var userClassNum = [];
	var userClass = [];

	client.query('select CLASSES.userClassNum, userClass from USERCLASSES, CLASSES where USERCLASSES.userClassNum=CLASSES.userClassNum and userNum=' + request.query.mynum, (error, results) => {
		results.forEach((item, index) => {
			userClassNum[index] = item.userClassNum;
			userClass[index] = item.userClass;
		});
		var temp = JSON.parse('{"userclassnum":"' + userClassNum + '", "userclass":"' + userClass + '"}');
		console.log(temp);
		response.send(temp);
	});
});

module.exports = router;
