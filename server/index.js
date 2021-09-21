require('dotenv').config();
const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const BodyTruckRoutes = require('./routes/bodyTruckRoutes');
const cors = require('cors');

connectDB();
const app = express();
const PORT = process.env.API_PORT || 5000;

app.use(bodyParser.json());
app.use('/bodyTruck', BodyTruckRoutes);
app.use(cors());
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/client/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
