import React, { forwardRef, useImperativeHandle } from 'react';

const InputField = forwardRef((props, ref) => {
	const [value, setValue] = React.useState('');
	const [error, setError] = React.useState('');

	const handleChange = event => {
		setValue(event.target.value);
		setError('');
		props.onChange(event.target.name, event.target.value);
	};

	const validate = () => {
		if (props.validation) {
			const rules = props.validation.split('|');

			for (let i = 0; i < rules.length; i++) {
				const current = rules[i];

				if (current === 'required') {
					if (!value) {
						setError('This field is required');
						return false;
					} else if (value < 0) {
						setError('Negative number are not allowed');
						return false;
					} else if (value < 20 && value > 0) {
						setError('Invalid input try high number');
						return false;
					}
				}

				const pair = current.split(':');
				switch (pair[0]) {
					case 'min':
						if (value.length < pair[1]) {
							setError(`This field must be at least ${pair[1]} character long`);
							return false;
						}
						break;
					case 'max':
						if (value.length > pair[1]) {
							setError(
								`This field must be no longer than ${pair[1]} character long`,
							);
							return false;
						}
						break;

					default:
						break;
				}
			}
		}

		return true;
	};

	useImperativeHandle(ref, () => {
		return {
			validate: () => validate(),
		};
	});

	return (
		<div className='input-wrapper'>
			{props.label && <label data-testid='label'>{props.label}</label>}
			<input
				data-testid='input'
				placeholder={props.placeholder}
				name={props.name}
				onChange={event => handleChange(event)}
				type={props.type}
				value={props.value ? props.value : value}
				autoComplete={props.autoComplete}
			/>
			{error && (
				<p className='error' data-testid='error'>
					{error}
				</p>
			)}
		</div>
	);
});

InputField.defaultProps = {
	placeholder: '',
	name: '',
	type: 'number',
	value: '',
	autoComplete: 'off',
	validation: '',
};

export default InputField;
