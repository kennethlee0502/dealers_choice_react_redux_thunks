import axios from "axios";
import React from "react";
import { render } from "react-dom";
import { Provider, connect } from "react-redux";
import store, { loadUsers } from "./store";
import Nav from "./Nav";
import Users from "./Users";

const App = connect(
  (state) => {
    return state;
  },
  (dispatch) => {
    return {
      bootstrap: async () => {
        const users = (await axios.get("/api/users")).data;
        dispatch(loadUsers(users));
      },
    };
  }
)(
  class App extends React.Component {
    componentDidMount() {
      this.props.bootstrap();
      window.addEventListener("hashchange", () => {
        this.props.setView(window.location.hash.slice(1));
      });
    }
    render() {
      const { users } = this.props;
      return (
        <div>
          <Nav />
          <Users />
        </div>
      );
    }
  }
);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
