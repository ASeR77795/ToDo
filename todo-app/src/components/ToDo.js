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
							Todo List
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
					<button className='btn btn-primary w-100 mb-2' type='submit'>
						Create
					</button>
				</form>
			</div>
			<ul
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 10,
				}}
			>
				{todos.map(({ id, isCompleted, title }) => {
					return (
						<li
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
							key={id}
							className={isCompleted ? 'text-decoration-line-through' : ''}
						>
							{title}
							<div>
								<button
									className='btn btn-secondary'
									onClick={() => {
										setTodos(prevState => {
											return prevState.map(todo => {
												if (todo.id === id) {
													return {
														...todo,
														isCompleted: !todo.isCompleted,
													};
												}
												return todo;
											});
										});
									}}
								>
									Complete
								</button>
								<button
									className='btn btn-danger ms-1'
									onClick={() => {
										setTodos(prevState => {
											const updateTodos = prevState.filter(todo => {
												return todo.id !== id;
											});
											return updateTodos;
										});
									}}
								>
									Delete
								</button>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default ToDo;
