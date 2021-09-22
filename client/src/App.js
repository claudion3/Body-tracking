import React, { useEffect, useRef, createRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getAllTruck as truckList,
	createTruck,
	editTruck,
	deleteTruck,
} from './redux/actions/BodyTruckActions';
import Measurements from './components/Measurements';
import './App.css';
import Navbar from './components/Navbar';
import InputField from './components/InputField';
import { Line } from 'react-chartjs-2';

const App = () => {
	const dispatch = useDispatch();

	const inputRefs = useRef([createRef(), createRef(), createRef()]);

	const getAllTruckList = useSelector(state => state.getAllTruck);
	const { bodyTruck, loading, error } = getAllTruckList;

	const [truckData, setTruckData] = useState({});
	const [truckWeight, setTruckWeight] = useState([]);
	const [truckHipWidth, setTruckHipWidth] = useState([]);

	useEffect(() => {
		dispatch(truckList());
	}, [dispatch]);

	useEffect(() => {
		if (bodyTruck && bodyTruck.length > 0) {
			const dataWeight = bodyTruck.map(data => data.weight);
			const dataHipWidth = bodyTruck.map(data => data.hipWidth);

			setTruckWeight(dataWeight);
			setTruckHipWidth(dataHipWidth);
		}
	}, [bodyTruck]);

	const refreshPage = () => {
		setTimeout(() => {
			window.location.reload();
		}, 100);
	};
	const removeHandler = id => {
		dispatch(deleteTruck(id));

		refreshPage();
	};

	const editHandler = editData => {
		setTruckData(editData);
	};

	const handleChange = (name, value) => {
		setTruckData(prev => ({ ...prev, [name]: value }));
	};

	const submitForm = e => {
		e.preventDefault();

		let isValid = true;

		for (let i = 0; i < inputRefs.current.length; i++) {
			const valid = inputRefs.current[i].current.validate();

			if (!valid) {
				isValid = false;
			}
		}

		if (!isValid) {
			return;
		}

		if (truckData._id) {
			dispatch(editTruck(truckData));
		} else {
			dispatch(createTruck(truckData));
		}

		//Reset the form
		let formValue = e.target;
		for (let i = 0; i < formValue.length; i++) {
			formValue[i].value = '';
		}
		refreshPage();
	};

	return (
		<div className='app'>
			<Navbar />
			<div className='input-chart'>
				<div className='input'>
					<form onSubmit={submitForm} className='form' id='edit'>
						<h1>Enter New Truck</h1>
						<InputField
							ref={inputRefs.current[0]}
							name='date'
							label='Date*:'
							type='date'
							value={truckData.date}
							onChange={handleChange}
							validation={'required|min:8'}
						/>
						<InputField
							ref={inputRefs.current[1]}
							name='weight'
							placeholder='Enter your weight...'
							label='Weight*:'
							value={truckData.weight}
							onChange={handleChange}
							validation={'required|min:2|max:3'}
						/>
						<InputField
							ref={inputRefs.current[2]}
							name='hipWidth'
							placeholder='Enter your Hip Width...'
							label='Hip Width*:'
							value={truckData.hipWidth}
							validation='required|min:2|max:3'
							onChange={handleChange}
						/>
						<button type='submit'>Submit</button>
					</form>
				</div>
				<div className='chart'>
					<Line
						data={{
							labels: [
								'1',
								'2',
								'3',
								'4',
								'5',
								'6',
								'8',
								'9',
								'10',
								'11',
								'12',
							],
							datasets: [
								{
									label: 'My Weight',
									data: truckWeight,
									fill: false,
									borderColor: 'rgb(75, 192, 192)',
									tension: 0.1,
								},
								{
									label: 'Hip Width',

									data: truckHipWidth,
									fill: false,
									borderColor: 'rgb(128,196,127)',
									tension: 0.1,
								},
							],
						}}
						height={400}
						width={600}
					/>
				</div>
			</div>

			{loading ? (
				<h2>Loading...</h2>
			) : error ? (
				<h2>{error}</h2>
			) : (
				<div className='timeline-container'>
					{bodyTruck.length > 0 &&
						bodyTruck.map((data, idx) => (
							<Measurements
								data={data}
								key={idx}
								removeTruck={removeHandler}
								editTruck={editHandler}
							/>
						))}
				</div>
			)}
		</div>
	);
};

export default App;
