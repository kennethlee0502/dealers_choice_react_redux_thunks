import { createStore, combineReducers, applyMiddleware } from "redux";
const LOAD_USERS = "LOAD_USERS";
const CREATE_USER = "CREATE_USER";
const REMOVE_USER = "REMOVE_USER";
import axios from "axios";
import thunk from "redux-thunk";

const usersReducer = (state = [], action) => {
  if (action.type === LOAD_USERS) {
    state = action.users;
  }
  if (action.type === CREATE_USER) {
    state = [...state, action.user];
  }
  if (action.type === REMOVE_USER) {
    state = state.filter((user) => user.id !== action.user.id);
  }
  return state;
};

const reducer = combineReducers({
  users: usersReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

const loadUsers = (users) => {
  return {
    type: LOAD_USERS,
    users,
  };
};

const _createUser = (user) => {
  return {
    type: CREATE_USER,
    user,
  };
};

const createUser = (name) => {
  return async (dispatch) => {
    const user = (await axios.post("/api/users", { name })).data;
    dispatch(_createUser(user));
  };
};

export default store;
export { loadUsers, createUser };
