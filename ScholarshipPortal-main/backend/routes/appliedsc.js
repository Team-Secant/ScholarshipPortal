const express = require('express');
const application = require('../model/AppliedSc');
const router = express.Router();
const fetchuser = require('../middleware/fetchuserid')


// add application
router.post('/addapplication',fetchuser, async (req,res)=>{
    try {
        const data = {
            stid: req.user.id,
            scid: req.body.scid
        };      // scehma ka object
        const newapplication = new application(data);
        const result = await newapplication.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
       
});
// delete application
router.delete('/deleteapplication/:id', async (req,res)=>{

    try {
        await application.deleteOne({ _id: req.params.id });
        res.status(201).json("application deleted Successfully");
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
       
});
// update application
router.patch('/updateapplication/:id', async (req,res)=>{

    try {
        const adminapplication = await application.findById(req.params.id)
        const result = await adminapplication.updateOne(req.body)
        res.json(result)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error occured!');
    }
       
});
// fetch application
router.get('/fetchapplication', async (req,res)=>{

    try {
        const applications = await application.find({})        // empty chora so all data ajaya ga
        res.status(200).json(applications)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
       
});

// fetch one application
router.get('/fetchapplication/:id', async (req,res)=>{

    try {
        const applications = await application.findById(req.params.id)        // empty chora so all data ajaya ga
        res.status(200).json(applications)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
       
});

    

module.exports = router;