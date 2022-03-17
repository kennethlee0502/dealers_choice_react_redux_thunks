import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import store, { createUser } from "./store";

const removeUser = async (user) => {
  await axios.delete(`/api/users/${user.id}`);
  store.dispatch({ type: "REMOVE_USER", user });
};

const Users = ({ users, createUser }) => {
  return (
    <div>
      <button
        onClick={() => {
          createUser();
        }}
      >
        BRING ME THE NEXT EMPLOYEE{" "}
      </button>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              {user.name}
              <button onClick={() => removeUser(user)}>YOU ARE FIRE!</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (name) => {
      dispatch(createUser(name));
    },
  };
};
export default connect((state) => state, mapDispatchToProps)(Users);
