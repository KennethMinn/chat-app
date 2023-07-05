import { combineReducers } from "@reduxjs/toolkit";
import { stateReducer } from "./state/state-reudcer";

export const rootReducer = combineReducers({
  state: stateReducer,
});
