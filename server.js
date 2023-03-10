
require('dotenv').config()
const express = require('express');
const cors = require('cors')
const bcrypt = require('bcryptjs');
const app = express();
const knex = require('knex')
const env = process.env;

// Import controllers
const register = require('./controllers/register')
const signIn = require('./controllers/signIn')
const profile = require('./controllers/profile')

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

app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, database, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, database, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, database)})
app.put('/image', (req, res) => { profile.handleImage(req, res, database)})

app.listen(3000, () => {
    console.log('App is running');
})
