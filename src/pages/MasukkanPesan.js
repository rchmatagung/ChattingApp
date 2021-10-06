import { makeStyles, TextField } from "@material-ui/core";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router";

/* Query Memasukkan Pesan */
const InsertMessage = gql`
mutation MyMutation($message: String!, $toUserId: String!, $fromUserId: String!) {
  insert_messages_one(object: {message: $message, toUserId: $toUserId, fromUserId: $fromUserId}) {
    id
  }
}
  `
/* Styling Input Pesan */
const useStyles = makeStyles((theme) => ({
    messageForm: {
      overflow: "hidden",
      margin: "20px",
      padding: "0",
      borderRadius:"500px"
    },
  }));

/* Deklarasi */
const MasukkanPesan = () => {
    const classes = useStyles();
    const {user} = useAuth0()
    const [message, setMessage] = useState("")
    const {id} = useParams()
    const [paramsinput, setParamsinput] = useState({})

    useEffect(()=> {
      if ( !id || id === "null") {
        setParamsinput( {
          toUserId: null,
          message: message,
          fromUserId: user.sub
        })
      } else if (id) {
        setParamsinput( {
          toUserId: id,
          message: message,
          fromUserId: user.sub
        })
      }
    }, [message])

    const [insertMessage] = useMutation(InsertMessage, {
        variables:{
          paramsinput
    }})

    const handleSubmit = (e) => {
        console.log(({variables:{
          paramsinput
        }}))
        e.preventDefault()
        insertMessage({variables:{
          ...paramsinput 
        }})
        setMessage("")
    }

    return (
        <form className={classes.messageForm} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              id="input-message"
              className={classes.messageForm.input}
              variant="outlined"
              placeholder="Ketik pesan"
              fullWidth={true}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ background: "#fff" }}
            />
        </form>
    )
}

export default MasukkanPesan