const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const AppointmentController = require('./controllers/AppointmentController');

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set("view engine", "ejs")

mongoose.connect("mongodb://localhost:27017/sistemaAgendamentos", { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useFindAndModify', false)

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/appointment/create", (req, res) => {
    res.render("create")
})

app.post("/appointment/create", async(req, res) => {

    var result = await AppointmentController.create(
        req.body.name,
        req.body.email,
        req.body.cpf,
        req.body.description,
        req.body.date,
        req.body.time
    )

    if (!result) {
        res.send("Ocorreu um erro ao incluir o registro.")
    }

    res.redirect("/")
})

app.get("/appointments/calendar", async(req, res) => {
    var appointments = await AppointmentController.getAll(false)
    res.json(appointments)
})

app.get("/appointment/:id", async(req, res) => {
    var appointment = await AppointmentController.getById(req.params.id)

    res.render("appointment", { appointment })
})

app.post("/appointment/finish", async(req, res) => {
    var id = req.body.id

    await AppointmentController.finish(id)

    res.redirect("/")
})

app.get("/appointments", async(req, res) => {
    var appointments = await AppointmentController.getAll(true)
    await AppointmentController.search("pedro@gmail.com")

    res.render("appointments", { appointments })
})

app.get("/appointments/search", async(req, res) => {
    var query = req.query.search
    var appointments = await AppointmentController.search(query)

    res.render("appointments", { appointments })
})

var poolTime = 5 * 60000

setInterval(() => {
    AppointmentController.sendNotification()
}, poolTime)


app.listen(8080, () => {
    console.log("Servidor rodando...")
})