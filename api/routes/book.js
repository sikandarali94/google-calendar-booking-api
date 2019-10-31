const express = require('express');
const router = express.Router();

router.post('/', (request, response) => {
    const { year, month, day, hour, minute} = request.query;

    response.status(201).json({
        message: '/book handler works',
        year,
        month,
        day,
        hour,
        minute
    });
});

module.exports = router;