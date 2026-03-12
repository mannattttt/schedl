const express = require('express')
const router = express.Router()
const controller = require('../controllers/availabilityController')

router.get('/', controller.getAll)
router.post('/', controller.save)

module.exports = router