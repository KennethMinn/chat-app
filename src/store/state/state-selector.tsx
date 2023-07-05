import { createSelector } from "reselect";
import { RootState } from "../store";

const selectStateReducer = (state: RootState) => state.state;

export const selectUser = createSelector(
  [selectStateReducer],
  (state) => state.isPhone
);

export const selectIsAuth = createSelector(
  [selectStateReducer],
  (state) => state.isAuth
);

export const selectIsLoading = createSelector(
  [selectStateReducer],
  (state) => state.isLoading
);

export const selectRoomId = createSelector(
  [selectStateReducer],
  (state) => state.roomId
);
