const express = require('express');
let bcrypt = require('bcryptjs');
const cors = require('cors')

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

const database = {
    users: [
        {
            id: '123',
            name: 'Spongebob',
            email: 'sponge@yopmail.com',
            password: 'pass123',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Patrick',
            email: 'patrick@yopmail.com',
            password: 'pass123',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: 897,
            email: 'sponge@yopmail.com',
            hash: ''
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
    const { email, password, hash } = req.body;
    console.log(email);
    console.log(password);
    // Load hash from your password DB.
    bcrypt.compare(password, password, function(err, res) {
        console.log('first guess', res);
        // res === true
    });
    bcrypt.compare(password, password, function(err, res) {
        console.log('second guess', res);

        // res === false
    });
    
    // As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
    bcrypt.compare(password, password).then((res) => {
        console.log('third guess', res);
        // res === true
    });
    if (email === database.users[0].email && 
        password === database.users[0].password) {
            res.json(database.users[0]);
        } else {
            res.status(400).json('Failed login')
        }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
            console.log('hash', hash);
        });
    });

    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params
    let found = false;
    database.users.forEach(user => {
        if ( user.id === id) {
            found = true
            return res.json(user);
        }
    })
    if (!found) {
        res.status(404).json('User not found')
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body
    let found = false;
    database.users.forEach(user => {
        if ( user.id === id) {
            found = true
            user.entries++
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(404).json('not found')
    }
})

app.listen(3000, () => {
    console.log('App is running');
})
