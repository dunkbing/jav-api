if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config({path:'.env'})
}
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const actressRouter = require('./routes/actress')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to mongoose'))

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/api/actress', actressRouter)

app.get('/', (req, res) => {
  res.send('home')
})

app.listen(process.env.PORT || 8080)