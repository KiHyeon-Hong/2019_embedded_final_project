
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

router.get('/votereaper', (request, response) => {
	console.log('1');
	console.log(request.query);
	var voteNum = request.query.voteNum;
	var quitTime = request.query.quitTime;
	client.query("UPDATE 1team.VOTELIST SET startTime = now(), quitTime =  '"+quitTime+"' WHERE voteNum = " + voteNum , (error, results) => {
		if(error)
			console.log(error.toString());
console.log('투표시작');
		response.send('완료');
	});}
);

module.exports = router

