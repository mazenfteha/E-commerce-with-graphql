const exress = require('express')
const router = exress.Router()

const {signup, signin, signout} = require('../controllers/authAdminController');
const { authenticationAdmin } = require('../../middlewares/authentication');

router.post('/admin/signup', signup);

router.post('/admin/signin', signin);

router.post('/admin/signout', authenticationAdmin ,signout);

module.exports = router;