import fetch from 'node-fetch';
const env = process.env;

export const handleProfile = (req, res, database) => {
    const { id } = req.params
    database.select('*').from('users').where({id}).then(user => {
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('user not found')
        }
    })
    .catch(err => res.status(400).json({
        'err': err,
        'message': 'Error getting user'
    }))
}

export const handleImage = (req, res, database) => {
    const { id, imageUrl } = req.body;

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = env['PAT_CLARIFAI'];
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = env['USER_ID_CLARIFAI'];       
    const APP_ID = env['APP_ID_CLARIFAI'];

    // Change these to whatever model and image URL you want to use
    const MODEL_ID = env['MODEL_ID_CLARIFAI'];
    const MODEL_VERSION_ID = env['MODEL_VERSION_ID_CLARIFAI'];    

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////
    
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": imageUrl
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.text())
    .then(result => {
        database('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json({
                'result' : JSON.parse(result),
                'status': 200,
                'entries': entries[0].entries
            })
        })
        .catch(err => res.status(400).json({
            'err': err,
            'message': 'Unable to get entries'
        }))
    })
    .catch(err => res.status(400).json({
        'err': err,
        'message': "Unable to fetch clarifai's API"
    }))}