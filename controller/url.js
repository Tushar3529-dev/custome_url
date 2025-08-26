
const shortid = require("shortid");

const URL = require("../models/url.js");


async function handleGernateNewShortUrl (req,res){
    const body =req.body;

    if(!body.url) return res.status(400).json({error:"URL is required"});
    

   const  ShortID=shortid.generate();

    await URL.create({
        shortId:ShortID,
        redirectUrl:body.url,
        visitHistory:[],
    })

return res.json({id: ShortID});

}

async function handleGetRequestfromShortId(req,res){

const shortId =req.params.shortId;



if(!shortId) return res.status(400).json({error: "No Such url exist !! Please check your short url"});


const entry = await URL.findOneAndUpdate(
  { shortId },
  {
    $push: { visitHistory: { timestamp: Date.now() } }
  },
  { new: true }
);

if (!entry) {
  return res.status(404).json({ error: "Short URL not found" });
}

res.redirect(entry.redirectUrl);


}


async function handleGetAnalytics(req,res) {

    const analyticsId =req.params.shortId;

    if(!analyticsId) return res.status(400).json({error: "No Such url exist !! Please check your short url"});

const result =await URL.findOne({shortId: analyticsId});

return res.json({totalclicks: result.visitHistory.length,  history: result.visitHistory});

}


module.exports ={
    handleGernateNewShortUrl,
    handleGetRequestfromShortId,
    handleGetAnalytics

}