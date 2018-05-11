// Load in modules

var express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load in environment variables

dotenv.config({
  verbose:true;
});
