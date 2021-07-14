import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { GET_CONTAINER, GET_CONTAINER_ITEMS } from './SingleContainer';
import { useHistory } from 'react-router';

const GET_ITEM = gql`
	query Item($id: ID!) {
		item(id: $id) {
			name
		}
	}
`;

export const ADD_ITEM = gql`
	mutation AddItemToContainer(
		$containerId: ID!
		$itemId: ID!
		$originalQuantity: Int!
		$expiration: Date
		$itemStatus: ItemStatus!
	) {
		addItemToContainer(
			containerId: $containerId
			itemId: $itemId
			expiration: $expiration
			originalQuantity: $originalQuantity
			itemStatus: $itemStatus
		) {
			id
		}
	}
`;

export default function SingleItemAdd(props) {
	const [ quantity, setQuantity ] = useState(1);
	const [ expiration, setExpiration ] = useState();
	const history = useHistory();
	const { loading, error, data } = useQuery(GET_ITEM, {
		variables: {
			id: props.itemId
		}
	});

	const [ addItem, { error: addItemError } ] = useMutation(ADD_ITEM, {
		variables: {
			containerId: props.containerId,
			itemId: props.itemId,
			originalQuantity: +quantity,
			itemStatus: 'ACTIVE'
		},
		refetchQueries: [
			{
				query: GET_CONTAINER,
				variables: {
					id: props.containerId
				}
			},
			{
				query: GET_CONTAINER_ITEMS,
				variables: {
					containerId: props.containerId
				}
			}
		]
	});

	if (loading) return '...loading';
	if (error) console.log(error);
	return (
		<div>
			<h2>{data.item.name}</h2>
			<form
				id="addItem-form"
				onSubmit={(e) => {
					e.preventDefault();
					addItem();
					props.setAddToggle(false);
				}}
			>
				<div className="form">
					<label htmlFor="Quantity">Quantity:</label>
					<input onChange={(e) => setQuantity(e.target.value)} value={quantity} />
				</div>
				<button type="submit">Add this item</button>
			</form>
		</div>
	);
}
