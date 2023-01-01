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
router.use('/batthern', (request, response) => {
        fs.readFile('admin/img/batthern.png', (error, data2) => {
                response.end(data2);
        });
});

router.use('/bgpattern', (request, response) => {
        fs.readFile('admin/img/bg-pattern.png', (error, data) => {
                response.end(data);
        });
});
router.use('/voteimg2', (request, response) => {
        fs.readFile('admin/img/vote_img2.png', (error, data) => {
                response.end(data);
        });
});
module.exports = router
