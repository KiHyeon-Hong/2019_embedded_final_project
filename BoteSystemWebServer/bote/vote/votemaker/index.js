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

router.post('/', (request, response) => {
	console.log(request.body);
	
	var voteName = request.body.voteName;
	var voteVoter = request.body.voteVoter
	var voteCandidate = request.body.voteCandidate
	var userNum = request.body.userNum
	voteVoter = voteVoter.replace('[', '');
	voteVoter = voteVoter.replace(']', '');
	voteCandidate = voteCandidate.replace('[', '');
	voteCandidate = voteCandidate.replace(']', '');
	voteCandidate = voteCandidate.replace(/\"/gi,"");
	var voteVoter_list = voteVoter.split(',');
	var voteCandidate_list = voteCandidate.split(',');
	client.query('SELECT MAX(voteNum) AS NUM FROM VOTELIST' , (error, results) => {
		var voteNum = results[0].NUM+1;
		client.query('INSERT INTO VOTELIST VALUES(?,?,NULL,NULL,?,0,0)',[voteNum,voteName,userNum],()=>{});
		voteVoter_list.forEach((item, index) => {
			client.query('INSERT INTO JOINLIST VALUES(?,?,0)',[voteNum,item], ()=>{});
		});
		voteCandidate_list.forEach((item, index) => {
			client.query('INSERT INTO CANDIDATELIST VALUES(?,?,0)',[voteNum,item], ()=>{console.log('데이터베이스에 삽입 완료');});
		});
	});
	response.send("굳");
});

module.exports = router

