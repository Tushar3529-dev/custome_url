const express = require('express');
const {     handleGernateNewShortUrl,
    handleGetRequestfromShortId,
    handleGetAnalytics
 } = require('../controller/url');

const router =  express.Router();


 router.post("/",    handleGernateNewShortUrl,
);

router.get("/:shortId",handleGetRequestfromShortId);

router.get("/analytics/:shortId",handleGetAnalytics);

 module.exports =router;