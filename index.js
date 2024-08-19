const express = require('express');
const app = express();
const urlRoute = require('./routes/url');
const staticRoute = require("./routes/staticroute");
const authRoute = require('./routes/auth')
const URL = require('./models/url');
const db  = require('./conn')
const path = require('path');
// const { CLIENT_RENEG_LIMIT } = require('tls');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
db.condb("mongodb://127.0.0.1:27017/urlshort").then(()=> console.log("connection succesfull to db"));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));



app.use("/url",urlRoute);
app.use("/auth",authRoute);
app.use("/", staticRoute);


app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  console.log(shortId);
  const entry = await URL.findOne({ shortId });

  if (entry) {
    await entry.updateOne({ $push: { visitHistory: { timestamp: Date.now() } } });
    res.redirect(entry.redirectURL);
  } else {
    // Handle the case where the shortId is not found (e.g., send an error message)
    res.status(404).send("Short URL not found");
  }
  // console.log(entry);
  // location(entry.redirectURL);
});

// app.use("/analytics/:shortId",urlRoute);
app.listen(8000,()=>{
    console.log("Server started successfully");
});