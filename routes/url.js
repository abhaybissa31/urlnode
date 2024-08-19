const express = require('express');
const {generateShortUrl,handleGetAnalytics, handleGetReq} = require('../controller/url')
const router = express.Router();

// router.post('/',generateShortUrl);
router.get("/analytics/:shortId", handleGetAnalytics);
// router.get("/test",handleGetReq);
module.exports=router;