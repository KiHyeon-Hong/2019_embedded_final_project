const express = require('express');
const router = express.Router();
const fs = require('fs');
const res = require('request');
const ejs = require('ejs');
const mysql = require('sync-mysql');

const client = new mysql({
        host: 'localhost',
        user: '1team',
        password: 'gachon654321',
        database: '1team'
});

router.get('/page3', (request, response) => {

        var subData = client.query('select A.voteNum as voteNum, A.voteName as voteName, A.userNum as userNum, B.userName as userName, A.quitTime as quitTime, A.returnResult as returnResult from VOTELIST as A inner join USER as B on A.userNum = B.userNum order by voteNum');

        fs.readFile('admin/page3.ejs','utf8', (error, data) => {
		if(request.cookies.auth == "OK"){
                	response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                	response.end(ejs.render(data, {
                        	data: subData
                	}));
		}
		else        	
			response.redirect('/login');
        });
});
router.post('/page3', (request, response) => {
        var results1 = client.query('delete from JOINLIST where voteNum="' + request.body.voteNum + '"');
        var results1 = client.query('delete from CANDIDATELIST where voteNum="' + request.body.voteNum + '"');
	var results1 = client.query('update VOTELIST set userNum=1 where voteNum="' + request.body.voteNum + '"');
        response.redirect('/page3');
});



module.exports = router
