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

router.post('/update', (request, response) => {
	console.log(request.body);
	var mypass = request.body.mypass;
	var mynum = request.body.mynum;
	var myphone = request.body.myphone;
	var myclass = request.body.myclass;
	var myauthor = request.body.myauthor;

	var temp = myclass.substring(1, myclass.length-1);
	
	myclass = temp.split(", ");
	
	for(var i = 0; i < myclass.length; i++)
		console.log(myclass[i]);

	client.query('select count(*) as count from CLASSES', (error, results) => {
		var nextnum;                                                                 	
		results.forEach((item, index) => {
			nextnum = item.count;
		});
		client.query('update 1team.USER set userPass="' + mypass + '", userPhone="' + myphone + '", userAuthor="' + myauthor + '" where userNum=' + mynum, (error, results) => {
			if(error)
				response.send(JSON.parse('{"result":"fail"}'));

			client.query('delete from USERCLASSES where userNum=' + mynum, (error, results) => {
				if(error)
					response.send(JSON.parse('{"result":"fail"}'));
				else {
					myclass.forEach((item, index) => {
						client.query('select userClassNum from CLASSES where userClass="'+item+'"', (error, results) => {
							if(results.length == 0) {
									nextnum = nextnum + 1;
									client.query('insert into CLASSES values(' + nextnum + ', "' + item + '")', (error, results) => {
							//			client.query('insert into USERCLASSES values(' + nextnum + ' , ' + mynum + ')', (error, results) => {
											//response.send(JSON.parse('{"result":"ok"}'));
							//				if(error)
							//					console.log(error.toString());
							//			});
									});
							}
							else {
							//	var num;
							//	results.forEach((item, index) => {
							//		num = item.userClassNum;
							//	});
							//	client.query('insert into USERCLASSES values(' + num + ', ' + mynum + ')', (error, results) => {
									//response.send(JSON.parse('{"result":"ok"}'));
							//	});
							}
						});
					});

					setTimeout(() => {
					myclass.forEach((item, index) => {
						client.query('select userClassNum from 1team.CLASSES where userClass="' + item + '"', (error, results) => {
							var tempnum;
							results.forEach((item, index) => {
								tempnum = item.userClassNum;
							});
							console.log(results);
							client.query('insert into 1team.USERCLASSES values(' + tempnum + ', ' + mynum + ')', (error, results) => {
								if(error)
									console.log(error.toString());
							});
						});
					});

					response.send(JSON.parse('{"result":"ok"}'));
					}, 1000);
				}
			});
		});
	});
});

module.exports = router; 
