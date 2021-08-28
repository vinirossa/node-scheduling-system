class AppointmentFactory {

    Build(simpleAppointment) {

        var day = simpleAppointment.date.getDate() + 1
        var month = simpleAppointment.date.getMonth()
        var year = simpleAppointment.date.getFullYear()
        var hour = Number.parseInt(simpleAppointment.time.split(':')[0])
        var minutes = Number.parseInt(simpleAppointment.time.split(':')[1])

        var startDate = new Date(year, month, day, hour, minutes, 0, 0)

        var endDate = new Date(year, month, day, hour, minutes, 0, 0)
        endDate.setHours(endDate.getHours() + 1)

        var appointment = {
            id: simpleAppointment._id,
            title: simpleAppointment.name + " - " + simpleAppointment.description,
            start: startDate,
            end: endDate,
            notified: simpleAppointment.notified
        }

        return appointment
    }

}

module.exports = new AppointmentFactory()