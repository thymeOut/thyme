import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useMutation } from '@apollo/client';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UpdateContainer from '../../server/graphql/mutations/UpdateContainer.graphql';
import User from '../../server/graphql/queries/User.graphql';

const InactivateContainer = (props) => {
	const [ containerName, setContainerName ] = useState('');

	const [ inactivateContainer ] = useMutation(UpdateContainer, {
		variables: {
			id: props.container.id,
			input: {
				isActive: false
			}
		},
		refetchQueries: [
			{
				query: User,
				variables: {
					id: localStorage.getItem('user-id')
				}
			}
		]
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (containerName === props.container.name) {
			inactivateContainer();
		}
		props.setInactiveToggle(false);
	};

	return (
		<form>
			<Typography component="div">
				If you would like to inactive{' '}
				<Box fontWeight="fontWeightBold" m={1}>
					{' '}
					{props.container.name}{' '}
				</Box>{' '}
				please retype the container name here:
			</Typography>
			<TextField onInput={(e) => setContainerName(e.target.value)} />
			<DialogActions>
				<Button onClick={(e) => handleSubmit(e)} color="primary">
					Inactivate
				</Button>
				<Button onClick={() => props.setInactiveToggle(false)} color="primary">
					Cancel
				</Button>
			</DialogActions>
		</form>
	);
};

export default InactivateContainer;
