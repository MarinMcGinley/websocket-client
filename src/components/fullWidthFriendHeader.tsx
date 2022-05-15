import * as React from "react";
import "./fullWidthFriendHeader.scss";

type FriendProp = {
  firstName: string;
  lastName: string;
};

const FullWidthFriendHeader = (props: FriendProp) => {
  return (
    <div className="full-width-friend-header-container">
      <h3>
        {props.firstName} {props.lastName}
      </h3>
    </div>
  );
};

export default FullWidthFriendHeader;
