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

router.get('/openresult', (request, response) => {
	console.log(request.query.voteNum);
	client.query("UPDATE VOTELIST SET readingResult = 1 WHERE voteNum = " + request.query.voteNum , () => {
		console.log('열람승인!');
		response.send("OK!!");
	});
});

module.exports = router
