if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config({path:'.env'})
}
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {Actress} = require('./models/actress')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to mongoose'))
console.log(db.collection('actress'))

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/api/actress', async (req, res) => {
  const offset = req.query.offset ? Number(req.query.offset) : 0
  const limit = 20
  const actresses = [...(await Actress.find({}).skip(offset).limit(limit))].map(item => {
    const {films, imgUrl, dateOfBirth, placeOfBirth, debut, yearsActive, measurements, cup, height, starSign, bloodType} = item
    return {films, imgUrl, dateOfBirth, placeOfBirth, debut, yearsActive, measurements, cup, height, starSign, bloodType}
  })
  const results = {}
  if(offset > 0){
    const prevUrl = `http://localhost:8080/api/actress?offset=${offset-20}&limit=${limit}`
    results.prevUrl = prevUrl
  }
  const nextUrl = `http://localhost:8080/api/actress?offset=${offset+20}&limit=${limit}`
  results.nextUrl = nextUrl
  results.results = actresses
  res.json(results)
})

app.listen(process.env.PORT || 8080)