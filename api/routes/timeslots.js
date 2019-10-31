const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    const { year, month, day} = request.query;

    response.status(200).json({
        message: '/timeslots handler works',
        year,
        month,
        day
    });
});

module.exports = router;