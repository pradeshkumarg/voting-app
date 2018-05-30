const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
var router = express.Router({
  caseSensitive:true
});

// Login
router.post('/login',(req,res)=>{
  if(req.body.name && req.body.password){
    User.findOne({
      name:req.body.name
    },(err,user)=>{
      if(err){
        console.log('Error with db');
        res.status(400).send("An error occurred. Please try again..");
      }
      if(!user){
        console.log('No user');
        return res.status(404).send("No user has been registered with these credentials")
      }
      if(bcrypt.compareSync(req.body.password,user.password)){
        console.log('Passwords match');
        var token = jwt.sign({
          data:user
        },process.env.secret,{expiresIn:3600});
        return res.status(200).send(token);
      }
      console.log('Invalid password');
      return res.status(400).send("Password is incorrect");
    });
  }else {
    return res.status(400).send("Please enter valid credentials !!")
  }
});



// Register
router.post('/register',(req,res)=>{
  if(req.body.name && req.body.password){
    var user = new User();
    user.name= req.body.name;
    console.time("bcryptHashing");
    user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    console.timeEnd("bcryptHashing");
    user.save(function(err,document) {
      if(err){
        return res.status(400).send(err);
      }
      else {
        // return res.status(201).send(document);
        var token = jwt.sign({
          data:document
        },process.env.secret,{expiresIn:3600});
        return res.status(201).send(token);
      }
    });
  }
  else {
    return res.status(400).send({
      message:"Invalid credentials supplied!"
    });
  }
});












module.exports = router;
