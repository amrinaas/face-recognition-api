
import * as dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import cors from 'cors'
import bcrypt from 'bcryptjs';
import knex from 'knex';

const app = express();
const env = process.env;

// Import controllers
import { handleRegister } from './controllers/register.js';
import { handleSignIn } from './controllers/signIn.js'
import { handleProfile, handleImage } from './controllers/profile.js'

// Right click on PostgreSQL pgadmin -> properties -> connection
const database = knex({
    client: 'pg',
    connection: {
      host : env['HOST_NAME'],
      port : env['PORT_NAME'],
      user : env['USER_NAME'],
      password : env['PASSWORD'],
      database : env['DATABASE_NAME']
    }
  });

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('App is up to the server')
})
app.post('/signin', (req, res) => { handleSignIn(req, res, database, bcrypt) })
app.post('/register', (req, res) => { handleRegister(req, res, database, bcrypt) })
app.get('/profile/:id', (req, res) => { handleProfile(req, res, database)})
app.put('/image', (req, res) => { handleImage(req, res, database)})

app.listen(env['PORT'], () => {
    console.log(`Server is listening on port ${env['PORT']}`);
})
