import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Navbar from '../Navbar';

afterEach(() => {
	cleanup();
});

describe('Navbar component', () => {
	it('render without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Navbar></Navbar>, div);
	});

	it('renders Navbar correctly', () => {
		const { getByTestId } = render(<Navbar title='Truck App' />);
		expect(getByTestId('navbar')).toHaveTextContent('Truck App');
	});
	it('renders Navbar again correctly', () => {
		const { getByTestId } = render(<Navbar title='App log' />);
		expect(getByTestId('navbar')).toHaveTextContent('App log');
	});
	it('Matches snapshot', () => {
		const tree = renderer.create(<Navbar />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Matches snapshot with title=Truck App', () => {
		const tree = renderer.create(<Navbar title='Truck App' />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
