const ObjectID = require('mongoose').Types.ObjectId;
const BodyTruck = require('../models/bodyTruck');

const getAllTruck = async (req, res) => {
	try {
		const bodyTruck = await BodyTruck.find({});
		res.json(bodyTruck);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
};

const postNewTruck = async (req, res) => {
	try {
		let newRecord = new BodyTruck({
			date: req.body.date,
			weight: req.body.weight,
			hipWidth: req.body.hipWidth,
		});

		newRecord.save((err, docs) => {
			if (!err) res.send(docs);
			else
				console.log(
					'Error while creating new record : ' +
						JSON.stringify(err, undefined, 2),
				);
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
};
const updateTruck = async (req, res) => {
	try {
		if (!ObjectID.isValid(req.params.id))
			return res.status(400).send('No record with given id : ' + req.params.id);

		let updatedRecord = {
			date: req.body.date,
			weight: req.body.weight,
			hipWidth: req.body.hipWidth,
		};

		BodyTruck.findByIdAndUpdate(
			req.params.id,
			{ $set: updatedRecord },
			{ new: true },
			(err, docs) => {
				if (!err) res.send(docs);
				else
					console.log(
						'Error while updating a record : ' +
							JSON.stringify(err, undefined, 2),
					);
			},
		);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
};
const deleteTruck = async (req, res) => {
	try {
		if (!ObjectID.isValid(req.params.id))
			return res.status(400).send('No record with given id : ' + req.params.id);

		BodyTruck.findByIdAndRemove(req.params.id, (err, docs) => {
			if (!err) res.send(docs);
			else
				console.log(
					'Error while deleting a record : ' +
						JSON.stringify(err, undefined, 2),
				);
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
};

module.exports = { getAllTruck, postNewTruck, updateTruck, deleteTruck };
