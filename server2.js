const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex')
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const users = require('./controllers/users');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'redvanisation',
    password : '',
    database : 'test'
  }
});

// db.select('*').from('users').then(console.log);


const app = express();


app.use(express.urlencoded({extended: false}));
app.use(cors());

app.get('/', (req, res) => db('users').select('*').then(users => res.json(users)));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => users.handleGetUser(req, res, db));
app.put('/image', (req, res) => users.handleUserEntries(req, res, db));


app.listen(process.env.PORT || 3000, () => console.log('App is running on port 3000'));