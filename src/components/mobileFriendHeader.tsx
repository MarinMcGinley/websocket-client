import * as React from "react";
import { useNavigate } from "react-router-dom";
import "./mobileFriendHeader.scss";

type FriendProp = {
  firstName: string;
  lastName: string;
};

const MobileFriendHeader = (props: FriendProp) => {
  const navigate = useNavigate();

  const goBack = (event: any) => {
    event.preventDefault();
    navigate("/");
  };
  return (
    <div className="mobile-friend-header-container">
      <button className="arrow-back-button" onClick={(e) => goBack(e)}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <h3>{props.firstName}</h3>
    </div>
  );
};

export default MobileFriendHeader;
