'use strict';
const app = require('./app');
const db = require('../db');
const update = require('./routes/update_schedule.js');
const schedule = require('./scheduler.js');
const twilio = require('./workers/twilio.js')
const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`Bart Buddy listening on port ${PORT}!`);
});