import { config as envConfig} from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { join as joinPath, dirname } from 'path';
import { fileURLToPath } from 'url';
import actressRouter from './routes/actress.route.js';

// const __dirname = dirname(fileURLToPath(import.meta.url));

if(process.env.NODE_ENV !== 'production'){
  envConfig();
}

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if(err) console.log(err.message)
})
const db = mongoose.connection
db.on('error', error => console.error(error.message))
db.once('open', () => console.log('connected to mongoose'))

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/api/actress', actressRouter)

app.get('/', (req, res) => {
  res.send("home")
})

app.listen(process.env.PORT || 8080)