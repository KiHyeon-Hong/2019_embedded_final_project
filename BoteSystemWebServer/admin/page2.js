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

router.get('/page2', (request, response) => {

        var results = client.query('select * from USER order by userNum');
        fs.readFile('admin/page2.ejs', 'utf8' ,(error, data) => {
                if(request.cookies.auth == "OK") {
                        response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                        response.end(ejs.render(data, {
                                data: results
                        }));
                }
                else
                        response.redirect('/login');

        });
});

router.post('/page2', (request, response) => {
        var results1 = client.query('update USER set userAuthor=3 where userNum="' + request.body.userNum + '"');
	var results10 = client.query('delete from USERCLASSES where userNum="' + request.body.userNum + '"');
        response.redirect('/page2');
});

module.exports = router
