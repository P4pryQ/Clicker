const User = require('../models/User');

exports.getGame = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        res.render('game', { user });
    } catch (err) {
        res.redirect('/auth/login');
    }
};

exports.postClick = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        user.points += user.clickValue;
        await user.save();
        res.json({ points: user.points });
    } catch (err) {
        res.status(500).json({ error: "Błąd serwera" });
    }
};

exports.postBuyUpgrade = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        const upgradeCost = 50;

        if (user.points >= upgradeCost) {
            user.points -= upgradeCost;
            user.autoClickPerSecond += 1;
            await user.save();

            res.json({ 
                success: true, 
                points: user.points, 
                autoClick: user.autoClickPerSecond 
            });
        } else {
            res.status(400).json({ 
                success: false, 
                message: "Brak wystarczającej liczby punktów!" 
            });
        }
    } catch (err) {
        res.status(500).json({ error: "Błąd serwera przy zakupie" });
    }
};