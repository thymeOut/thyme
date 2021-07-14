import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { formatDistance } from 'date-fns';
import { GET_CONTAINER, GET_CONTAINER_ITEMS } from './SingleContainer';

const UPDATE_CONTAINER_ITEM = gql`
	mutation updateContainerItem($id: ID!, $input: ContainerItemInput) {
		updateContainerItem(id: $id, input: $input) {
			id
			quantityUsed
		}
	}
`;

function ItemCard(props) {
	const localId = window.localStorage.getItem('user-id');
	const containerId = props.match.params.id;
	const { item, classes, users } = props;
	const formattedExpiration = item.expiration
		? formatDistance(new Date(item.expiration), new Date(), {
				addSuffix: true
			})
		: '';

	const [ quantityUsed, setQuantityUsed ] = useState(item.quantityUsed);

	const [ updateQuantity ] = useMutation(UPDATE_CONTAINER_ITEM, {
		variables: {
			id: item.id,
			input: {
				quantityUsed: quantityUsed
			}
		}
	});

	const [ removeItem ] = useMutation(UPDATE_CONTAINER_ITEM, {
		variables: {
			id: item.id,
			input: {
				itemStatus: 'REMOVED'
			}
		},
		refetchQueries: [
			{
				query: GET_CONTAINER,
				variables: {
					id: containerId
				}
			},
			{
				query: GET_CONTAINER_ITEMS,
				variables: {
					containerId: containerId
				}
			}
		]
	});

	const handleDecrement = () => {
		setQuantityUsed(quantityUsed + 1);

		// this is smelly. refactor after MVP accomplished.
		if (quantityUsed === item.originalQuantity - 1) {
			handleRemove();
		} else {
			updateQuantity({
				variables: {
					id: item.id,
					input: {
						quantityUsed: quantityUsed + 1
					}
				}
			});
		}
	};

	const handleIncrement = () => {
		setQuantityUsed(quantityUsed - 1);
		updateQuantity({
			variables: {
				id: item.id,
				input: {
					quantityUsed: quantityUsed - 1
				}
			}
		});
	};

	const handleRemove = () => {
		removeItem();
	};

	return (
		<Grid item key={item.id} xs={12} sm={6} md={4}>
			<Card className={classes.card}>
				<CardMedia className={classes.cardMedia} image={item.imageUrl} title={item.name} />
				<CardContent className={classes.cardContent}>
					<Typography gutterBottom variant="h5" component="h2">
						{item.name}
					</Typography>
					<Typography>
						{users.map((user) => {
							if (user.id === item.userId) {
								return user.firstName;
							} else {
								return '';
							}
						})}
					</Typography>
					<Typography>{formattedExpiration}</Typography>
				</CardContent>
				{localId === item.userId && (
					<CardActions>
						<ButtonGroup size="small" color="primary">
							<Button onClick={handleDecrement}>-</Button>
							<Button>{item.originalQuantity - item.quantityUsed}</Button>
							<Button onClick={handleIncrement}>+</Button>
						</ButtonGroup>
						<Button
							size="small"
							color="primary"
							component={Link}
							to={{
								pathname: `${containerId}/edititem/${item.id}`,
								state: { item: item, users: users, containerId: containerId }
							}}
						>
							Edit
						</Button>
						<Button size="small" color="primary" onClick={handleRemove}>
							Remove
						</Button>
					</CardActions>
				)}
			</Card>
		</Grid>
	);
}

export default withRouter(ItemCard);
