const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const session = require('express-session');
const cookieParser = require('http');
const app = express();
const router = express.Router();
const fs = require('fs');

const client = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: '1team',
	password: 'gachon654321',
	database:'1team'
});

router.get('/login',(req,res)=>{
	
	fs.readFile('admin/login.ejs','utf8',(error,data)=>{
		res.writeHead(200,{'Content-Type':'text/html; charset= utf-8'});
		res.end(ejs.render(data,{
			userpass: "" 
		}));
	});
	
	
});

router.post('/login',function(req,res){
	var id = req.body.user_id;
	var pass = req.body.user_pw;
	var userid;
	var userpass;
 	client.query('SELECT userID, userPass FROM 1team.USER WHERE userAuthor = 0',(error,results)=>{
		if(results.length == 0)
			respond.send(JSON.parse('{"userid":"undefind","userpass":"undefind"}'));
		else{

			results.forEach((item, index) => {
				userid = item.userID;
				userpass = item.userPass;
			});
			console.log(userid);
			console.log(userpass);
		}
		console.log(id + "    " + userid + "   " + userpass + "   " + pass);
		if(id == userid && pass == userpass) {
			res.cookie('auth','OK');
			res.redirect('/page1');
		}
		else {
			res.cookie('auth', 'NO');
			res.redirect('/login');
		}
	});
});
module.exports = router
