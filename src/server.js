import { config as envConfig} from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import actressRouter from './routes/actress.route.js';
import authRoute from './routes/auth.route.js';
import sercureRoute from './routes/profile.route.js';
import passport from 'passport';

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
app.use('/api/auth', authRoute);
app.use('/api/user', passport.authenticate('jwt', { session: false }), sercureRoute);

app.get('/', (req, res) => {
  res.send("home")
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`running on port ${PORT}`))