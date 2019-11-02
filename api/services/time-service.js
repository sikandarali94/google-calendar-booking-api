const moment = require('moment');

class TimeService {
    constructor() {}

    getStartEndMonth(year, month) {
        const startOfMonth = moment([year, month - 1]);
        const endOfMonth = moment(startOfMonth).endOf('month');

        return { timeMin: startOfMonth.toDate(), timeMax: endOfMonth.toDate() };
    }
}

class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new TimeService();
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

module.exports = Singleton;