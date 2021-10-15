import { gql, useSubscription } from "@apollo/client";
import Chatting from "../components/Chatting";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router";

const GetMessage = gql`
  subscription MyQuery($where: messages_bool_exp = {}) {
    messages(where: $where, order_by: { createdAt: asc }) {
      id
      fromUserId
      message
      fromUser {
        name
        picture
      }
      createdAt
    }
  }
`;

const Pesan = () => {
  const { id } = useParams();
  const { user } = useAuth0();
  let params = { where: {} };
  if (!id || id === "null") {
    params.where = {
      toUserId: {
        _is_null: true,
      },
    };
  } else if (id) {
    params.where = {
      _or: [
        {
          fromUserId: {
            _eq: user.sub,
          },
          toUserId: {
            _eq: id,
          },
        },
        {
          fromUserId: {
            _eq: id,
          },
          toUserId: {
            _eq: user.sub,
          },
        },
      ],
    };
  }
  const { data } = useSubscription(GetMessage, { variables: params });

  //Handle scroll agar dapat melihat pesan terakhir langsung
  setTimeout(() => {
    const cb = document.getElementById("chat-content").parentElement;
    if (cb) {
      cb.scrollTop = cb.scrollHeight;
    }
  }, 200);

  return (
    <div id="chat-content">
      {data?.messages.map((m) => {
        return <Chatting key={m.id} id={m.id} message={m} dataMessage={m} isMe={user.sub === m.fromUserId} />;
      })}
    </div>
  );
};

export default Pesan;
