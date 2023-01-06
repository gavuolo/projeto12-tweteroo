import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let tweets = [];
let users = [];

//POST Sign-up
app.post('/signup', (req, res) => {
    let newUser = {
        username: req.body.username,
        avatar: req.body.avatar
    }
    users.push(newUser);
    //validação
    if (!req.body.username || !req.body.avatar) {
        return res.status(400).send('Todos os campos são obrigatórios!”')
    }
    res.status(201).send('OK')
})

//POST Tweets
app.post('/tweets', (req, res) => {
    const usernameExist = users.find((a) => a.username === req.body.username)
    if (usernameExist === undefined) {
        return res.status(401).send('UNAUTHORIZED');
    }

    let newTweet = {
        username: req.body.username,
        tweet: req.body.tweet,
        avatar: usernameExist.avatar
    }
    //validação
    if (!req.body.username || !req.body.tweet) {
        return res.status(400).send('Todos os campos são obrigatórios!”')
    }

    tweets.push(newTweet);
    return res.status(201).send('OK');
})

//GET Tweets
app.get('/tweets', (req, res) => {
    const lastTweets = tweets.slice(-10)
    return res.send(lastTweets)
})
app.get('/tweets/:username', (req, res) => {
    let filterTweet = tweets.filter((a) => a.username === req.params.username);
    let tweetsUser = []

    for (let i = 0; i < filterTweet.length; i++) {
        tweetsUser.push({
            username: filterTweet[i].username,
            avatar: filterTweet[i].avatar,
            tweet: filterTweet[i].tweet
        })
    }
    console.log(tweetsUser)
    res.send('ok')
})
//Porta
const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`)
})