const express = require('express')
const router = express.Router()
const {Actress} = require('../models/actress')

router.get('/', async (req, res) => {
  const offset = req.query.offset ? Number(req.query.offset) : 0
  const limit = 20
  try {
    const actresses = [...(await Actress.find().skip(offset).limit(limit))].map(item => {
      const {name, _id} = item
      return {name, url: `http://localhost:8080/api/actress/${name}/${_id}`}
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
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/:name', async(req, res) => {
  try {
    const name = req.params.name
    const actresses = (await Actress.find({name}).exec()).map(item => {
      const {_id, name, imgUrl, dateOfBirth, placeOfBirth, debut, yearsActive, measurements, cup, height, starSign, bloodType, films} = item
      const url = `http://localhost:8080/api/actress/${name}/${_id}`
      return {name, url, imgUrl, dateOfBirth, placeOfBirth, debut, yearsActive, measurements, cup, height, starSign, bloodType, films}
    })
    res.status(200).json(actresses)
  } catch (error) {
    console.error(error)
    res.status(404).json(error)
  }
})

router.get('/:name/:_id', async(req, res) => {
  const name = req.params.name
  const _id = req.params._id
  try {
    const [actress] = await Actress.find({name, _id}).exec()
    res.json(actress)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router