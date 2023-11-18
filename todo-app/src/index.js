import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import ToDo from './components/ToDo/ToDo';
import ToDoList from './components/ToDoList/ToDoList';

const rootElement = document.querySelector('#root');

const projects = ['First', 'Second', 'Third'];

createRoot(rootElement).render(
	<>
		<div className='container'>{/* <ToDo /> */}</div>
		<ToDoList />
	</>
);
