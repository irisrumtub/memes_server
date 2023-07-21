const express = require('express');
const router = express.Router();
const path = require('path')
const msgsAndMemesByDay = require('../helpers/dateMesMem/dateMesMem')

//
router.get('/dateMesMem', async (req, res, next) => { 
   
    const startDate = req.query.start
    const endDate = req.query.end

    try {
        const response = await msgsAndMemesByDay(startDate, endDate); 
        res.json(response); 
    } catch (err) {
        
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
