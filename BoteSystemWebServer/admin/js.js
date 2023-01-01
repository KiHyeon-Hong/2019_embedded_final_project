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
router.use('/newage', (request, response) => {
        fs.readFile('admin/js/new-age.min.js', (error, data) => {
                response.end(data);
        });
});
router.use('/contsrch', (request, response) => {
        fs.readFile('admin/js/contsrch.js', (error, data) => {
                response.end(data);
        });
});
router.use('/chinsungapp', (request, response) => {
        fs.readFile('admin/js/chinsungapp.js', (error, data) => {
                response.end(data);
        });
});

module.exports = router
