const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const alumni = require('../model/Alumni');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const {cloudinary} = require('../cloudinary')

const fetchuser = require('../middleware/fetchuserid')

const jwtseckey = `${process.env.JWT_SECRET_KEY}`;

// signup
router.post('/addalumni',[
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
            const alumniemail = await alumni.findOne({email:req.body.email})
            if(alumniemail){
                return res.status(400).json({success, error:'Email already exist!'})
            }
            else{
                const salt = await bcrypt.genSalt(10);
                const secpass = await bcrypt.hash(req.body.password,salt);

                cloudinary.uploader.upload(req.body.incomeimg,{ folder: "alumni" + req.body.cnic }, async (err,result)=>{
                const alumnidetails = await alumni.create({
                    usertype: req.body.usertype,
                    fname: req.body.fname,
                    lname: req.body.lname,
                    incomeimg: result.url,
                    incomeimgpid: result.public_id,
                    nationality: req.body.nationality,
                    cnic: req.body.cnic,
                    contact: req.body.contact,
                    yog: req.body.yog,
                    degree: req.body.degree,
                    job: req.body.job,
                    occupation: req.body.occupation,
                    monthlyinc: req.body.monthlyinc,
                    address: req.body.address,
                    postalcode: req.body.postalcode,
                    email: req.body.email,
                    password: secpass
                })
                const data = {
                    user: {
                        id: alumnidetails._id
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
            const alumnidata = await alumni.findOne({email:req.body.email,cnic:req.body.cnic})
            if(!alumnidata){
                return res.status(400).json({success, error:'Please enter correct credentials'})
            }
            else{
                const pw = await bcrypt.compare(req.body.password,alumnidata.password)
                if(!pw){
                    return res.status(400).json('Please enter correct credentials')
                }
                else{

                    const data = {
                        user: {
                            id: alumnidata._id
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
router.patch('/editalumni',[
    body('caption','caption length is too short').isLength({min:1}),
    ],fetchuser, async (req,res)=>{
        let success = false
        const error = validationResult(body);
        if(!error.isEmpty()){
            return res.status(400).json({success, error:'Please enter details correctly'});
        }
        else{
            try {
                const alumnidetails = await alumni.findById(req.user.id)
                const result = await alumnidetails.updateOne({
                    fname: req.body.fname,
                    lname: req.body.lname,
                    nationality: req.body.nationality,
                    cnic: req.body.cnic,
                    contact: req.body.contact,
                    yog: req.body.yog,
                    degree: req.body.degree,
                    job: req.body.job,
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
router.get('/getalumni',fetchuser, async (req,res)=>{
        try {

            const alumniid = req.user.id;
            const alumnidata = await alumni.findById(alumniid).select("-password");
            res.json(alumnidata);

        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
});

// fetchalluser
router.get('/getallalumni', async (req,res)=>{
        try {

            const alumnidata = await alumni.find().select("-password");
            res.json(alumnidata);

        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
});
// fetch individual user
router.get('/getindalumni/:id', async (req,res)=>{
        try {
            const alumnidata = await alumni.find({_id:req.params.id}).select("-password");
            res.json(alumnidata);
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
});

module.exports = router;