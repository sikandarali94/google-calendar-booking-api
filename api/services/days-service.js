const TimeService = require('./time-service');

const timeService = new TimeService().getInstance();

class DaysService {
    constructor(calendar) {
        this.calendar = calendar;
    }

    getDays(year, month, callback) {
        const monthDateRange = timeService.getStartEndMonth(year, month);
        this.calendar.listEvents(monthDateRange, callback);
    }
}

module.exports = DaysService;