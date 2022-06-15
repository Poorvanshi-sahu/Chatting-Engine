// var express = require('express');
const express = require("express");
var router = express.Router();
const { createServer } = require("http");
const { Server } = require("socket.io");
var httpServer = createServer(express())
const io = new Server(httpServer, { /* options */ });
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/chat', (req, res) => {
    res.render('chat', { username: req.body.username });
})

io.on("connection", (socket) => {
    console.log("Connected");
});

module.exports = router;