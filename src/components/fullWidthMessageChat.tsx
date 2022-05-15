import * as React from "react";

type FriendProp = {
  friendId: number;
};

const FullWidthMessageChat = (props: FriendProp) => {
  return (
    <React.Fragment>
      <h1>Message chat</h1>
      <p>friend Id: {props.friendId}</p>
    </React.Fragment>
  );
};

export default FullWidthMessageChat;
