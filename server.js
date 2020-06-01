if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config({path:require('path').join(__dirname, '.env')})
}
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const actressRouter = require('./routes/actress')

mongoose.connect('mongodb+srv://dunkbing:Io4M5NT08xVCESFv@cluster0-i2kla.gcp.mongodb.net/jav-idols?retryWrites=true&w=majority', {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error.message))
db.once('open', () => console.log('connected to mongoose'))

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/api/actress', actressRouter)

app.get('/', (req, res) => {
  res.send(db.collections)
})

app.listen(process.env.PORT || 8080)