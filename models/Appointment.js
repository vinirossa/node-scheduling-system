const mongoose = require('mongoose')

const Appointment = new mongoose.Schema({
    name: String,
    email: String,
    cpf: String,
    description: String,
    date: Date,
    time: String,
    finished: Boolean,
    notified: Boolean
})

module.exports = Appointment