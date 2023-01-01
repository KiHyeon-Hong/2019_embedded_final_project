const express = require('express');
const votemaker_index = require('./bote/vote/votemaker/index.js');
const bodyParser = require('body-parser');
const fs = require('fs');
const ejs = require('ejs');
const res = require('request');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const register = require('./bote/register/getquestion.js');
const login = require('./bote/login.js');
const votemaker_getparticipation = require('./bote/vote/votemaker/getparticipation.js');
const findid = require('./bote/find/id.js');
const getpassquestion = require('./bote/find/password/getquestion.js');
const votemaker = require('./bote/vote/votemaker/index.js');
const getpassword = require('./bote/find/password/index.js');
const register2 = require('./bote/register/index.js');
const elimination = require('./bote/accountmanager/elimination.js');
const getclass = require('./bote/accountmanager/getClass.js');
const update = require('./bote/accountmanager/update.js');
const voteupdater_getlist = require('./bote/vote/voteupdater/getlist.js');
const voteupdater_quitvote = require('./bote/vote/voteupdater/quitvote.js');
const voteresulter_admingetlist = require('./bote/vote/voteresulter/admingetlist.js');
const voteresulter_admin = require('./bote/vote/voteresulter/admin.js');
const voteupdater_openresult = require('./bote/vote/voteupdater/openresult.js');
const voteupdater_votereaper = require('./bote/vote/voteupdater/votereaper.js');
const votestarter_getlist = require('./bote/vote/votestarter/getlist.js');
const voteresulter_voter = require('./bote/vote/voteresulter/voter.js');
const votestarter_getcandidate = require('./bote/vote/votestarter/getcandidate.js');
const vlock = require('./vlock/index.js');
const voteresulter_votegetlist = require('./bote/vote/voteresulter/votergetlist.js');
const votestarter_index = require('./bote/vote/votestarter/index.js');
const result = require('./vlock/votedeliver/index.js');



const login1 = require('./admin/login.js');
const page1 = require('./admin/page1.js');
const page2 = require('./admin/page2.js');
const page3 = require('./admin/page3.js');
const page4 = require('./admin/page4.js');
const download = require('./admin/download.js');
const css = require('./admin/css.js');
const js = require('./admin/js.js');
const img = require('./admin/img.js');
const findpass = require('./admin/findpass.js');

const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/bote/register', register);
app.use('/bote', login);
app.use('/bote/vote/votemaker',votemaker_getparticipation);
app.use('/bote/vote/votemaker',votemaker);
app.use('/bote/find', findid);
app.use('/bote/find/password', getpassquestion);
app.use('/bote/find/password', getpassword);
app.use('/bote/register', register2);
app.use('/bote/accountmanager', elimination);
app.use('/bote/accountmanager', getclass);
app.use('/bote/accountmanager', update);
app.use('/bote/vote/voteupdater', voteupdater_getlist);
app.use('/bote/vote/voteupdater', voteupdater_quitvote);
app.use('/bote/vote/voteupdater', voteupdater_openresult);
app.use('/bote/vote/voteresulter', voteresulter_admingetlist);
app.use('/bote/vote/voteresulter', voteresulter_admin);
app.use('/bote/vote/voteupdater', voteupdater_votereaper);
app.use('/bote/vote/votestarter',votestarter_getlist);
app.use('/bote/vote/voteresulter',voteresulter_voter);
app.use('/bote/vote/votestarter',votestarter_getcandidate);
app.use('/vlock',vlock);
app.use('/bote/vote/voteresulter',voteresulter_votegetlist);
app.use('/bote/vote/votestarter',votestarter_index);
app.use('/vlock/votedeliver', result);



app.use('/',login1);
app.use('/',page1);
app.use('/', page2);
app.use('/', page3);
app.use('/', page4);
app.use('/', download);
app.use('/', findpass);
app.use('/css', css);
app.use('/js', js);
app.use('/img', img);
app.use('/logout', (request,response)=>{
        response.clearCookie('auth');
        response.redirect('/login');
});
app.use('/checkserver' ,(request, response) => {
	response.send("");
});






app.listen(65001, () => {
	console.log('boteserver running at 65001');
});
