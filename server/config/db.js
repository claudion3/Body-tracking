require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectDB = async () => {
	try {
		await mongoose.connect((process.env.MONGO_URI).toString(), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB connection SUCCESS');
	} catch (error) {
		console.log('MongoDB connection FAIL', error);
		process.exit(1);
	}
};

module.exports = connectDB;
