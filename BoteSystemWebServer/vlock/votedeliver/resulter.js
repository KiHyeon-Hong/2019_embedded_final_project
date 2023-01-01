const express = require('express');
const mysql = require('sync-mysql');
const router = express.Router();

var client;

router.get('/resulter', (request, response) => {

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

	var voteNum = request.query.voteNum;
	console.log('a');
	var results1 = client.query('select * from CANDIDATEINFORMATION where voteNum=' + voteNum);
	console.log(results1);
	response.send(results1);
});

module.exports = router;
