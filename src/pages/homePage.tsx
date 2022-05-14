import axios, { AxiosError, AxiosResponse } from "axios";
import * as React from "react";
import { MouseEventHandler, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/header";
import MobileMessageChat from "./mobileMessageChat";
import "./homePage.scss";

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
  const [friends, setFriends] = useState([
    {
      id: 1,
      email: "annagyda@gmail.com",
      firstName: "Anna Gyða",
      lastName: "Gunnlaugsdóttir",
    },
    {
      id: 2,
      email: "annagyda@gmail.com",
      firstName: "Marín Ingibjörg",
      lastName: "McGinley",
    },
    {
      id: 3,
      email: "annagyda@gmail.com",
      firstName: "Jóhanna",
      lastName: "Gunnlaugsdóttir",
    },
    {
      id: 4,
      email: "annagyda@gmail.com",
      firstName: "Páll",
      lastName: "Gunnlaugsson",
    },
    {
      id: 5,
      email: "annagyda@gmail.com",
      firstName: "Iðunn",
      lastName: "Pálsdóttir",
    },
    {
      id: 6,
      email: "annagyda@gmail.com",
      firstName: "Edda",
      lastName: "Pálsdóttir",
    },
    {
      id: 7,
      email: "annagyda@gmail.com",
      firstName: "Logi",
      lastName: "Pálsson",
    },
    {
      id: 8,
      email: "annagyda@gmail.com",
      firstName: "Inga Hlíf",
      lastName: "Melvinsdóttir",
    },
    {
      id: 9,
      email: "annagyda@gmail.com",
      firstName: "Eirik",
      lastName: "Brandsas",
    },
    {
      id: 10,
      email: "annagyda@gmail.com",
      firstName: "Pétur Sólmar",
      lastName: "Guðjónsson",
    },
    {
      id: 11,
      email: "annagyda@gmail.com",
      firstName: "Erna Þórey",
      lastName: "Jónasdóttir",
    },
    {
      id: 12,
      email: "annagyda@gmail.com",
      firstName: "Jóhanna Margrét",
      lastName: "Logadóttir",
    },
    {
      id: 13,
      email: "annagyda@gmail.com",
      firstName: "Edda Katrín",
      lastName: "Logadóttir",
    },
  ]);
  const [chosenFriend, setChosenFriend] = useState(null);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setIsMobile(window.innerWidth < 800)
    );
    return () => {
      window.removeEventListener("resize", () =>
        setIsMobile(window.innerWidth < 800)
      );
    };

    // axios
    //   .get(`${serverUrl}/api/friends`, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    //     },
    //   })
    //   .then((result: AxiosResponse) => {
    //     setFriends(result.data);
    //   })
    //   .catch((error: AxiosError) => {
    //     console.log("error receiving friends");
    //     console.log(error);
    //     navigate("login");
    //   });
  });

  const mobileView = () => {
    return (
      <div className="friends-container">
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
        ;
      </div>
    );
  };

  const fullScreenView = () => {};

  // return (
  //   <React.Fragment>
  //     <Header />
  //     {chosenFriend == null ? (
  //       <ul className="friends-container">{friendsToDisplay}</ul>
  //     ) : (
  //       <MobileMessageChat friendId={chosenFriend} />
  //     )}
  //   </React.Fragment>
  // );
  return (
    <React.Fragment>
      <Header />
      {isMobile ? mobileView() : "NOT MOBILE"}
    </React.Fragment>
  );
};

export default HomePage;
