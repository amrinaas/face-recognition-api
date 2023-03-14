export const handleSignIn = (req, res, database, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('Form field is required. Please fill all the form!')
    }

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
                    .catch(err => res.status(400).json({
                        'err': err,
                        'message': 'Unable to get user'
                    }))
            } else {
                res.status(400).json('Wrong credentials')
            }
        })
        .catch(err => res.status(400).json({
            'err': err,
            'message': 'Unable to sign in. Please try again later!'
        }))
}