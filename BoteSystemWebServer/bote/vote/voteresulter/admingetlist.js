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

router.get('/admingetlist',(request,response)=>{
	console.log(request.query.userNum);
	client.query("SELECT 1team.VOTELIST.voteNum, voteName, DATE_FORMAT(quitTime, '%Y-%m-%d %H:%i:%s') AS quitTime  FROM 1team.VOTELIST  WHERE 1team.VOTELIST.userNum = "+request.query.userNum, (error, result) => {
		 console.log(result);response.send(result);
	});
	
});

module.exports = router;
