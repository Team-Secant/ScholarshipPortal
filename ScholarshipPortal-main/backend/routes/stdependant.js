const express = require('express');
const dependant = require('../model/StDependant');
const router = express.Router();
const fetchuser = require('../middleware/fetchuserid')


// add dependant
// router.post('/adddependant',fetchuser, async (req,res)=>{
//     try {
//         const data = {
//                 stid: req.user.id,
//                 depname: req.body.depname,
//                 deprel: req.body.deprel,
//                 depoccup: req.body.depoccup,
//                 depincome: req.body.depincome,
//                 totalearner: req.body.totalearner,
//                 famincome: req.body.famincome,
//                 depcontact: req.body.depcontact,
//                 depresadd: req.body.depresadd,
//                 monetaryamount: req.body.monetaryamount
//         };      // scehma ka object
//         const newdependant = new dependant(data);
//         const result = await newdependant.save();
//         res.status(201).json(result);
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
       
// });
// delete dependant
// router.delete('/deletedependant/:id', async (req,res)=>{

//     try {
//         await dependant.deleteOne({ _id: req.params.id });
//         res.status(201).json("dependant deleted Successfully");
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
       
// });
// update dependant
router.patch('/updatedependant/:id', async (req,res)=>{
    let acknowledged = false
    try {
        const admindependant = await dependant.findById(req.params.id)
        const result = await admindependant.updateOne(req.body)
        ack = true
        res.json({acknowledged: acknowledged, result:result})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error occured!');
    }
       
});
// fetch dependant
router.get('/fetchdependant', async (req,res)=>{

    try {
        const dependants = await dependant.find({})        // empty chora so all data ajaya ga
        res.status(200).json(dependants)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
       
});
// fetchdepinfo by stid
router.get('/fetchdependantbyst/:id', async (req,res)=>{

    try {
        const dependants = await dependant.find({stid:req.params.id})        // empty chora so all data ajaya ga
        res.status(200).json(dependants)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
       
});

// fetch one dependant
router.get('/fetchdependant/:id', async (req,res)=>{

    try {
        const dependants = await dependant.findById(req.params.id)        // empty chora so all data ajaya ga
        res.status(200).json(dependants)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
       
});

    

module.exports = router;