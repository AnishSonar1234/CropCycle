const express = require("express");
const supabase = require("../config/supabase")
const router = express.Router();

router.get('/vegetable', async (req, res) => {
    // const { data, error } = await supabase.from('doctor').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

module.exports = router;