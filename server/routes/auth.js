const express = require('express');
const router = express.Router();
const models = require('../../db/models');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const moment = require('moment');
const ProfileControler = require('../controllers/profiles')
const createProfile = ProfileControler.create;
const getAllProfiles = ProfileControler.getAll;
const getOneProfile = ProfileControler.getOne;
const updateProfile = ProfileControler.update;
const deleteProfile = ProfileControler.deleteOne;

router.route('/delete')
  .get((req, res) => deleteProfile(req, res));

router.route('/update')
  .post((req, res) => updateProfile(req, res) );

router.route('/create')
  .post((req, res) => createProfile(req, res) );

router.route('/getAll')
  .get((req, res) => getAllProfiles(req, res));

router.route('/retrieve')
  .get((req, res) => getAllProfiles(req, res));

router.route('/inbound')
  .post((req, res) => {
    let resp  = new MessagingResponse();
    let time = moment().format('MMMM Do YYYY, h:mm');

    if (req.body.Body === "thanks" || req.body.Body === "Thanks") {
      //delete user from DB
      deleteProfile(req.body.From, res);

      resp.message(`You have been unsubscribed. Thank you for using Bart Buddy.`);
      res.send(resp.toString());
    } else if (req.body.Body === "demo" || req.body.Body === "Wizards") {
      createProfile(req.body.From);
      resp.message(`[BART Buddy]: It is ${time} and all is well. Text 'thanks' to unsubscribe.`);
      res.send(resp.toString());
    } else if (req.body.Body === "warriors" || req.body.Body === "Warriors"){
      resp.message(
        `Hire us! Find us on github: Greg (BOLT2612), Jackson (JacksonRMC), Jonathan (jlb1982), and Vaggelis (Vaggelis-Sotiropoulos)`);
      res.send(resp.toString());  
    } else {
      resp.message(`[BART Buddy]: ¯\\_(ツ)_/¯ Oops! BART Buddy doesn't recognize that command.`);
      res.send(resp.toString());  
    }
  });


module.exports = router;