const ObjectID = require('mongoose').Types.ObjectId;
const BodyTrack = require('../models/bodyTrack');

const getAllTrack = async (req, res) => {
	try {
		const bodyTrack = await BodyTrack.find({});
		res.json(bodyTrack);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
};

const postNewTrack = async (req, res) => {
	try {
		let newRecord = new BodyTrack({
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
const updateTrack = async (req, res) => {
	try {
		if (!ObjectID.isValid(req.params.id))
			return res.status(400).send('No record with given id : ' + req.params.id);

		let updatedRecord = {
			date: req.body.date,
			weight: req.body.weight,
			hipWidth: req.body.hipWidth,
		};

		BodyTrack.findByIdAndUpdate(
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
const deleteTrack = async (req, res) => {
	try {
		if (!ObjectID.isValid(req.params.id))
			return res.status(400).send('No record with given id : ' + req.params.id);

		BodyTrack.findByIdAndRemove(req.params.id, (err, docs) => {
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

module.exports = { getAllTrack, postNewTrack, updateTrack, deleteTrack };
