import * as React from "react";
import { useParams } from "react-router-dom";
import MobileFriendHeader from "../components/mobileFriendHeader";

const MobileMessageChat = () => {
  const { friendId, firstName, lastName } = useParams();
  return (
    <React.Fragment>
      <MobileFriendHeader firstName={firstName} lastName={lastName} />
      <h1>Message chat</h1>
      <p>friend Id: {friendId}</p>
    </React.Fragment>
  );
};

export default MobileMessageChat;
