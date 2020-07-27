const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8000;
const fetch = require("node-fetch");
const Parser = require("rss-parser");


// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const parser = new Parser();
const itemsArray = [];

app.get("/rssFeedData", async (req, res) => {
      try {
           const url = req.query.url;
           console.log("Url is:", url);
           const response = await parser.parseURL(url);
           console.log("Response was parsed ok!!!")
           response.items.forEach( item => {
              console.log(item.title + " : " + item.link);
              itemsArray.push(item.title);
           });
           res.status(200).send(res.json({
               status: 'success',
               message: itemsArray
           }));
      }
      catch(err) {
         // console.log("Error happened is:", err);
         console.log(err.message)
          const error = new Error(err);
         // console.log("error object is:", error);
          res.status(500).send(res.json({
               status: 'error',
               message: err.message
          }));
          //res.render('error', { error: err })
      }
});


app.listen(port, () => console.log(`Rss feed api app listening on port ${port}!`));