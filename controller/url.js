const nid  = require('nanoid');
const URL = require('../models/url');

async function generateShortUrl(req,res){ // post method 
    // res.send('hello');
    const body = req.body;
    console.log("post is getting triggered...........................")
  
    if (!body.genurl) return res.status(400).json({ error: "url is required" });
    const shortId = nid.nanoid(5);
    await URL.create({
        shortId:shortId,
        redirectURL:body.genurl,
        visitHistory:[]
    });

    const allurl = await URL.find({});
    return res.render("home",{
      id:shortId,
      urls: allurl
    })
    
    // return res.json({id:shortId})
}



async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  }
  


//  async function handleGetReq(req,res){   //get request
//   console.log("req get.........................")
//     const allurl = await URL.find({});
  
//     return res.render("home",{
//       "urls": allurl,

//     });
//   }



module.exports={
    generateShortUrl,
    handleGetAnalytics,
    // handleGetReq
};