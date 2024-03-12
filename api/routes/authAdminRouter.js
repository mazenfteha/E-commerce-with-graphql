const exress = require('express')
const router = exress.Router()

const {signup, signin, signout} = require('../controllers/authAdminController');
const { authenticationAdmin } = require('../../middlewares/authentication');
const {  registerValidator ,loginValidator } = require('../../utils/authValidator')

router.post('/admin/signup', registerValidator, signup);

router.post('/admin/signin', loginValidator, signin);

router.use(authenticationAdmin)

router.get('/admin/signout', signout);

module.exports = router;