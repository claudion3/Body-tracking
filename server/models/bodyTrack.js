const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const BodyTrackSchema = new mongoose.Schema({
	date: { type: Date, required: true },
	weight: { type: Number, required: true },
	hipWidth: { type: Number, required: true },
});
const BodyTrack = mongoose.model('bodyTrack', BodyTrackSchema);

module.exports = BodyTrack;
