const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => res.render('login');
exports.getRegister = (req, res) => res.render('register');

exports.postRegister = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword });
        res.redirect('/auth/login');
    } catch (e) { res.send("Błąd rejestracji (może login zajęty?)"); }
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user._id;
        return res.redirect('/game');
    }
    res.send("Błędny login lub hasło");
};

exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect('/auth/login'));
};