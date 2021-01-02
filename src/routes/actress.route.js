import { Router } from 'express';
import { ActressModel as Actress } from '../models/actress.model.js';
import { getAll, getById, getManyByName } from '../services/actress.service.js';

const router = Router()

router.get('/', async (req, res) => {
  const offset = req.query.offset ? Number(req.query.offset) : 0
  const limit = 20
  try {
    const results = await getAll(offset, limit);
    res.json(results)
  } catch (error) {
    res.status(500).json({error: error?.message})
  }
})

router.get('/detail/:name', async(req, res) => {
  try {
    const name = req.params.name
    const actresses = await getManyByName(name);
    res.status(200).json(actresses)
  } catch (error) {
    console.error(error)
    res.status(404).json(error)
  }
})

router.get('/:_id', async(req, res) => {
  const _id = req.params._id;
  console.log(_id)
  try {
    const actress = await getById(_id);
    if (actress) {
      res.json(actress);
    } else {
      res.status(404).send({ message: 'not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
})

router.post('/', async(req, res) => {
  const { name, url, imgUrl, dateOfBirth, placeOfBirth, debut, yearsActive, measurements, cup, height, starSign, bloodType, films } = req.body;
  try {
    await Actress.create({name, url, imgUrl, dateOfBirth, placeOfBirth, debut, yearsActive, measurements, cup, height, starSign, bloodType, films})
    res.send(201);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;