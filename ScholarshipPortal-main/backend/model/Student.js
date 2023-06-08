const mongoose = require("mongoose");

const studentschema = new mongoose.Schema({
  usertype: {
    type: String,
    required: true,
  },
  cao: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  stimg: {
    type: String,
    required: true,
    default: "none",
  },
  stimgpid: {
    type: String,
    required: true,
    default: "none",
  },
  rollno: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  resadd: {
    type: String,
    required: true,
  },
  peradd: {
    type: String,
    required: true,
  },
  fatherstat: {
    type: String,
    required: true,
  },
  motherstat: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  sttype: {
    type: String,
    required: true,
  },
  stdepart: {
    type: String,
    required: true,
  },
  stbatch: {
    type: String,
    required: true,
  },
  stdegree: {
    type: String,
    required: true,
  },
  stsem: {
    type: String,
    required: true,
  },
  styear: {
    type: String,
    required: true,
  },
  stcgpa: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  stsscms: {
    type: String,
    required: true,
    default: "none",
  },
  stsscmspid: {
    type: String,
    required: true,
    default: "none",
  },
  sthscms: {
    type: String,
    required: true,
    default: "none",
  },
  sthscmspid: {
    type: String,
    required: true,
    default: "none",
  },
  stunicard: {
    type: String,
    required: true,
    default: "none",
  },
  stunicardpid: {
    type: String,
    required: true,
    default: "none",
  },
  depcnic: {
    type: String,
    required: true,
    default: "none",
  },
  depcnicpid: {
    type: String,
    required: true,
    default: "none",
  },
  ssccert: {
    type: String,
    required: true,
    default: "none",
  },
  ssccertpid: {
    type: String,
    required: true,
    default: "none",
  },
  unims: {
    type: String,
    required: true,
    default: "none",
  },
  unimspid: {
    type: String,
    required: true,
    default: "none",
  },
  depsalaryimg: {
    type: String,
    required: true,
    default: "none",
  },
  depsalaryimgpid: {
    type: String,
    required: true,
    default: "none",
  },
  billimg1: {
    type: String,
    required: true,
    default: "none",
  },
  billimg1pid: {
    type: String,
    required: true,
    default: "none",
  },
  billimg2: {
    type: String,
    required: true,
    default: "none",
  },
  billimg2pid: {
    type: String,
    required: true,
    default: "none",
  },
  isVerified: { type: Boolean, default: false },
  verificationCode: String,
});

const studentmodel = mongoose.model("Student", studentschema);
module.exports = studentmodel;
