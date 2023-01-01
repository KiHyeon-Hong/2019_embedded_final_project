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

router.put('/quitvote', (request, response) => {
	client.query("UPDATE VOTELIST SET returnResult = 1,  quitTime = NOW() WHERE voteNum =" + request.query.voteNum , (error, results) => {
		console.log('수정완료');
		response.send('완료');
	});
});

module.exports = router
