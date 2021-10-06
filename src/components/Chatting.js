import { makeStyles } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { Delete } from "@material-ui/icons";
import { gql, useMutation } from "@apollo/client";

/* Query Hapus Pesan */
const DeleteMessage = gql`
    mutation MyMutation($id: uuid!) {
      delete_messages_by_pk(id: $id) {
        id
      }
    }
`

/* Styling  */
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: "0 16px 4px",
    paddingLeft: props => props.isMe ? "40px" : "16px",
    marginTop: "40px",
  },

  img: {
    position: "absolute",
    left: "-32px",
    margin: "0",
    height: "50px",
    width: "50px",
    top: "0",
    borderRadius:"500px"
  },

  bubble: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    maxWidth: "100%",
    borderRadius: "20px",
    backgroundColor: props => props.isMe ? "#e0e0e0" : "#3c4252",
    color: props => props.isMe ? "rgba(0,0,0,.87)" : "#fff",
    marginLeft: props => props.isMe ? "auto" : "initial",
  },

  timestamp: {
    position: "absolute",
    width: "100%",
    fontSize: "11px",
    marginTop: "8px",
    top: "100%",
    left: "0",
    whiteSpace: "nowrap",
    color: "#999",
    textAlign: props => props.isMe ? "right" : "left",
  }
}));

const Chatting = (props) => {
  const classes = useStyles(props);
  const { id, isMe, message } = props;
  const [deleteMessage] = useMutation(DeleteMessage)

    const deletepesan = id => {
      deleteMessage({variables:{
        id:id
      }})
      console.log("id", id)
    }

  return (
    <div className={classes.root} >
      {!isMe &&
        <img className={classes.img} 
            alt="" src={message.fromUser.picture} />
      }
      <div className={classes.bubble}>
        <div>
          {message.message}
        </div>
        <Delete onClick={()=>deletepesan(id)}/>
        <div className={classes.timestamp}>{moment(message.createdAt).format('l LT')}</div>
      </div>
    </div>
  );
};

export default Chatting;
