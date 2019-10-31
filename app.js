const express = require('express');

const daysRoute = require('./api/routes/days');
const timeslotsRoute = require('./api/routes/timeslots');
const bookRoute = require('./api/routes/book');

const app = express();

app.use('/days', daysRoute);
app.use('/timeslots', timeslotsRoute);
app.use('/book', bookRoute);

module.exports = app;