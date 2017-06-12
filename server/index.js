'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Bart Buddy listening on port ${PORT}!`);
});