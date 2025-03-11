const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        match: [/[0-9]{10}/, "Please enter a valid phone number"]
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
    },
    role:{
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    },
},
{timestamps: true}
);

//password Hash Middleware
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
});

//Match user entered password to hashed password
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("User", userSchema)