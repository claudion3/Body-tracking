import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, render } from '@testing-library/react';
import InputField from '../InputField';

import renderer from 'react-test-renderer';

afterEach(() => {
	cleanup();
});

describe('InputField component', () => {
	it('render without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<InputField />, div);
	});
	it('Render InputField', () => {
		const { getByTestId } = render(<InputField />);
		const input = getByTestId('input');
		expect(input).toBeTruthy();
	});
	it('InputField contain label', () => {
		const { queryByTestId } = render(<InputField />);
		const label = queryByTestId('label');
		expect(label).toBeFalsy();
	});
	it('InputField contain P to display error', () => {
		const { queryByTestId } = render(<InputField />);
		const error = queryByTestId('error');
		expect(error).toBeFalsy();
	});
	it('Matches snapshot', () => {
		const tree = renderer.create(<InputField />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
