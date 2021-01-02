import { ActressModel as Actress } from '../models/actress.model.js';
import { baseUrl } from '../utils/constant.js';

export async function getAll(offset, limit) {
  const actresses = [...(await Actress.find().skip(offset).limit(limit))].map(item => {
    const { name, _id } = item
    return { name, url: `${baseUrl}/api/actress/${_id}` }
  })
  const results = {}
  results.count = await Actress.countDocuments({})
  if(offset > 0){
    const prevUrl = `${baseUrl}/api/actress?offset=${offset-20}&limit=${limit}`
    results.prevUrl = prevUrl
  }
  const nextUrl = `${baseUrl}/api/actress?offset=${offset+20}&limit=${limit}`
  results.nextUrl = nextUrl
  results.results = actresses
  return results;
}

/**
 * 
 * @param {String} name 
 */
export async function getManyByName(name) {
  const actresses = (await Actress.find({name}).exec()).map(item => {
    const { _id, name, imgUrl, dateOfBirth, placeOfBirth, debut, yearsActive, measurements, cup, height, starSign, bloodType, films } = item
    const url = `${baseUrl}/api/actress/${_id}`
    return { id: _id, name, url, imgUrl, dateOfBirth, placeOfBirth, debut, yearsActive, measurements, cup, height, starSign, bloodType, films }
  })
  return actresses;
}

export async function getById(id) {
  const actress = await Actress.findById(id);
  return actress;
}