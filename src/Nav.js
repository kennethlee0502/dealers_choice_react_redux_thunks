import React from "react";
import { connect } from "react-redux";

const Nav = ({ users, things }) => {
  return (
    <nav>
      <h1>😈 Evil Company LLC 😈</h1>
    </nav>
  );
};

export default connect((state) => state)(Nav);
