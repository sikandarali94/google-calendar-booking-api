const express = require('express');
const morgan = require('morgan');

const daysRoute = require('./api/routes/days');
const timeslotsRoute = require('./api/routes/timeslots');
const bookRoute = require('./api/routes/book');

const app = express();

app.use(morgan('dev'));

app.use('/days', daysRoute);
app.use('/timeslots', timeslotsRoute);
app.use('/book', bookRoute);

app.use((request, response, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, request, response) => {
    response.status(error.status || 500);
    response.json({
        success: false,
        message: error.message
    })
});

module.exports = app;