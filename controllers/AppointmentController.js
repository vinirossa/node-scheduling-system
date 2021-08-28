const mongoose = require('mongoose')
const Appointment = mongoose.model("Appointment", require("../models/Appointment"))
const AppointmentFactory = require('../factories/AppointmentFactory.js');

class AppointmentController {

    async create(name, email, cpf, description, date, time) {

        var newAppointment = new Appointment({
            name,
            email,
            cpf,
            description,
            date,
            time,
            finished: false,
            notified: false
        })

        try {
            await newAppointment.save()
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async getAll(showFinished) {

        if (showFinished) {
            return await Appointment.find()
        } else {
            var simpleAppointments = await Appointment.find({ finished: false })
            var appointments = []

            simpleAppointments.forEach(appointment => {
                if (appointment.date != undefined) {
                    appointments.push(AppointmentFactory.Build(appointment))
                }
            })

            return appointments
        }
    }

    async getById(id) {
        try {
            var appointment = await Appointment.findOne({ _id: id })
            return appointment
        } catch (err) {
            console.log(err)
        }
    }

    async finish(id) {

        try {
            await Appointment.findByIdAndUpdate(id, { finished: true })
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async search(query) {
        try {
            var appointments = await Appointment.find().or([{ email: query }, { cpf: query }])
            return appointments
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async sendNotification() {
        var appointments = await this.getAll(false)
        appointments.forEach(appointment => {

            var date = appointment.start.getTime()
            var alertInterval = 1000 * 60 * 60
            var gap = date - Date.now()

            if (gap < alertInterval & gap > 0) {
                console.log(appointment.title);

                console.log("Enviar notificação");
            }
        })
    }
}

module.exports = new AppointmentController()