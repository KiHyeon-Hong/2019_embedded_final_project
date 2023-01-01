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

router.get('/getparticipation', (request, response) => {
	var str = ""
	client.query('SELECT userClassNum FROM 1team.USER, 1team.USERCLASSES WHERE 1team.USER.userNum = 1team.USERCLASSES.userNum AND 1team.USER.userNum =' + request.query.userNum
			, (error, results) => {
			results.forEach((item, index) => {
				if(index == 0)
					str = str + item.userClassNum;
				else if(index != null)
					str = str + ', ' + item.userClassNum;
			});
			client.query('SELECT 1team.USER.userNum, userName, userPhone, 1team.CLASSES.userClassNum, 1team.CLASSES.userClass FROM 1team.USER, 1team.USERCLASSES, 1team.CLASSES  WHERE 1team.USER.userNum = 1team.USERCLASSES.userNum AND 1team.USERCLASSES.userClassNum = 1team.CLASSES.userClassNum  AND 1team.USER.userAuthor = 2 AND 1team.USERCLASSES.userClassNum IN ( ' + str + ') AND NOT 1team.USER.userNum =' + request.query.userNum,(error, result) => { console.log('조회완료');response.send(result);});
	});
});

module.exports = router
	
		
	

