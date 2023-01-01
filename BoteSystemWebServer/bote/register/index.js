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

router.post('/index', (request, response) => {
	var myname = request.body.myname;
	var myid = request.body.myid;
	var mypass = request.body.mypass;
	var myanswernum = request.body.myanswernum;
	var myanswer = request.body.myanswer;
	var myphone = request.body.myphone;
	var myclass = request.body.myclass;
	var myauthor = request.body.myauthor;

	var usernum;
	var classnum;
	console.log(request.body);
	console.log('test');
	client.query('select count(*)+1 as count from USER', (error, results) => {
		results.forEach((item, index) => {
			usernum = item.count;
		});

		client.query('insert into USER values(' + usernum + ', "' + myid + '", "' + mypass + '", "' + myname + '", "' + myphone + '", ' + myanswernum + ', "' + myanswer + '", ' + myauthor + ')', (error, results) => {
			if(error)
				response.send(JSON.parse('{"result":"fail"}'));
			else
				client.query('select userClassNum from CLASSES where userClass="' + myclass + '"', (error, results) => {
					if(results.length == 0)
						client.query('select count(*)+1 as count from CLASSES', (error, results) => {
							results.forEach((item, index) => {
								classnum = item.count;
							});
							client.query('insert into CLASSES values(' + classnum + ', "' + myclass + '")', (error, results) => {
								client.query('insert into USERCLASSES values(' + classnum + ', ' + usernum + ')', (error, results) => {
									response.send(JSON.parse('{"result":"ok"}'));
								});
							});
						});
					else {
						results.forEach((item, index) => {
							classnum = item.userClassNum;
						});
						client.query('insert into USERCLASSES values(' + classnum + ', ' + usernum + ')', (error, results) => {
							response.send(JSON.parse('{"result":"ok"}'));
						});
					}	
				});
		});
	});
});

module.exports = router;
