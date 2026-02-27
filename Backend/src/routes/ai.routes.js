const express = require('express');
const aiSevice = require('../services/ai.service');
const router = express.Router();


router.post('/generate', async (req, res) => {
    const {code} = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Code is required' });
    }
    const response = await aiSevice(code);
    res.json({ response });

});


module.exports = router;