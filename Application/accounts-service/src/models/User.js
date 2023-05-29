require('dotenv').config();
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const structure = {
    name: {
        type: String,
        required: [true, 'name is required'],
        minlength: 1,
        maxlength: 35,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: 6,
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email'],
        unique: true,
        lowercase: true
    }
}

const options = {
    timestamps: true
}

const UserSchema = new mongoose.Schema(structure, options)

// middlwares
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
UserSchema.methods.comparePassword = async function (canditatePassword) {
    return isMatch = await bcrypt.compare(canditatePassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)