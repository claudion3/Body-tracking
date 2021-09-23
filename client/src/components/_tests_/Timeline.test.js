import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Timeline from '../Timeline';

afterEach(() => {
	cleanup();
});

const dataTest = [
	{
		_id: '6149c00c8bb94a3b61e23012',
		date: '2021-09-21T00:00:00.000Z',
		weight: 85,
	},
	{
		_id: '6149c01a8bb94a3b61e23015',
		date: '2021-09-23T00:00:00.000Z',
		weight: 70,
	},
];

describe('Navbar component', () => {
	it('Matches snapshot', () => {
		const tree = renderer.create(<Timeline data={dataTest} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
