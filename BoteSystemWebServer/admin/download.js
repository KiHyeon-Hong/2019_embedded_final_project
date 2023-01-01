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

router.use('/download', (request, response) => {
	var host = request.get('host').split(':');
	const file = './admin/bote.apk';
	response.download(file);
});

module.exports = router
