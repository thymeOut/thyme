import React, { useState } from 'react';
import { Button, ButtonGroup, Dialog, Checkbox } from '@material-ui/core';
import EditContainerForm from './EditContainerForm';
import UpdateContainer from '../../server/graphql/mutations/UpdateContainer.graphql';
import { useMutation } from '@apollo/client';
import User from '../../server/graphql/queries/User.graphql';

const AdminUserContainers = (props) => {
	const [ editToggled, setEditToggled ] = useState(false);
	const [ inactiveToggled, setInactiveToggled ] = useState(false);
	const [ currentContainer, setCurrentContainer ] = useState({});
	const [ updateContainer ] = useMutation(UpdateContainer);

	const handleContainerStatus = async (e) => {
		e.preventDefault();
		console.log(!e.target.checked);
		const test = await updateContainer({
			variables: {
				id: e.target.value,
				input: {
					isActive: !e.target.checked
				}
			},
			refetchQueries: [ { query: User, variables: { id: +props.user.id } } ]
		});
	};
	return (
		<div>
			{editToggled && (
				<Dialog open={editToggled}>
					<EditContainerForm setEditToggle={setEditToggled} container={currentContainer} />
				</Dialog>
			)}

			{props.user.containers.map((container) => {
				return (
					<div key={container.id} className="admin-button-group">
						<div>{container.name}</div>
						<div>
							Active
							<Checkbox
								value={container.id}
								checked={container.isActive}
								onClick={(e) => handleContainerStatus(e)}
								inputProps={{ 'aria-label': 'primary checkbox' }}
							/>
						</div>
						<div>{container.type}</div>
						<ButtonGroup>
							<Button
								onClick={() => {
									setCurrentContainer(container);
									setEditToggled(!editToggled);
								}}
							>
								Edit
							</Button>
							<Button
								onClick={() => {
									setCurrentContainer(container);
									setInactiveToggled(!inactiveToggled);
								}}
							>
								Inactivate
							</Button>
						</ButtonGroup>
					</div>
				);
			})}
		</div>
	);
};

export default AdminUserContainers;
