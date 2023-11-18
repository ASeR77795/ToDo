import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

import todo from '../../services/todo';

const ToDoList = () => {
	const [dataToDo, setDataToDo] = useState([]);

	const handleDeleteItem = async id => {
		try {
			await todo.delete('todos', id);
			setDataToDo(dataToDo => dataToDo.filter(item => item.id !== id));
		} catch (error) {
			console.error('Error deleting item:', error);
		}
	};
	const handleChangeItem = async item => {
		try {
			let response = await todo.patch('todos', item.id, {
				completed: !item.completed,
			});
			setDataToDo(el =>
				el.map(todoItem => (todoItem.id === item.id ? response : todoItem))
			);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(async () => {
		let response = await todo.get('todos');
		setDataToDo(response.slice(0, 10));
	}, []);

	return (
		<Container maxWidth=''>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell align='right'>User ID</TableCell>
							<TableCell align='right'>ID</TableCell>
							<TableCell align='right'>Title</TableCell>
							<TableCell align='right'>Is Complete</TableCell>
							<TableCell align='right'></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{dataToDo.map((item, index) => (
							<TableRow
								key={index}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component='th' scope='row'>
									{item.userId}
								</TableCell>
								<TableCell align='right'>{item.id}</TableCell>
								<TableCell align='right'>{item.title}</TableCell>
								<TableCell align='right'>
									<Checkbox
										checked={item.completed}
										onChange={() => handleChangeItem(item)}
										inputProps={{ 'aria-label': 'controlled' }}
									/>
									{String(item.completed)}
								</TableCell>
								<TableCell align='right'>
									<IconButton
										edge='end'
										aria-label='delete'
										onClick={() => handleDeleteItem(item.id)}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default ToDoList;
