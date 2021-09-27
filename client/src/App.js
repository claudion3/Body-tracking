import React, { useEffect, useRef, createRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getAllTrack as trackList,
	createTrack,
	editTrack,
	deleteTrack,
} from './redux/actions/BodyTrackActions';
import Timeline from './components/Timeline';
import './App.css';
import Navbar from './components/Navbar';
import InputField from './components/InputField';
import { Line } from 'react-chartjs-2';

const App = () => {
	const dispatch = useDispatch();

	const inputRefs = useRef([createRef(), createRef(), createRef()]);

	const getAllTrackList = useSelector(state => state.getAllTrack);
	const { bodyTrack, loading, error } = getAllTrackList;

	const [trackData, setTrackData] = useState({});
	const [trackWeight, setTrackWeight] = useState([]);
	const [trackHipWidth, setTrackHipWidth] = useState([]);

	useEffect(() => {
		dispatch(trackList());
	}, [dispatch]);

	useEffect(() => {
		if (bodyTrack && bodyTrack.length > 0) {
			const dataWeight = bodyTrack.map(data => data.weight);
			const dataHipWidth = bodyTrack.map(data => data.hipWidth);

			setTrackWeight(dataWeight);
			setTrackHipWidth(dataHipWidth);
		}
	}, [bodyTrack]);

	const refreshPage = () => {
		setTimeout(() => {
			window.location.reload();
		}, 100);
	};
	const removeHandler = id => {
		dispatch(deleteTrack(id));

		refreshPage();
	};

	const editHandler = editData => {
		setTrackData(editData);
	};

	const handleChange = (name, value) => {
		setTrackData(prev => ({ ...prev, [name]: value }));
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

		if (trackData._id) {
			dispatch(editTrack(trackData));
		} else {
			dispatch(createTrack(trackData));
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
			<Navbar title='Tracking App' />
			<div className='input-chart' id='edit'>
				<div className='input'>
					<form onSubmit={submitForm} className='form'>
						<h1>Enter New Measurement</h1>
						<InputField
							ref={inputRefs.current[0]}
							name='date'
							label='Date*:'
							type='date'
							value={trackData.date}
							onChange={handleChange}
							validation={'required|min:8'}
						/>
						<InputField
							ref={inputRefs.current[1]}
							name='weight'
							placeholder='Enter your weight...'
							label='Weight*:'
							value={trackData.weight}
							onChange={handleChange}
							validation={'required|min:2|max:3'}
						/>
						<InputField
							ref={inputRefs.current[2]}
							name='hipWidth'
							placeholder='Enter your Hip Width...'
							label='Hip Width*:'
							value={trackData.hipWidth}
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
									data: trackWeight,
									fill: false,
									borderColor: 'rgb(75, 192, 192)',
									tension: 0.1,
								},
								{
									label: 'Hip Width',

									data: trackHipWidth,
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
					{bodyTrack.length > 0 &&
						bodyTrack.map((data, idx) => (
							<Timeline
								data={data}
								key={idx}
								removeTrack={removeHandler}
								editTrack={editHandler}
							/>
						))}
				</div>
			)}
		</div>
	);
};

export default App;
