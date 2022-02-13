// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

require('dotenv').config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const res = require('express/lib/response');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
});

app.get("/api/", function (req, res) {
  res.json({
    utc: new Date(),
    unix: Date.now()
  });
});

app.get("/api/:dateInput", (req,res) => {
  const dateInput = req.params.dateInput

  // Calculate utc or unix date assuming input in  correct format
  let textDate = new Date(dateInput)
  let unixDate = new Date(Number(dateInput))

  // Check is input unix / utc format
  let isInputUnixDate = unixDate.getDate() === unixDate.getDate()
  let isInputTextDate = textDate.getDate() === textDate.getDate()
  
  let dateObj = {
    utc: "",
    unix: ""
  }

  // Check valid date entered for dateInput parameter
  if (!isInputUnixDate && !isInputTextDate) {
    res.json({error: 'Invalid Date'})
  // Provie response object, using the valid input format for basis.
  } else  {
      if (isInputUnixDate) {
        dateObj.utc = unixDate.toGMTString();
        dateObj.unix = unixDate.valueOf()
      } else {
        dateObj.utc = textDate.toGMTString();
        dateObj.unix = textDate.valueOf()
      }
    res.json(dateObj)
  }
  
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
