import { createStore } from "redux";

const GOT_MESSSAGES_FROM_SERVER = "GOT_MESSAGES_FROM_SERVER";

export const gotMessagesFromSever = (messages) => ({
  type: GOT_MESSSAGES_FROM_SERVER,
  messages,
});

const initialState = { messages: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
    default:
      return state;
  }
};

const store = createStore(reducer);
export default store;