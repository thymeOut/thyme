import React, {useState} from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { useMutation } from "@apollo/client";

const InactivateContainer = (props) => {
    const [containerName, setContainerName] = useState('')
    const [inactivateContainer] = useMutation(props.UPDATE_CONTAINER,{
        variables:{
            id: props.container.id,
            input: {
                isActive: false
            }
        },
        refetchQueries: [
            {
              query: props.GET_CONTAINERS,
              variables: {
                id: localStorage.getItem("user-id"),
              },
            },
          ],
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        if(containerName === props.container.name){
            inactivateContainer()
        }
    }
  return (
    <Paper elevation={3}>
      <form onSubmit={handleSubmit}>
        If you would like to inactive {props.container.name}, please enter it
        here:
        <TextField onInput={ e=>setContainerName(e.target.value)} >
            
        </TextField>
        <button type="submit">Submit</button>
      </form>

    </Paper>
  );
};

export default InactivateContainer;