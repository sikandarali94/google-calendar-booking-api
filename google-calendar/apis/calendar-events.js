const { google } = require('googleapis');

const GoogleCalendar = require('../index');

class CalendarEvents extends GoogleCalendar {
    constructor() {
        super();
    }

    listEvents({ timeMin, timeMax }, callback) {
        const calendar = google.calendar({version: process.env.CALENDAR_VERSION, auth: this.authToken});
        calendar.events.list({
            calendarId: process.env.CALENDAR_ID,
            singleEvents: true,
            timeMin,
            timeMax,
            orderBy: 'startTime'
        }, (error, response) => {
            if (error) {
                console.log('The Google Calendar API returned an error: ', error);
            }
            callback(error, response);
        });
    }
}

class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new CalendarEvents();
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

module.exports = Singleton;