import axios, { AxiosError, AxiosResponse } from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
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
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    setFriends([
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

  const friendsToDisplay = friends.map((friend: Friend) => {
    return (
      <ul className="friends-container">
        <li key={friend.id} className="friend">
          {friend.firstName} {friend.lastName}
        </li>
      </ul>
    );
  });

  return (
    <React.Fragment>
      <Header />
      {friendsToDisplay}
    </React.Fragment>
  );
};

export default HomePage;
