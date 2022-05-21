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

const SearchBar = (props: { handleFoundUsers: Function }) => {
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
    <div className="">
      <input
        className="search-bar"
        type="text"
        onChange={handleSearchStringChange}
      />
    </div>
  );
};

const AddFriendComponent = () => {
  const [foundUsers, setFoundUsers] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleFoundUsers = (users: User[]) => {
    setFoundUsers(users);
  };

  return (
    <div className="add-friend-container">
      {showSearchBar ? (
        <React.Fragment>
          <SearchBar handleFoundUsers={handleFoundUsers} />

          {foundUsers.map((user: User) => {
            return (
              <button
                key={user.id}
                className="friend-button"
                onClick={(e: any) => {
                  console.log(user);
                }}
              >
                {user.firstName} {user.lastName}
              </button>
            );
          })}
        </React.Fragment>
      ) : (
        <i
          className="fa-solid fa-user-plus"
          onClick={() => {
            setShowSearchBar(true);
          }}
        />
      )}
    </div>
  );
};

export default AddFriendComponent;
