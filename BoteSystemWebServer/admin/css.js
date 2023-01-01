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
router.use('/chinsungapp', (request, response) => {
        fs.readFile('admin/css/chinsungapp.css', (error, data1) => {
                response.end(data1);
        });
});

router.use('/newage', (request, response) => {
        fs.readFile('admin/css/new-age.min.css', (error, data) => {
                response.end(data);
        });
});

module.exports = router
