const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const ContactRoutes = require('./routes/contacts')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(ContactRoutes)

async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://vasil:1q2w3e4r@cluster0-oaiwg.mongodb.net/app',
            {
                useNewUrlParser: true,
                useFindAndModify: false
            }
        )
        app.listen(PORT, () => {
            console.log('Server has been started...')
        })
    } catch (e) {
        console.log(e)
    }
}

start()
