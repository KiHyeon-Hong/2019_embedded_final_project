const express = require('express');
const app = express();
const index = require('./vlock/index.js');
const eli = require('./vlock/serverconnection/eli.js');
const leftserver = require('./vlock/serverconnection/leftserver.js');
const de_index = require('./vlock/votedeliver/index.js');
const resulter = require('./vlock/votedeliver/resulter.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/vlock', index);
app.use('/vlock/serverconnection', eli);
app.use('/vlock/serverconnection', leftserver);
app.use('/vlock/votedeliver', de_index);
app.use('/vlock/votedeliver', resulter);
app.use('/checkserver', (request, response) => {response.send("");});
app.listen(65009, () => {console.log('server running at 65009');});
app.listen(65010, () => {console.log('server running at 65010');});
app.listen(65011, () => {console.log('server running at 65011');});
