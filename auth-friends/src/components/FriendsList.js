import React from "react";
import Loader from "react-loader-spinner";

import { axiosWithAuth } from "../utils/axiosWithAuth";

class FriendsList extends React.Component {
  state = {
    friendsList: []
  };
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    //fetch data from the server
    //the data is protected behind token
    //so our request needs to include an 'Authorization: token' header
    axiosWithAuth()
      .get("/api/friends")
      .then(res => {
        console.log(res);
        this.setState({ friendsList: res.data });
      })
      .catch(err => console.log(err.response));
  };

  render() {
    return (
      <div>
        <h1>All My Friends!!</h1>
        {/* {this.fetchingData && (
          <div>
            <Loader type="Puff" color="#204963" height="60" width="60" />
            <p>Loading Data</p>
          </div>
        )} */}
        {this.state.friendsList.map(friend => {
            return (
          <div key={friend.id}>
            <h3>{friend.name}</h3>
            {/* <button>X</button>
            <button>Edit</button> */}
          </div>
    )})}
      </div>
    );
  }
}

export default FriendsList;
