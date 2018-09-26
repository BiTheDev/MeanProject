const goose = require("mongoose");
// const uniqueValidator = require('mongoose-unique-validator');

goose.connect("mongodb://localhost:27017/Project", {useNewUrlParser: true},(errs)=> console.log(errs?errs:"db Project"));


const DateSchema = new goose.Schema({
    date:{
        type:Date,
        required: [true, "Meet up time is missing"]
    },
    time:{
        type:Date,
        required:[true, "time?"]
    },
    location:{
        type: String,
    },
    activity:{
        type:String,
    },
    dressCode:{
        type:String,
        required:[true, " Oops, you forgot dress code"],

    },
    user1:{
        type:Object
    },
    user2:{
        type:Object,
    },
    invitation:{
        type:Boolean,
        default:true
    }
})



const UserSchema = new goose.Schema({
    firstname: 
    {
        type : String,
        required :[true, "Please enter your first name!"],
        minlength:[2,"Name must be longer than 2 characters"]
    },
    lastname:{
        type: String,
        required :[true, "Please enter your last name!"],
        minlength:[2,"Name must be longer than 2 characters"]
    },
    email : {
        type : String,
        required : [true, "Please enter your email"],
        unique : true,
        match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/, 'Invalid email address']
    },
    password : {
        type : String,
        minlength : [8, "User password requires at least 8 characters"]
    },
    gender:{
        type:String,
        required : [true, "Please select your gender"]
    },
    age:{
        type:Number,
        required:[true, "Please enter your age !"],
        min:[18, "You must be older than 18 !"]
    },
    city:{
        type:String,
        required:[true, "City name is missing"]
    },
    Date:[DateSchema],
})

// UserSchema.plugin(uniqueValidator,  { message: 'Error, {PATH} already in the database' });

module.exports = goose.model('User', UserSchema)

