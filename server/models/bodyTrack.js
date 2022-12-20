const mongoose = require('mongoose');

const BodyTrackSchema = new mongoose.Schema(
	{
		date: { type: Date, required: true },
		weight: { type: Number, required: true },
		hipWidth: { type: Number, required: true },
	},
	{
		strict: true,
		strictQuery: true, // Turn on strict mode for query filters
	},
);
const BodyTrack = mongoose.model('bodyTrack', BodyTrackSchema);

const newBodyTrack = new BodyTrack();
newBodyTrack.set('iAmNotInTheSchema', true);
newBodyTrack.save(); // iAmNotInTheSchema is not saved to the db

module.exports = newBodyTrack;
