const express = require('express');
const mysql = require('sync-mysql');
const router = express.Router();
var database;

router.get('/leftserver', (request, response) => {
	var port = request.get('host').split(':');

	if(port[1] == '65009')
		database = 'team1_1';
	else if(port[1] == '65010')
		database = 'team1_2';
	else
		database = 'team1_3';

	const client = new mysql({
		host: 'localhost',
		user: '1team',
		password: 'gachon654321',
		database: database
	});
	var voteNum = request.query.voteNum;
	var firstChainHash = client.query('SELECT * FROM VOTEINFORMATION WHERE voteNum ='+voteNum);
	var canScoreList = client.query('SELECT voteCandidate, canScore FROM CANDIDATEINFORMATION WHERE voteNum ='+voteNum);
	var chainArr = new Array();
	var i = 0;
	var fh = firstChainHash[0].firstChainHash;
	canScoreList.forEach((item ,index) => {
		chainArr[index] = {};
		chainArr[index][0] = item.voteCandidate;
		chainArr[index][1] = item.canScore;
		if(client.query("SELECT voteCandidate FROM CHAININFORMATION WHERE hash ='" + fh+"'")[0].voteCandidate == item.voteCandidate)
			chainArr[index][2] = 1;
		else 
			chainArr[index][2] = 0;
		i++;
	});
	while(true) {
		var temp_result = client.query("SELECT voteCandidate, hash FROM CHAININFORMATION WHERE beforeHash ='" + fh +"'");
		if(temp_result.length == 0)
			break;
		for( var j = 0; j < i; j++) {
			if(chainArr[j][0] == temp_result[0].voteCandidate){
				chainArr[j][2]++;
				
			}
		}
		fh = temp_result[0].hash;
	}
	i = 0;

	while(true) {
		if(i == chainArr.length)
			break;
		if(chainArr[i][1] != chainArr[i][2]) {
			console.log('유효성 수정 소요 발생');
			client.query("UPDATE CANDIDATEINFORMATION SET canScore ='" + chainArr[i][2] + "' WHERE voteCandidate = '" + chainArr[i][0]+"'" );
		}
		i++;
	}	

	console.log(chainArr[0][2]);
	response.send(chainArr);
});

module.exports = router
