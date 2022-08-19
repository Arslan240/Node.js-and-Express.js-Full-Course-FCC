const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()

const {login, dashboard} = require('../controllers/main')

router.route('/dashboard')
  .get(dashboard)

router.route('/login')
  .post(login)

module.exports = router;
