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
    console.log(users)
    res.send('OK')
})

//POST Tweets
app.post('/tweets', (req, res) => {
    const usernameExist = users.find((a) => a.username === req.body.username)
    if (usernameExist === undefined) {
        return res.send('UNAUTHORIZED')
    }

    let newTweet = {
        username: req.body.username,
        tweet: req.body.tweet,
        avatar: usernameExist.avatar
    }
    tweets.push(newTweet);
    return res.send('OK')
})

//GET Tweets
app.get('/tweets', (req, res) => {
    const lastTweets = tweets.slice(-10)
    return res.send(lastTweets)
})

//Porta
const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`)
})