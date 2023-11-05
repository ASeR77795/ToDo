import React, { useState } from 'react';

const ToDo = () => {
	const [todos, setTodos] = useState([]);
	const [value, setValue] = useState('');
	const [error, setError] = useState('');
	return (
		<div className='row'>
			<div className='col-10 offset-1'>
				<form
					action=''
					onSubmit={event => {
						event.preventDefault();
						if (value !== '') {
							setTodos(prevState => {
								return [
									...prevState,
									{ id: crypto.randomUUID(), title: value, isCompleted: false },
								];
							});
							setError('');
							setValue('');
							return;
						}
						setError('This field is required');
					}}
				>
					<div className='mb-3'>
						<label className='form-label' htmlFor='titleInput'>
							Title
						</label>
						<input
							className={`form-control ${!!error ? 'is-invalid' : ''}`}
							id='titleInput'
							type='text'
							name='title'
							value={value}
							onChange={({ target }) => {
								setValue(target.value);
							}}
						/>
						{!!error && <div className='invalid-feedback'>{error}</div>}
					</div>
					<button className='btn btn-primary w-100' type='submit'>
						Create
					</button>
				</form>
			</div>
			<ul>
				{todos.map(({ id, isCompleted, title }) => {
					return <li key={id}>{title}</li>;
				})}
			</ul>
		</div>
	);
};

export default ToDo;
