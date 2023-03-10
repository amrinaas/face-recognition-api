const handleProfile = (req, res, database) => {
    const { id } = req.params
    database.select('*').from('users').where({id}).then(user => {
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('user not found')
        }
    })
    .catch(err => res.status(400).json('error getting user'))
}

const handleImage = (req, res, database) => {
    const { id } = req.body
    database('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleProfile: handleProfile,
    handleImage: handleImage
}