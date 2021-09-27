const express = require('express');
const router = express.Router();

const {
	getAllTrack,
	postNewTrack,
	updateTrack,
	deleteTrack,
} = require('../controllers/bodyTrackController');

router.get('/', getAllTrack);
router.post('/', postNewTrack);
router.put('/:id', updateTrack);
router.delete('/:id', deleteTrack);

module.exports = router;
