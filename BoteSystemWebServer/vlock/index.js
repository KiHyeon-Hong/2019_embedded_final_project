const crypto = require('crypto');
const express = require('express');
const router = express.Router();
//const url = require('url');
const mysql = require('sync-mysql');
/*
var client = new mysql({
	host: 'localhost',
	user: '1team',
	password: 'gachon654321',
	database: 'team1_1'
});
*/


var client;

router.post('/index', (request, response) => {
	console.log("깔깔");
	var port = request.get('host').split(':');
	if(port[1] == '65009') {
		client = new mysql({
			host: 'localhost',
			user: '1team',
			password: 'gachon654321',
			database: 'team1_1'
		});
	}
	else if(port[1] == '65010') {
		client = new mysql({
			host: 'localhost',
			user: '1team',
			password: 'gachon654321',
			database: 'team1_2'
		});
	}
	else if(port[1] == '65011') {
		client = new mysql({
			host: 'localhost',
			user: '1team',
			password: 'gachon654321',
			database: 'team1_3'
		});
	}


	console.log(request.body);
	var userNum = request.body.userNum;
	var voteCandidate = request.body.canName;
	var voteNum = request.body.voteNum;
	var quitTime = request.body.quitTime;
	var nonce = 0;
	var hash ="";

	var temp_string = userNum+voteCandidate+voteNum
	var cipher = crypto.createHash('sha256').update(temp_string).digest('base64');

	while(true) {
		cipher = crypto.createHash('sha256').update(cipher+nonce).digest('base64');
		if(cipher.charAt(0) == '0' && cipher.charAt(1) == '0'){
			console.log(cipher);
			console.log(nonce);
			hash = cipher;	
			break;
		}
		nonce++;
	}

	console.log('투표 참여 시작!');

	var results = client.query('select * from VOTEINFORMATION where voteNum = ' + voteNum);
	console.log(results);

	if(results.length == 0) {
		var results1 = client.query('insert into CHAININFORMATION values("' + hash + '", ' + userNum + ', "' + voteCandidate +'", sysdate(), null, ' + nonce + ')');
		var results2 = client.query('insert into VOTEINFORMATION values(' + voteNum + ', "' + quitTime + '", "' + hash + '")');

		var results5 = client.query('insert into CANDIDATEINFORMATION values(' + voteNum + ', "' + voteCandidate + '", 1)');
	}
	else {
		var myHash;
		var myVoteNum = client.query('select firstChainHash from VOTEINFORMATION where voteNum = ' + voteNum);
		
		myVoteNum.forEach((item, index) => {
			myHash = item.firstChainHash;
		});

		var results3;
		while(true) {
			results3 = client.query('select B.hash as hash from CHAININFORMATION A, CHAININFORMATION B where A.hash=B.beforeHash and A.hash="' + myHash + '"');

			if(results3.length == 0)
				break;

			results3.forEach((item, index) => {
				myHash = item.hash;
			});
		}

		var results4 = client.query('insert into CHAININFORMATION values("' + hash + '", ' + userNum + ', "' + voteCandidate + '", sysdate(), "' + myHash + '", ' + nonce + ')');
		

		var results6 = client.query('select canScore from CANDIDATEINFORMATION where voteNum=' + voteNum + ' and voteCandidate="' + voteCandidate + '"');
		console.log('select canScore from CANDIDATEINFORMATION where voteNum=' + voteNum + ' and voteCandidate="' + voteCandidate + '"');


		if(results6.length == 0) {
			var results8 = client.query('insert into CANDIDATEINFORMATION values(' + voteNum + ', "' + voteCandidate + '", 1)')
		}
		else {
			var myCanScore;
			results6.forEach((item, index) => {
				myCanScore = item.canScore;
			});
			console.log(results6);
			console.log(myCanScore);
			myCanScore = parseInt(myCanScore);
			myCanScore = myCanScore + 1;
			var results7 = client.query('update CANDIDATEINFORMATION set canScore=' + myCanScore + ' where voteNum=' + voteNum + ' and voteCandidate="' + voteCandidate + '"');
		}
	}


	response.send(" ");
});

module.exports = router;
