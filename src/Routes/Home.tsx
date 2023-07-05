import { useAppDispatch, useAppSelector } from "../store/store";
import { useRef } from "react";
import { setRoomId } from "../store/state/state-reudcer";
import { signOut } from "firebase/auth";
import { setIsAuth } from "../store/state/state-reudcer";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/Firebase";

const Home = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const signOutHandler = async () => {
    await signOut(auth);
    dispatch(setIsAuth(false));
  };

  const joinHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const value = formRef.current?.roomId.value;
      if (value === "") return;
      dispatch(setRoomId(value));
      formRef.current?.reset();
      nav("/chat");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className=" px-3 h-screen flex relative justify-center items-center">
      <button
        onClick={signOutHandler}
        className=" bg-red-500 py-3 absolute top-2 right-5 px-3 rounded-md"
      >
        sign out
      </button>
      <form
        ref={formRef}
        onSubmit={(e) => joinHandler(e)}
        action=""
        className=" flex flex-col items-center"
      >
        <h1 className=" text-3xl font-bold">Enter Room Id</h1>
        <input
          name="roomId"
          type="number"
          placeholder="Enter room id"
          className="my-4 border-2 py-5 px-2 rounded-md border-blue-600 focus:outline-blue-800 focus:shadow-lg"
        />
        <button
          type="submit"
          className=" bg-blue-600 px-5 py-2 font-bold text-white rounded-md"
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default Home;
