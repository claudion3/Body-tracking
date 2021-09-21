const mongoose = require('mongoose');

const BodyTruckSchema = new mongoose.Schema({
	date: { type: Date, required: true },
	weight: { type: Number, required: true },
	hipWidth: { type: Number, required: true },
});
const BodyTruck = mongoose.model('bodyTruck', BodyTruckSchema);

module.exports = BodyTruck;
