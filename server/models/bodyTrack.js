const mongoose = require('mongoose');


const BodyTrackSchema = new mongoose.Schema(
	{
		date: { type: Date, required: true },
		weight: { type: Number, required: true },
		hipWidth: { type: Number, required: true },
	},
	{
		strict: true,
		strictQuery: false, // Turn off strict mode for query filters
	},
);
const BodyTrack = mongoose.model('bodyTrack', BodyTrackSchema);

module.exports = BodyTrack;
