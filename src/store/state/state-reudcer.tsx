import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IinitialState {
  isPhone: boolean;
  isAuth: boolean;
  isLoading: boolean;
  roomId?: string;
}

const initialState: IinitialState = {
  isPhone: window.innerWidth >= 700 ? false : true,
  isAuth: false,
  isLoading: false,
  roomId: "",
};

const stateSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setIsPhone(state, action: PayloadAction<boolean>) {
      state.isPhone = action.payload;
    },
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setRoomId(state, action: PayloadAction<string>) {
      state.roomId = action.payload;
    },
  },
});

export const { setIsPhone, setIsAuth, setIsLoading, setRoomId } =
  stateSlice.actions;
export const stateReducer = stateSlice.reducer;
