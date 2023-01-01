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

router.get('/getquestion', (request, response) => {
	console.log('비밀번호 찾기 진입');
	client.query('select passQuestion from 1team.USER, 1team.PASSQUESTIONS where USER.passQuestionNum=PASSQUESTIONS.passQuestionNum and UserID="' + request.query.myid + '"', (error, results) => {
		if(results.length == 0)
			response.send(JSON.parse('{"mypassquestion":"undefind"}'));
		results.forEach((item, index) => {
			response.send(JSON.parse('{"mypassquestion":"' + item.passQuestion + '"}'));
		});
	});
});

module.exports = router;
