const express = require('express')
const router = express.Router()
const controller = require('../controllers/bookingsController')

router.get('/', controller.getAll)
router.get('/slots', controller.getAvailableSlots)
router.post('/', controller.create)
router.patch('/:id/cancel', controller.cancel)

module.exports = router