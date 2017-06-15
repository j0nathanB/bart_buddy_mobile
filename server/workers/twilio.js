const express = require('express');
const router = express.Router();
const models = require('../../db/models');

var accountSid = 'AC1d5d92507963b3bad165e03a8f7cb211'; 
var authToken = 'c9f5d8ccc403f91d45a9c72ea80b8bfd';   

//var twilio = require('twilio');
//var client = new twilio(accountSid, authToken);
var axios = require('axios');

models.Profile.fetchAll()
    .then(profiles => {
      console.log(profiles);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      console.log(err);
    });
});
 
// axios.get('/retrieve').then( res => console.log(res)).catch(err => console.log(err))


// client.messages.create({
//   body: 'Bart Buddy >',
//   to: '+15106046933',  // Text this number
//   from: '+15109013127' // From a valid Twilio number
// })
// .then((message) => console.log(message.sid));