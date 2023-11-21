import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import Input from '../Input/Input';
import * as yup from 'yup';

const Table = () => {
	return (
		<div className='container'>
			<div className='row'>
				<div className='col-8 offset-2 pt-3'>
					<Formik
						initialValues={{ name: '', number: '' }}
						onSubmit={(values, formikHelpers) => {
							formikHelpers.resetForm();
						}}
						validationSchema={yup.object().shape({
							number: yup.string().label('Number').min(6).max(18).required(),
							name: yup.string().label('Name').min(6).max(18).required(),
						})}
					>
						<Form>
							<h1>From</h1>
							<Input name='name' />
							<Input name='number' type='number' />
							<button className='btn btn-primary w-100' type='submit'>
								Submit
							</button>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default Table;
