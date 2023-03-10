
require('dotenv').config()
const express = require('express');
const cors = require('cors')
const bcrypt = require('bcryptjs');
const app = express();
const knex = require('knex')
const env = process.env;

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

app.post('/signin', (req, res) => {
    const { email, password, hash } = req.body;
    database.select('email', 'hash').from('login')
        .where({
            'email': email
        })
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return database.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credential'))
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    database.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()
            }).then(user => {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'))
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params
    database.select('*').from('users').where({id}).then(user => {
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('user not found')
        }
    })
    .catch(err => res.status(400).json('error getting user'))
})

app.put('/image', (req, res) => {
    const { id } = req.body
    database('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
})

app.listen(3000, () => {
    console.log('App is running');
})
