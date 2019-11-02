const express = require('express');

const DaysService = require('../services/days-service');
const CalendarEvents = require('../../google-calendar/apis/calendar-events');

const router = express.Router();
const calendarEvents = new CalendarEvents().getInstance();
const daysService = new DaysService(calendarEvents);

router.get('/', (request, response, next) => {
    const { year, month } = request.query;
    daysService.getDays(year, month, (error, events) => {
        if (error) {
            next(error);
        } else {
            response.status(200).json(events.data.items);
        }
    });
});

module.exports = router;