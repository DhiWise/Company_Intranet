var express = require('express')
var cors = require('cors')
var axios = require('axios')
var nodemailer = require('nodemailer');
var app = express()
app.use(express.json());
app.use(cors())

//configure your application's credentials
const user = "YOUR_GMAIL"
const pass = "YOUR_APP_PASSWORD"

var transporter = transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: user,
    pass: pass
  }
})

app.post("/data", function (req, res) {
  axios(req.body)
    .then(function (response) {
      res.json(response.data)
    })
    .catch(function (error) {
      if (error.response) {
        res.status(error.response.status).send({
          message: error.response.data,
          status: error.response.status,
        });
      }
      res.json(error)
      return Promise.reject(err);
    });
})

app.post("/generateToken", function (req, res) {
  axios(req.body)
    .then(function (response) {
      res.json(response.data)
    })
    .catch(function (error) {
      if (error.response) {
        res.status(error.response.status).send({
          message: error.response.data,
          status: error.response.status,
        });
      }
      // console.log(error);
      res.json(error)
      return Promise.reject(error);
    });

});

app.post("/sendMail", function (req, res) {
  var mailOptions = {
    from: user,
    to: req.body.reciever,
    subject: req.body.subject,
    text: req.body.content
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
  res.send("Mail sent successfully")
})
app.listen(8045, function () {
  console.log('CORS-enabled web server listening on port 8045')
})
