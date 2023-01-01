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

router.get('/admin',(request,response)=>{
	console.log(request.query.voteNum);
	client.query('SELECT voteCandidate, canScore  FROM 1team.CANDIDATELIST  WHERE voteNum = '+request.query.voteNum, (error, result) => {
		 console.log('확인');console.log(result);response.send(result);
	});
	
});

module.exports = router;
