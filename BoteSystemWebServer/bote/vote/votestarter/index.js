const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const url = require('url');
const mysql = require('mysql');



const client = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: '1team',
	password: 'gachon654321',
	database: '1team'
});

router.put('/index',(request,response)=>{
	client.query("UPDATE JOINLIST SET voteStatus = 1 WHERE voteNum =" + request.body.voteNum + " AND userNum = " + request.body.userNum, ()=>{});
	response.send("");

});
	
	/*
	var nonce = 0;
	var cipher = crypto.createHash('sha256').update('').digest('base64');
	var temp = cipher;
	var urls = url.parse(request.url,true);
	
	while(true){
		cipher = crypto.createHash('sha256').update(''+nonce).digest('base64');
		if(cipher.charAt(0) == '0' && cipher.charAt(1) == '0'){
			console.log(cipher);
			console.log(nonce);
			console.log(request.get('host');
			break;
		}
		nonce++;
	}
        */

module.exports = router
