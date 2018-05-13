const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
});

UserSchema.pre('save',function() {
  console.log("About to save user");
});
UserSchema.post('save',function() {
  console.log("Successfully saved user");
});

var Model = mongoose.model('User', UserSchema);

module.exports = Model;
