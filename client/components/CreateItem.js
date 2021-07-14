import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { ADD_ITEM } from './SingleItemAdd';
import ContainerQuery from '../../server/graphql/queries/Container.graphql';
import ContainerItems from '../../server/graphql/queries/ContainerItems.graphql';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router';

const CREATE_ITEM = gql`
	mutation createItem($name: String!) {
		createItem(name: $name) {
			id
		}
	}
`;

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function CreateItem(props) {
	const classes = useStyles();
	const history = useHistory();
  const { containerId } = props.location.state;
	const [ name, setName ] = useState('');
	const [ expiration, setExpiration ] = useState('');
	const [ quantity, setQuantity ] = useState(1);
	const [ id, setId ] = useState(0);

	const handleChange = (event) => {
		if (event.target.name === 'name') {
			setName(event.target.value);
		} else if (event.target.name === 'expiration') {
			setExpiration(event.target.value);
		} else if (event.target.name === 'quantity') {
			setQuantity(event.target.value);
		}
	};

	const [ submitCreate ] = useMutation(CREATE_ITEM, {
		variables: {
			name: name
		}
	});

  const [addItem, { error: addItemError }] = useMutation(ADD_ITEM, {
    variables: {
      containerId: containerId,
      itemId: id,
      originalQuantity: +quantity,
      expiration: new Date(expiration),
      itemStatus: 'ACTIVE',
    },
    refetchQueries: [
      {
        query: ContainerQuery,
        variables: {
          id: containerId,
        },
      },
      {
        query: ContainerItems,
        variables: {
          containerId: containerId,
        },
      },
    ],
    onCompleted: (addItem) => {
      history.push(`/containers/${containerId}`);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await submitCreate();
    setId(data.data.createItem.id);
    addItem();
  };

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Create item
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={4}>
							<TextField
								id="name"
								label="Item name"
								type="text"
								name="name"
								onChange={handleChange}
								value={name}
								className={classes.textField}
							/>
							<TextField
								id="quantity"
								label="Quantity"
								type="text"
								name="quantity"
								onChange={handleChange}
								value={quantity}
								className={classes.textField}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								id="date"
								label="Expiration"
								type="date"
								name="expiration"
								onChange={handleChange}
								defaultValue={expiration}
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Button variant="contained" component="label">
								change image
								<input type="file" hidden />
							</Button>
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Done editing
					</Button>
				</form>
			</div>
		</Container>
	);
}
