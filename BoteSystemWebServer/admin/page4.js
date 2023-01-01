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

router.get('/page4', (request, response) => {

        var results2 = client.query('select CLASSES.userClass, count(userClass) as count from CLASSES, USERCLASSES where CLASSES.userClassNum=USERCLASSES.userClassNum group by CLASSES.userClass');

        fs.readFile('admin/page4.ejs', 'utf8', (error, data) => {
                if(request.cookies.auth == "OK"){
                response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                response.end(ejs.render(data, {
                        data: results2
                        }));
                }
                else
                        response.redirect('/login');
        });
});

router.post('/page4', (request, response) => {
        var temp;
        var results3 = client.query('select userClassNum from CLASSES where userClass="' + request.body.classNum + '"');
        results3.forEach((item, index) => {
                temp = item.userClassNum;
        });
     

        var results4 = client.query('delete from USERCLASSES where userClassNum=' + temp);

        response.redirect('/page4');
});

module.exports = router
