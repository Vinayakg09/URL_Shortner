const express = require("express");

const {GetAnalytics ,GenerateShortUrl} = require("../controller/url")

const router = express.Router();

router.post('/', GenerateShortUrl);

router.get('/analytics/:shortId', GetAnalytics);


module.exports = router

