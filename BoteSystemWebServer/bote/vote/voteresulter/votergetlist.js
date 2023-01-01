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

router.get('/votergetlist',(request,response)=>{
	console.log(request.query.userNum);
	client.query('SELECT VOTELIST.voteNum, voteName FROM 1team.VOTELIST, 1team.JOINLIST WHERE JOINLIST.voteNum = VOTELIST.voteNum AND JOINLIST.userNum = '+request.query.userNum + ' and readingResult=1', (error, result) => {
		if(error)
			console.log(error.toString());
		console.log(result);
		response.send(result);
	});
	
});

module.exports = router;
