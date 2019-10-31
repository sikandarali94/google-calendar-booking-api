const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    const { year, month} = request.query;

    response.status(200).json({
        message: '/days handler works',
        year,
        month
    });
});

module.exports = router;