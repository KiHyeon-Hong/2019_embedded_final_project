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

router.get('/getlist',(request,response)=>{
	console.log(request.query.userNum);
	client.query("SELECT 1team.VOTELIST.voteNum, voteName, DATE_FORMAT(quitTime, '%Y-%m-%d %H:%i:%s') AS quitTime FROM 1team.VOTELIST, 1team.JOINLIST WHERE 1team.JOINLIST.voteNum = 1team.VOTELIST.voteNum AND 1team.VOTELIST.returnResult = 0 AND 1team.VOTELIST.quitTime IS NOT NULL AND 1team.JOINLIST.voteStatus = 0 AND 1team.JOINLIST.userNum ="+ request.query.userNum + ' and readingResult=0', (error, result) => {
		if(error)
			console.log(error); 
		console.log(result);
		response.send(result);
	});
	
});

module.exports = router;
