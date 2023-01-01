const express = require('express');
const router = express.Router();
const fs = require('fs');
const res = require('request');
const ejs = require('ejs');

router.get('/page1', (request, response) => {

        var host = request.get('host').split(':');
        var status0;
        var status1;
        var status2;
        var status3;
        var url = [1,1,1,1];
	res('http://192.9.44.53:65001/checkserver', (error, respon, body) => {
                if(respon == null)
                        status0 = '접속불가';
                else
                        status0 = '정상작동';
                url[0] = request.protocol + '://' + host[0] + ':65001';
        });
        res('http://192.9.44.53:65009/checkserver', (error, respon, body) => {
		if(respon == null)
                        status1 = '접속불가';
                else
                        status1 = '정상작동';
                url[1] = request.protocol + '://' + host[0] + ':65009';

        });
        res('http://192.9.44.53:65010/checkserver', (error, respon, body) => {
		if(respon == null)
                        status2 = '접속불가';
                else
                        status2 = '정상작동';
                url[2] = request.protocol + '://' + host[0] + ':65010';

        });
        res('http://192.9.44.53:65011/checkserver', (error, respon, body) => {
		if(respon == null)
                        status3 = '접속불가';
                else
                        status3 = '정상작동';
                url[3] = request.protocol + '://' + host[0] + '65011';

        });
	setTimeout(() => {
        fs.readFile('admin/page1.ejs', 'utf8', (error, data) => {
                if(request.cookies.auth == "OK") {
                        response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                        response.end(ejs.render(data, {
                                status0: status0,
                                status1: status1,
                                status2: status2,
                                status3: status3,
                                url0: url[0],
                                url1: url[1],
                                url2: url[2],
                                url3: url[3]
                        }));
                }
                else  response.redirect('/login');
        });},100);

});


module.exports = router
