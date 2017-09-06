const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const session = require('express-session')

const port = process.env.PORT || 3000

const app = express()

const sessionOptions = {
  name: 'session',
  secret: 'Chamber of Secrets',
  cookie: {maxAge: 1000 * 60 * 60 * 24},
  resave: false,
  saveUninitialized: false,
}

require('ejs')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(session(sessionOptions))

app.use('/', routes)

app.use((req, res) => {
  res.status(404).render('not_found')
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
