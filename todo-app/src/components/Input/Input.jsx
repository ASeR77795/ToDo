import React from 'react';
import { useField } from 'formik';

const Input = ({ name, type = 'text' }) => {
	const [{ value, onChange, onBlur }, { touched, error }] = useField(name);
	const isErrorShown = touched && !!error;
	return (
		<div className='mb-3'>
			<input
				className={`form-control ${isErrorShown ? 'is-invalid' : ''}`}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
			{isErrorShown && <p className='invalid-feedback'>{error}</p>}
		</div>
	);
};

export default Input;
