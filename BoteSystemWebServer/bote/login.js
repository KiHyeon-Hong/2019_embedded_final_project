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
/*
router.get('/login', (request, response) => {
	console.log(request.query);
	client.query('SELECT USER.userNum, userName, userPhone, userClassNum, userAuthor FROM USER, USERCLASSES WHERE USER.userNum=USERCLASSES.userNum and userID="' + request.query.myid + '" and userPass="' + request.query.mypass + '"', (error, results) => {
		var usernum;
		var username;
		var userphone;
		var userclassnum = [];
		var userauthor;
		
		
		results.forEach((item, index) => {
			usernum = item.userNum;
			username = item.userName;
			userphone = item.userPhone;
			userclassnum[index] = item.userClassNum;
			userauthor = item.userAuthor;
		});
		var tmp = '{"usernum":"' + usernum + '", "username":"' + username + '", "userphone":"' + userphone + '", "userclassnum":"' + userclassnum + '", "userauthor":"' + userauthor + '"}';
		var temp = JSON.parse(tmp);
		console.log(temp)
		response.send(temp);
	});
});
*/
router.get('/login', (request, response) => {
	console.log(request.query);
	client.query('select userNum, userName, userPhone, userAuthor from USER where userID="' + request.query.myid + '" and userPass="' + request.query.mypass + '"', (error, results) => {
		if(results.length == 0)
			response.send(JSON.parse('{"usernum":"undefind", "username":"undefind", "userphone":"undefind", "userclassnum":"undefind", "userauthor":"undefind"}'));
		else {
			var usernum;
			var username;
			var userphone;
			var userclassnum = [];
			var userauthor;

			results.forEach((item, index) => {
				usernum = item.userNum;
				username = item.userName;
				userphone = item.userPhone;
				userauthor = item.userAuthor;
			});

			client.query('select userClassNum from USERCLASSES where userNum=' + usernum, (error, results) => {
				results.forEach((item, index) => {
					userclassnum[index] = item.userClassNum;
				});
				var temp = JSON.parse('{"usernum":"' + usernum + '", "username":"' + username + '", "userphone":"' + userphone + '", "userclassnum":"' + userclassnum + '", "userauthor":"' + userauthor + '"}');
				console.log(temp);
				response.send(temp);
			});
		}
	});
});

module.exports = router;
