import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import axios from "axios";
import socket from "./socket";

// Action Types
const GOT_MESSSAGES_FROM_SERVER = "GOT_MESSAGES_FROM_SERVER";
const WRITE_MESSAGE = "WRITE_MESSAGE";
const GOT_NEW_MESSAGE_FROM_SERVER = "GOT_NEW_MESSAGE_FROM_SERVER";

// Action Creators
export const gotMessagesFromSever = (messages) => ({
  type: GOT_MESSSAGES_FROM_SERVER,
  messages,
});

export const writeMessage = (inputContent) => ({
  type: WRITE_MESSAGE,
  newMessageEntry: inputContent,
});

export const gotNewMessageFromSever = (message) => ({
  type: GOT_NEW_MESSAGE_FROM_SERVER,
  message,
});

// Initial State
const initialState = {
  messages: [],
  newMessageEntry: "",
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
    case WRITE_MESSAGE:
      return { ...state, newMessageEntry: action.newMessageEntry };
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return { ...state, messages: [...state.messages, action.message] };
    default:
      return state;
  }
};

export const fetchMessages = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/messages");
    const messages = response.data;
    const action = gotMessagesFromSever(messages);
    dispatch(action);
  };
};

export const postMessage = (message) => {
  return async (dispatch) => {
    const response = await axios.get("/api/messages", message);
    const newMessage = response.data;
    const action = gotNewMessageFromSever(newMessage);
    dispatch(action);
    socket.emit("new-message", newMessage);
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export default store;
