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
    res.send('Ok')
})

//POST Tweets

//GET Tweets

//Porta
const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`)
})