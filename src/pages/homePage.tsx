import axios, { AxiosError, AxiosResponse } from "axios";
import * as React from "react";
import { MouseEventHandler, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/header";
import MobileMessageChat from "./mobileMessageChat";
import "./homePage.scss";
import FullWidthMessageChat from "../components/fullWidthMessageChat";
import FullWidthFriendHeader from "../components/fullWidthFriendHeader";

const serverUrl = process.env.REACT_APP_WEBSOCKET_URL;

type Friend = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

const HomePage = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [friends, setFriends] = useState([]);

  const [chosenFriend, setChosenFriend] = useState(
    friends.length != 0 ? friends[0] : {}
  );

  useEffect(() => {
    window.addEventListener("resize", () =>
      setIsMobile(window.innerWidth < 800)
    );
    return () => {
      window.removeEventListener("resize", () =>
        setIsMobile(window.innerWidth < 800)
      );
    };
  }, []);

  useEffect(() => {
    axios
      .get(`${serverUrl}/api/friends`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((result: AxiosResponse) => {
        setFriends(result.data);
      })
      .catch((error: AxiosError) => {
        console.log("error receiving friends");
        console.log(error);
        navigate("login");
      });
  }, []);

  const MobileView = () => {
    return (
      <div className="mobile-friends-container">
        {friends.map((friend: Friend) => {
          return (
            <button
              key={friend.id}
              className="friend-button"
              onClick={(e: any) => {
                navigate(
                  `friend/${friend.id}/${friend.firstName}/${friend.lastName}`
                );
              }}
            >
              {friend.firstName} {friend.lastName}
            </button>
          );
        })}
      </div>
    );
  };

  const FullScreenFriendList = () => {
    return (
      <div className="friends-container">
        {friends.map((friend: Friend) => {
          return (
            <button
              key={friend.id}
              className="friend-button"
              onClick={(e: any) => {
                setChosenFriend(friend);
              }}
            >
              {friend.firstName} {friend.lastName}
            </button>
          );
        })}
      </div>
    );
  };

  const FullScreenView = () => {
    return (
      <React.Fragment>
        <div className="full-screen-container">
          <FullScreenFriendList />
          <div className="full-screen-message-container">
            <FullWidthFriendHeader
              firstName={
                chosenFriend.firstName !== null ? chosenFriend.firstName : ""
              }
              lastName={
                chosenFriend.lastName !== null ? chosenFriend.lastName : ""
              }
            />
            <FullWidthMessageChat friendId={chosenFriend.id} />
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Header loggedIn={true} />
      {isMobile ? <MobileView /> : <FullScreenView />}
    </React.Fragment>
  );
};

export default HomePage;
