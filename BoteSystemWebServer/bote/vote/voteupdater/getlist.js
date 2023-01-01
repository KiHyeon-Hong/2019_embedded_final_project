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

router.get('/getlist', (request, response) => {
	console.log(request.query.userNum);
	client.query("SELECT voteNum, voteName,DATE_FORMAT(quitTime, '%Y-%m-%d %H:%i:%s') AS quitTime FROM VOTELIST WHERE userNum =" + request.query.userNum , (error, results) => {
		console.log(results);
		response.send(results);
	});
});

module.exports = router
