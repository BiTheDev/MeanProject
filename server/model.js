const goose = require("mongoose");
// const uniqueValidator = require('mongoose-unique-validator');

goose.connect("mongodb://localhost:27017/Belt", {useNewUrlParser: true},(errs)=> console.log(errs?errs:"db Belt"));
