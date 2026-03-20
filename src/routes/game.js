const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Middleware chroniący dostęp (upewnij się, że masz ten kod)
const isAuth = (req, res, next) => {
    if (req.session.userId) return next();
    res.redirect('/auth/login');
};

router.get('/', isAuth, gameController.getGame);
router.post('/click', isAuth, gameController.postClick);

// --- NOWY ROUTE DLA ZAKUPU ---
router.post('/buy-upgrade', isAuth, gameController.postBuyUpgrade);

module.exports = router;