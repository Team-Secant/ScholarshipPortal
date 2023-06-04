const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const othermember = require('../model/Othermember');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const {cloudinary} = require('../cloudinary')
const fetchuser = require('../middleware/fetchuserid')

const jwtseckey = `${process.env.JWT_SECRET_KEY}`;

// signup
router.post('/addothermember',[
    body('name','Please Enter Valid email').isLength({min:3}),
    body('email','Please Enter Valid email').isEmail(),
    body('password','Please Enter Valid email').isLength({min:5})
], async (req,res)=>{
    let success = false
    const error = validationResult(body);
    if(!error.isEmpty()){
        return res.status(400).json({success, error:'Please enter details correctly'});
    }
    else{
        try {
            const othermemberemail = await othermember.findOne({email:req.body.email})
            if(othermemberemail){
                return res.status(400).json({success, error:'Email already exist!'})
            }
            else{
                const salt = await bcrypt.genSalt(10);
                const secpass = await bcrypt.hash(req.body.password,salt);

                cloudinary.uploader.upload(req.body.incomeimg,{ folder: "other" + req.body.cnic }, async (err,result)=>{
                const othermemberdetails = await othermember.create({
                    usertype: req.body.usertype,
                    fname: req.body.fname,
                    lname: req.body.lname,
                    incomeimg: result.url,
                    incomeimgpid: result.public_id,
                    nationality: req.body.nationality,
                    cnic: req.body.cnic,
                    contact: req.body.contact,
                    soi: req.body.soi,
                    occupation: req.body.occupation,
                    monthlyinc: req.body.monthlyinc,
                    address: req.body.address,
                    postalcode: req.body.postalcode,
                    email: req.body.email,
                    password: secpass
                })

                const data = {
                    user: {
                        id: othermemberdetails._id
                    }
                }
                success = true
                const authtoken = jwt.sign(data,jwtseckey)
                res.json({success,authtoken});
            })
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
    }
});

// login
router.post('/login',[
    body('email','Please Enter Valid email').isEmail()
], async (req,res)=>{
    let success = false
    const error = validationResult(body);
    if(!error.isEmpty()){
        return res.status(400).json({success, error:'Please enter details correctly'});
    }
    else{
        try {
            const othermemberdata = await othermember.findOne({email:req.body.email,cnic:req.body.cnic})
            if(!othermemberdata){
                return res.status(400).json({success, error:'Please enter correct credentials'})
            }
            else{
                const pw = await bcrypt.compare(req.body.password,othermemberdata.password)
                if(!pw){
                    return res.status(400).json('Please enter correct credentials')
                }
                else{

                    const data = {
                        user: {
                            id: othermemberdata._id
                        }
                    }
                    success = true
                    const authtoken = jwt.sign(data,jwtseckey)
                    res.json({success,authtoken});
                }

            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
    }
});

// edit userdetails 
router.patch('/editothermember',[
    body('caption','caption length is too short').isLength({min:1}),
    ],fetchuser, async (req,res)=>{
        let success = false
        const error = validationResult(body);
        if(!error.isEmpty()){
            return res.status(400).json({success, error:'Please enter details correctly'});
        }
        else{
            try {
                const othermemberdetails = await othermember.findById(req.user.id)
                const result = await othermemberdetails.updateOne({
                    fname: req.body.fname,
                    lname: req.body.lname,
                    nationality: req.body.nationality,
                    cnic: req.body.cnic,
                    contact: req.body.contact,
                    soi: req.body.soi,
                    occupation: req.body.occupation,
                    monthlyinc: req.body.monthlyinc,
                    address: req.body.address,
                    postalcode: req.body.postalcode,
                    email: req.body.email,
                })
                res.json(result)
                
            } catch (error) {
                console.log(error);
                return res.status(500).json('Internal Server Error occured!');
            }
        }
    });
    
// fetchuser
router.get('/getothermember',fetchuser, async (req,res)=>{
        try {

            const othermemberid = req.user.id;
            const othermemberdata = await othermember.findById(othermemberid).select("-password");
            res.json(othermemberdata);

        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
});

// fetchalluser
router.get('/getallothermember', async (req,res)=>{
        try {

            const othermemberdata = await othermember.find().select("-password");
            res.json(othermemberdata);

        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
});
// fetch individual user
router.get('/getindothermember/:id', async (req,res)=>{
        try {
            const othermemberdata = await othermember.find({_id:req.params.id}).select("-password");
            res.json(othermemberdata);
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
});

module.exports = router;