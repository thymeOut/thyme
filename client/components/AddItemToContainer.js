import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import SingleItemAdd from './SingleItemAdd';
import { GET_CONTAINER, GET_CONTAINER_ITEMS } from './SingleContainer';

const GET_ITEMS = gql`
	query Items {
		items {
			id
			name
			imageUrl
		}
	}
`;

export default function AddItemToContainer(props) {
	const userId = localStorage.getItem('user-id');
	const containerId = props.match.params.id;
	console.log(containerId);
	const [ addToggle, setAddToggle ] = useState(false);
	const [ itemId, setItemId ] = useState(0);
	const { loading: itemLoading, error: itemError, data: itemData } = useQuery(GET_ITEMS);
	const { loading: containerLoading, error: containerError, data: containerData } = useQuery(GET_CONTAINER, {
		variables: {
			id: containerId
		}
	});

	const {
		loading: containerItemLoading,
		error: containerItemError,
		data: containerItemData
	} = useQuery(GET_CONTAINER_ITEMS, {
		variables: {
			containerId: containerId
		}
	});

	if (itemLoading || containerLoading || containerItemLoading) {
		return '...loading';
	}

	if (itemError || containerError || containerItemError) {
		return '...error';
	}

	const { container } = containerData;

	const containerItems = containerItemData.containerItems.map((cItem) => {
		let item = container.items.filter((item) => item.id === cItem.itemId)[0];

		return {
			id: cItem.id,
			itemId: item.id,
			userId: cItem.userId,
			containerId: cItem.containerId,
			name: item.name,
			imageUrl: item.imageUrl,
			containerItemImageUrl: cItem.imageUrl,
			originalQuantity: cItem.originalQuantity,
			quantityUsed: cItem.quantityUsed,
			expiration: cItem.expiration,
			itemStatus: cItem.itemStatus
		};
	});

	const containerItemsFiltered = containerItems.filter((item) => {
		return item.userId === userId && item.itemStatus === 'ACTIVE';
	});

	return (
		<React.Fragment>
			<h2>Choose one of these items</h2>
			<div>
				{itemData.items.map((item) => {
					return (
						<div key={item.id}>
							<a
								href="#"
								onClick={() => {
									setAddToggle(true);
									setItemId(item.id);
								}}
							>
								{item.name}
							</a>
						</div>
					);
				})}
			</div>
			<h3>...or, create a new one</h3>
			<Link to={{ pathname: 'create', state: { containerId: containerId } }}>Create</Link>
			{addToggle && <SingleItemAdd setAddToggle={setAddToggle} itemId={itemId} containerId={containerId} />}
			<div>
				<h2>Your Items in the Container</h2>
				{containerItemsFiltered.map((item) => {
					return (
						<div>
							<h3>{item.name}</h3>
							<p>Quantity: {item.originalQuantity}</p>
							<p>Exipration: {item.expiration}</p>
						</div>
					);
				})}
			</div>
		</React.Fragment>
	);
}
