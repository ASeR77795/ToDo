import React, { useEffect, useState } from 'react';

const ToDo = () => {
	const [todos, setTodos] = useState(
		localStorage.todos ? JSON.parse(localStorage.todos) : []
	);
	const [value, setValue] = useState(
		localStorage.value ? JSON.parse(localStorage.value) : ''
	);
	const [error, setError] = useState(
		localStorage.error ? localStorage.error : ''
	);
	const options = {
		year: '2-digit',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	};
	useEffect(() => {
		localStorage.todos = JSON.stringify(todos);
	}, [todos]);
	useEffect(() => {
		localStorage.error = JSON.stringify(error);
	}, [error]);
	useEffect(() => {
		localStorage.value = JSON.stringify(value);
	}, [value]);

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
									{
										id: crypto.randomUUID(),
										title: value,
										isCompleted: false,
										date: Date.now(),
									},
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
				{todos.map(({ id, isCompleted, title, date }) => {
					return (
						<li
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
							key={id}
							className={isCompleted ? 'text-decoration-line-through' : ''}
						>
							<div>
								<strong>{title}</strong>
								<br />
								<p>{new Date(date).toLocaleDateString('en-US', options)}</p>
							</div>

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
