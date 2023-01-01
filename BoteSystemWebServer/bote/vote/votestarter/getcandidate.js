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

router.get('/getcandidate',(request,response)=>{
	console.log(request.query.voteNum);
	client.query('SELECT voteCandidate FROM 1team.CANDIDATELIST WHERE voteNum ='+request.query.voteNum +'', (error, result) => {
		if(error)
			console.log(error.toString());
		 console.log(result);
		 response.send(result);
	});
	
});

module.exports = router;
