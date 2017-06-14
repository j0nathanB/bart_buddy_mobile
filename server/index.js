'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.PORT || 1337;
const twilio = require('./workers/twilio')

app.listen(PORT, () => {
    console.log(`Bart Buddy listening on port ${PORT}!`);
});