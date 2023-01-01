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
router.get('/findpass', (request, response) => {
	var results11 = client.query('SELECT userID, passAnswer, userPass FROM USER WHERE userAuthor= 0');
        console.log(request.protocol+"://"+request.get('host')+"/login");        
	fs.readFile('admin/findpass.ejs', 'utf8', (error, data) => {
		response.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
		response.end(ejs.render(data,{
				address: request.protocol+"://"+request.get('host')+"/login",
				userpass: ""
			}));	 		
		});
	});

router.post('/findpass', (request,response)=>{
		var id = request.body.userID
		var answer = request.body.userpassQuestion
		var userid;
		var passanswer;
		var userpass;
		fs.readFile('admin/login.ejs', 'utf8', (error, data) => {	
			var results11 = client.query("SELECT passAnswer,userPass FROM USER WHERE userAuthor= 0 AND userID='"+id+"'");
			if(results11.length != 0){	
				passanswer = results11[0].passAnswer;
				userpass = results11[0].userPass;
			
				if(answer == passanswer){
					response.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
					response.end(ejs.render(data,{
						userpass: userpass
					}));		
			
				}	
				else{
					response.redirect('/findpass');
					}		
			
			}
			else
				response.redirect('/findpass');	
		});
});
module.exports = router
