const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const student = require('../model/Student');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const {cloudinary} = require('../cloudinary')
const dependant = require('../model/StDependant');


const fetchuser = require('../middleware/fetchuserid');
const { fabClasses } = require('@mui/material');

const jwtseckey = `${process.env.JWT_SECRET_KEY}`;

// signup
router.post('/addstudent',[
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
            const studentemail = await student.findOne({email:req.body.email})
            if(studentemail){
                return res.status(400).json({success, error:'Email already exist!'})
            }
            else{
                const salt = await bcrypt.genSalt(10);
                const secpass = await bcrypt.hash(req.body.password,salt);
                const studentdetails = await student.create({
                    usertype: req.body.usertype,
                    cao: req.body.cao,
                    fname: req.body.fname,
                    lname: req.body.lname,
                    province: req.body.province,
                    district: req.body.district,
                    resadd: req.body.resadd,
                    peradd: req.body.peradd,
                    fatherstat: req.body.fatherstat,
                    motherstat: req.body.motherstat,
                    rollno: req.body.rollno,
                    cnic: req.body.cnic,
                    contact: req.body.contact,
                    sttype: req.body.sttype,
                    stdepart: req.body.stdepart,
                    stbatch: req.body.stbatch,
                    stdegree: req.body.stdegree,
                    stsem: req.body.stsem,
                    styear: req.body.styear,
                    stcgpa: req.body.stcgpa,
                    email: req.body.email,
                    password: secpass
                })

                const depdetails = dependant.create({
                    stid: studentdetails._id
                })
                console.log(depdetails)

                const data = {
                    user: {
                        id: studentdetails._id
                    }
                }
                success = true
                const authtoken = jwt.sign(data,jwtseckey)
                res.json({success,authtoken});
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
            const studentdata = await student.findOne({email:req.body.email,cnic:req.body.cnic})
            if(!studentdata){
                return res.status(400).json({success, error:'Please enter correct credentials'})
            }
            else{
                const pw = await bcrypt.compare(req.body.password,studentdata.password)
                if(!pw){
                    return res.status(400).json('Please enter correct credentials')
                }
                else{

                    const data = {
                        user: {
                            id: studentdata._id
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
router.patch('/editstudent',[
    body('caption','caption length is too short').isLength({min:1}),
    ],fetchuser, async (req,res)=>{
        let acknowledged = false
        const error = validationResult(body);
        if(!error.isEmpty()){
            return res.status(400).json({success, error:'Please enter details correctly'});
        }
        else{
            try {
                const studentdetails = await student.findById(req.user.id)
                const result = await studentdetails.updateOne({
                    cao: req.body.cao,
                    fname: req.body.fname,
                    lname: req.body.lname,
                    stimg: req.body.stimg,
                    province: req.body.province,
                    district: req.body.district,
                    resadd: req.body.resadd,
                    peradd: req.body.peradd,
                    fatherstat: req.body.fatherstat,
                    motherstat: req.body.motherstat,
                    rollno: req.body.rollno,
                    cnic: req.body.cnic,
                    contact: req.body.contact,
                    sttype: req.body.sttype,
                    stdepart: req.body.stdepart,
                    stbatch: req.body.stbatch,
                    stdegree: req.body.stdegree,
                    stsem: req.body.stsem,
                    styear: req.body.styear,
                    stcgpa: req.body.stcgpa,
                    email: req.body.email,
                })
                acknowledged=true
                res.json({acknowledged,result})
                
            } catch (error) {
                acknowledged=false
                console.log(error);
                return res.status(500).json(acknowledged,'Internal Server Error occured!');
            }
        }
    });


// update documents 
router.patch('/updatestdocs',fetchuser, async (req,res)=>{
        let success = false
        const error = validationResult(body);
        if(!error.isEmpty()){
            return res.status(400).json({success, error:'Please enter details correctly'});
        }
        else{
            try {
                const studentdetails = await student.findById(req.user.id)
                // console.log(req.body)
                for (const imageName in req.body) {
                    const imageBase64 = req.body[imageName];
                    cloudinary.uploader.upload(imageBase64, { folder: studentdetails.fname + studentdetails.cnic }, async (error, result) => {
                      if (error) console.error(error);
                      else {
                        // Store the Cloudinary URL of the uploaded image in MongoDB
                        const imageUrl = result.url;
                        // console.log(imageName)
                        const finalresult = await studentdetails.updateOne({
                            [imageName]:imageUrl,
                            [imageName+"pid"]: result.public_id
                        })
                        console.log(finalresult)
                    }
                });
                }
            success = true;
            res.status(200).json(success,"Docs Updated Successfully");
                
            } catch (error) {
                console.log(error);
                success = false
                return res.status(500).json(success,'Internal Server Error occured!');
            }
        }
    });

// delete docs 
router.delete('/dltdocs',fetchuser, async (req,res)=>{
    let success = false
    const error = validationResult(body);
    if(!error.isEmpty()){
        return res.status(400).json({success, error:'Please enter details correctly'});
    }
    else{
        try {
            // const studentdetails = await student.findById(req.user.id)
            // console.log(req.body)
            for (const idName in req.body) {
                const imageid = req.body[idName];
                cloudinary.uploader.destroy(imageid, (error, result) => {
                  if (error) console.error(error);
                  else {
                    console.log(result)
                    }
                });
            }
        success = true;
        res.status(200).json(success,"Images deleted from cloudinary")
            
        } catch (error) {
            console.log(error);
            success = false
            return res.status(500).json(success,'Internal Server Error occured!');
        }
    }
});
    
// fetchuser
router.get('/getstudent',fetchuser, async (req,res)=>{
        try {

            const studentid = req.user.id;
            const studentdata = await student.findById(studentid).select("-password");
            res.json(studentdata);

        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
});

// fetchalluser
router.get('/getallstudent', async (req,res)=>{
        try {

            const studentdata = await student.find().select("-password");
            res.json(studentdata);

        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
});
// fetch individual user
router.get('/getindstudent/:id', async (req,res)=>{
        try {
            const studentdata = await student.find({_id:req.params.id}).select("-password");
            res.json(studentdata);
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
});
// dlt user
router.delete('/dltindstudent/:id', async (req,res)=>{
        try {
            const studentdata = await student.deleteOne({_id:req.params.id});
            res.json(studentdata);
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
});

module.exports = router;