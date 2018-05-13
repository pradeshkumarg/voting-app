const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
var router = express.Router({
  caseSensitive:true
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
