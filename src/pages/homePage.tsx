import axios, { AxiosError, AxiosResponse } from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const serverUrl = process.env.REACT_APP_WEBSOCKET_URL;

const HomePage = () => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState({});

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
  });

  return (
    <div className="homepage-container">
      <h1 className="title">home page</h1>
    </div>
  );
};

export default HomePage;
