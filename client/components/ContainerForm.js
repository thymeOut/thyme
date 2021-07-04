import React, { useState } from "react";

const ContainerForm = (props) => {
    const [containerName, setContainerName] = useState('')
    const [containerType, setContainerType] = useState('fridge')

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
            <button
                type="submit"
            >
                Create Container
            </button>
        </form>
    )

}

export default ContainerForm