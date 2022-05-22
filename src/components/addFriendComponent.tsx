import { AxiosError, AxiosResponse } from "axios";
import * as React from "react";
import { useState } from "react";
import "./addFriendComponent.scss";

const axios = require("axios").default;

const serverUrl = process.env.REACT_APP_WEBSOCKET_URL;

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

const SearchBar = (props: { handleFoundUsers: Function; goBack: Function }) => {
  const [searchString, setSearchString] = useState("");

  const handleSearchStringChange = (event: any) => {
    setSearchString(event.target.value);
    console.log(event.target.value);

    axios
      .get(
        `${serverUrl}/api/users/find?searchString=${event.target.value}&pageSize=5&pageIndex=1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((result: AxiosResponse) => {
        props.handleFoundUsers(result.data);
      })
      .catch((error: AxiosError) => {
        console.log("error getting users from search");
        console.log(error);
      });
  };

  return (
    <div className="search-bar-container">
      <button
        className="arrow-back-button"
        onClick={() => {
          props.goBack();
        }}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <input
        className="search-bar"
        type="text"
        onChange={handleSearchStringChange}
      />
    </div>
  );
};

type MyProps = {
  friendAdded: Function;
};

const AddFriendComponent = (props: MyProps) => {
  const [foundUsers, setFoundUsers] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleFoundUsers = (users: User[]) => {
    setFoundUsers(users);
  };

  const stopSearching = () => {
    setShowSearchBar(false);
  };

  const addFriend = (user: User) => {
    console.log(user);
    axios
      .post(
        `${serverUrl}/api/friends/${user.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((response: AxiosResponse) => {
        console.log("success");
        console.log(response);
        props.friendAdded();
      })
      .catch((error: AxiosError) => {
        console.log("error");
        console.log(error);
        setShowSearchBar(false);
      });
  };

  return (
    <div className="add-friend-container">
      {showSearchBar ? (
        <div className="search-with-users-container">
          <SearchBar
            handleFoundUsers={handleFoundUsers}
            goBack={stopSearching}
          />
          <div className="found-users-container">
            {foundUsers.map((user: User) => {
              return (
                <div key={user.id} className="user-container">
                  <div className="user-info">
                    <div className="user-name">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="user-email">{user.email}</div>
                  </div>
                  <button
                    className="button-container"
                    onClick={() => {
                      addFriend(user);
                    }}
                  >
                    <i className="fa-solid fa-plus middle"></i>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="add-friend-icon-container">
          <i
            className="fa-solid fa-user-plus"
            onClick={() => {
              setShowSearchBar(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AddFriendComponent;
