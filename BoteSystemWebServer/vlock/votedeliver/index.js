const express = require('express');
const mysql = require('sync-mysql');

const router = express.Router();

const client = new mysql({
	host: 'localhost',
	user: '1team',
	password: 'gachon654321',
	database: '1team'
});

router.post('/index', (request, response) => {
	console.log(request.body);

	var voteNum = request.body.voteNum;
	var voteCandidate = request.body.voteCandidate;
	var canScore = request.body.voteScore;

	voteCandidate = voteCandidate.substring(1, voteCandidate.length-1);
	voteCandidate = voteCandidate.split(", ");
	canScore = canScore.substring(1, canScore.length-1);
	canScore = canScore.split(", ");

	var results1;

	for(var i = 0; i < voteCandidate.length; i++) {
		results1 = client.query('update 1team.CANDIDATELIST set canScore=' + canScore[i] + ' where voteNum=' + voteNum + ' and voteCandidate="' +voteCandidate[i] + '"');
	}

	response.send(" ");
});

module.exports = router;
