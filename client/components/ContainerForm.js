import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

const ADD_USERS_TO_CONTAINER = gql`
mutation addUserToContainer($email: String!, $containerId: ID!) {
    addUserToContainer(email: $email, containerId: $containerId ) {
    email
  }
}
`

const ContainerForm = (props) => {
    const [containerName, setContainerName] = useState('')
    const [containerType, setContainerType] = useState('fridge')
    const [users, setUsers] = useState([])
    const onKeyUp = (e) => {
        console.log(e.target.value)
        if (e.charCode === 13 && !users.find(user => user === e.target.value)) {
            setUsers([...users, e.target.value])
            console.log(users)
        }
    }
    useEffect(() => {
        console.log('state changing')
    }, [users])
    console.log(users)
    return (

        <form
            className="container-form"
            onSubmit={(e) => {
                e.preventDefault();
                props.setToggle(false)
                props.createContainer({
                    variables: {
                        name: containerName,
                        type: containerType,
                        owner: +localStorage.getItem("user-id")
                    },
               });

            }}
        >
            <select onChange={(e) => {
                setContainerType(e.target.value)
            }
            } >
                <option value="fridge">Fridge</option>
                <option value="freezer">Freezer</option>
                <option value="pantry">Pantry</option>
                <option value="minifridge">Mini-fridge</option>
            </select>
            <input
                value={containerName}
                onChange={(e) =>
                    setContainerName(e.target.value)
                }
                type="text"
                placeholder="Container Name"
            />
            <label>Add users</label>
            <input onKeyPress={onKeyUp} type='text' />

            {users && users.map((user, idx) => {
                return (
                    <input key={idx} onKeyPress={onKeyUp} type='text' />
                )

            })}

            <button
                type="submit"
            >
                Create Container
            </button>
        </form>
    )

}

export default ContainerForm
