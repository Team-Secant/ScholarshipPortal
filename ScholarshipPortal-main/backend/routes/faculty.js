const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const faculty = require('../model/Faculty');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const generateVerificationToken = require('../utils/auth')
const sendVerificationEmail = require('../helpers/Sendemail')
const fetchuser = require('../middleware/fetchuserid')

const jwtseckey = `${process.env.JWT_SECRET_KEY}`;

// signup
router.post('/addfaculty',[
    body('fname','Please enter valid first name').isLength({min:3}),
    body('lname','Please enter valid last name').isLength({min:3}),
    body('email','Please enter Valid email').isEmail(),
    body('password','Minimum Password length is 5.').isLength({min:5})
], async (req,res)=>{
    let success = false
    const error = await validationResult(body);
    if(!error.isEmpty()){
        return res.status(400).json({success, error:error[1]});
    }
    else{
        try {
            const facultyemail = await faculty.findOne({email:req.body.email})
            if(facultyemail){
                return res.status(400).json({success, error:'Email already exist!'})
            }
            else{
                const salt = await bcrypt.genSalt(10);
                const secpass = await bcrypt.hash(req.body.password,salt);
                const verificationToken = generateVerificationToken();
                const facultydetails = await faculty({
                    usertype: req.body.usertype,
                    fname: req.body.fname,
                    lname: req.body.lname,
                    nationality: req.body.nationality,
                    cnic: req.body.cnic,
                    facdepart: req.body.facdepart,
                    contact: req.body.contact,
                    email: req.body.email,
                    password: secpass,
                    verificationToken: verificationToken,
                    isVerified: false
                })
                await sendVerificationEmail(facultydetails.email, facultydetails.verificationToken, facultydetails._id,facultydetails.usertype);
                const createdUser = await facultydetails.save();
                success = true
                res.status(200).json({ data: createdUser,success: success, message: "user added success..." });
                // const data = {
                //     user: {
                //         id: facultydetails._id
                //     }
                // }
                // success = true
                // const authtoken = jwt.sign(data,jwtseckey)
                // res.json({success,authtoken});
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({error:error,msg:'Internal Server Error occured!'});
        }
    }
});

//Email Verification
router.get('/verify/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const user = await faculty.findOne({
            _id: req.params.id
        });
        if (!user) return res.status(400).json("Invalid link");
        await faculty.findByIdAndUpdate({
            _id: user._id
        }, {
            isVerified: true
        });
        res.status(200).json({
            message: "Your email has been verified successfully"
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "error"
        });
    }
})

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
            const facultydata = await faculty.findOne({email:req.body.email,cnic:req.body.cnic})
            if(!facultydata){
                return res.status(400).json({success, error:'Please enter correct credentials'})
            }
            if (!facultydata.isVerified) {
                return res.status(400).json({ success: false, error: true, message: "Please verify your email" })
            }
            else{
                const pw = await bcrypt.compare(req.body.password,facultydata.password)
                if(!pw){
                    return res.status(400).json('Please enter correct credentials')
                }
                else{

                    const data = {
                        user: {
                            id: facultydata._id
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
router.patch('/editfaculty',[
    body('caption','caption length is too short').isLength({min:1}),
    ],fetchuser, async (req,res)=>{
        let success = false
        const error = validationResult(body);
        if(!error.isEmpty()){
            return res.status(400).json({success, error:'Please enter details correctly'});
        }
        else{
            try {
                const facultydetails = await faculty.findById(req.user.id)
                const result = await facultydetails.updateOne({
                    fname: req.body.fname,
                    lname: req.body.lname,
                    nationality: req.body.nationality,
                    cnic: req.body.cnic,
                    facdepart: req.body.facdepart,
                    contact: req.body.contact,
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
router.get('/getfaculty',fetchuser, async (req,res)=>{
        try {

            const facultyid = req.user.id;
            const facultydata = await faculty.findById(facultyid).select("-password");
            res.json(facultydata);

        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
});

// fetchalluser
router.get('/getallfaculty', async (req,res)=>{
        try {

            const facultydata = await faculty.find().select("-password");
            res.json(facultydata);

        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
});
// fetch individual user
router.get('/getindfaculty/:id', async (req,res)=>{
        try {
            const facultydata = await faculty.find({_id:req.params.id}).select("-password");
            res.json(facultydata);
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
});

// dlt user
router.delete('/dltindfaculty/:id', async (req,res)=>{
    try {
        const facultydata = await faculty.deleteOne({_id:req.params.id});
        res.json(facultydata);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error occured!');
    }
});

module.exports = router;