const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/clickerDB')
    .then(() => console.log('Połączono z MongoDB'))
    .catch(err => console.error('Błąd bazy:', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'klikacz_tajny_klucz',
    resave: false,
    saveUninitialized: true
}));

app.use('/auth', require('../src/routes/auth'));
app.use('/game', require('../src/routes/game'));

app.get('/', (req, res) => res.redirect('/auth/login'));

app.listen(3001, () => console.log('Serwer: http://localhost:3001'));