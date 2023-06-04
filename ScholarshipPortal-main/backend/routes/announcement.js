const express = require('express');
const announcement = require('../model/Announcement');
const router = express.Router();



// add announcement
router.post('/addannounce', async (req,res)=>{
    try {
        const data = req.body;      // scehma ka object
        const newAnnoucement = new announcement(data);
        const result = await newAnnoucement.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
       
});
// delete announcement
router.delete('/deleteannounce/:id', async (req,res)=>{

    try {
        await announcement.deleteOne({ _id: req.params.id });
        res.status(201).json("Annoucement deleted Successfully");
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
       
});
// update announcement
router.patch('/updateannounce/:id', async (req,res)=>{

    try {
        const adminannounce = await announcement.findById(req.params.id)
        const result = await adminannounce.updateOne(req.body)
        res.json(result)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error occured!');
    }
       
});
// fetch announcement
router.get('/fetchannounce', async (req,res)=>{

    try {
        const annoucements = await announcement.find({})        // empty chora so all data ajaya ga
        res.status(200).json(annoucements)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
       
});

// fetch one announcement
router.get('/fetchannounce/:id', async (req,res)=>{

    try {
        const annoucements = await announcement.findById(req.params.id)        // empty chora so all data ajaya ga
        res.status(200).json(annoucements)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
       
});

    

module.exports = router;