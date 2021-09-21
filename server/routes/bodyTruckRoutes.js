const express = require('express');
const router = express.Router();

const {
	getAllTruck,
	postNewTruck,
	updateTruck,
	deleteTruck,
} = require('../controllers/bodyTruckController');

router.get('/', getAllTruck);
router.post('/', postNewTruck);
router.put('/:id', updateTruck);
router.delete('/:id', deleteTruck);

module.exports = router;
