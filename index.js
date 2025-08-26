 const express = require("express");
const urlRoute =require("./routes/url");

const {connectToMongooseDB} =require("./conntect");
 const app = express();
 const PORT = 8001;

connectToMongooseDB("mongodb://127.0.0.1:27017/shorturl ").then(()=> console.log("mongoose connected "));



 app.use(express.json());
 app.use("/url",urlRoute);

 app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`)

 );