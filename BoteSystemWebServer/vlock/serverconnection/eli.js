const express = require('express');
const mysql = require('sync-mysql');
const router = express.Router();
var database;

router.get('/eli', (request, response) => {
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
	console.log(request.query);	
	var voteNum = request.query.voteNum;
	var firstChainHash = client.query('SELECT * FROM VOTEINFORMATION WHERE voteNum ='+voteNum);
	if(firstChainHash[0].firstChainHash == 'null')
		response.send("");
	else {
	client.query("UPDATE VOTEINFORMATION SET firstChainHash = 'null' WHERE voteNum ="+voteNum); 
	var final_hash;
	var final_beforeHash;
	var i = 0;
	var fh = firstChainHash[0].firstChainHash;
	while(true) {
		var temp_result = client.query("SELECT hash, beforeHash FROM CHAININFORMATION WHERE beforeHash ='" + fh +"'");
		console.log(temp_result);
		if(temp_result.length == 0)	
			break;
		else {
			final_hash = temp_result[0].hash;
			final_beforeHash = temp_result[0].beforeHash;

		}
		fh = temp_result[0].hash;
	}

	while(true) {
		if(final_beforeHash == null){
			client.query("DELETE FROM CHAININFORMATION WHERE hash ='" + final_hash +"'");
			break;
		}
		client.query("DELETE FROM CHAININFORMATION WHERE hash ='" + final_hash +"'");
		var temp_result = client.query("SELECT hash, beforeHash FROM CHAININFORMATION WHERE hash = '" + final_beforeHash +"'");
			final_hash = temp_result[0].hash;
			final_beforeHash = temp_result[0].beforeHash;
	}
	response.send('');
	}
});

module.exports = router
