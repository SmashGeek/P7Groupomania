const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const auth = require('../middleware/auth');

router.post("/signup", user.signup);
router.post("/login", user.login);
router.get('/profil/:id', auth, user.getUser);
router.delete('/:id', auth, user.deleteUser);
router.put('/:id', user.editAccount)

module.exports = router;