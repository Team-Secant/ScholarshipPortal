const express = require('express');
const scholarship = require('../model/Scholarship');
const router = express.Router();

// add scholarship
router.post('/addscholarship', async (req,res)=>{
    try {
        const data = req.body;      // scehma ka object
        const newscholarship = new scholarship(data);
        const result = await newscholarship.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
       
});
// delete scholarship
router.delete('/deletescholarship/:id', async (req,res)=>{

    try {
        await scholarship.deleteOne({ _id: req.params.id });
        res.status(201).json("scholarship deleted Successfully");
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
       
});
// update scholarship
router.patch('/updatescholarship/:id', async (req,res)=>{

    try {
        const adminscholarship = await scholarship.findById(req.params.id)
        const result = await adminscholarship.updateOne(req.body)
        res.json(result)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error occured!');
    }
       
});
// update scholarship status
router.patch('/updatescstatus/:id', async (req,res)=>{

    try {
        const adminscholarship = await scholarship.findById(req.params.id)
        const result = await adminscholarship.updateOne({status: req.body.status})
        res.json(result)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error occured!');
    }
       
});
// fetch scholarship
router.get('/fetchscholarship', async (req,res)=>{

    try {
        const scholarships = await scholarship.find({})        // empty chora so all data ajaya ga
        res.status(200).json(scholarships)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
       
});

// fetch one scholarship
router.get('/fetchscholarship/:id', async (req,res)=>{

    try {
        const scholarships = await scholarship.findById(req.params.id)        // empty chora so all data ajaya ga
        res.status(200).json(scholarships)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
       
});

    

module.exports = router;