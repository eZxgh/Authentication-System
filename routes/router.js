const express = require('express');
const path = require('path');

const router = express.Router();

let parentDirPath = path.resolve(__dirname,'..');

const publicDirPath = parentDirPath + '/public';

const pagesDirPath = parentDirPath + "/pages";

router.use(express.static(publicDirPath));
router.use(express.static(pagesDirPath));

router.get('/',(req,res) => {
    res.sendFile("index.html",{root:pagesDirPath});
});

router.get('/register',(req,res) => {
    res.sendFile("register.html",{root:pagesDirPath});
});

router.get('/succes',(req,res) => {
    res.sendFile("succes.html",{root:pagesDirPath});
});

module.exports = router;