const express = require('express');
const mysql = require('mysql');

const router = express.Router();

const client = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: '1team',
	password: 'gachon654321',
	datebase: '1team'
});


router.get('/getquestion', (request, response) => {
	console.log('회원가입 진입');
	client.query('SELECT * FROM 1team.PASSQUESTIONS', (error, results) => {
		var passquestion = [];
		var passquestionnum = [];

		results.forEach((item, index) => {
			passquestionnum[index] = item.passQuestionNum;
			passquestion[index] = item.passQuestion;
		});
		var temp = '{"passquestionnum":"' + passquestionnum + '", "passquestion":"' + passquestion + '"}';
		temp = JSON.parse(temp);
		response.send(temp);
	});
});

module.exports = router
