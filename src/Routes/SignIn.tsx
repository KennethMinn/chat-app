import { PasswordInput, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { auth } from "../utils/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setIsAuth, setIsLoading } from "../store/state/state-reudcer";
import { selectIsLoading } from "../store/state/state-selector";
import { Loader } from "@mantine/core";

const SignIn = () => {
  const signInForm = useRef<HTMLFormElement>(null);
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      dispatch(setIsLoading(true));
      const email = signInForm.current?.email.value;
      const password = signInForm.current?.password.value;
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log({ user });
      dispatch(setIsAuth(true));
      signInForm.current?.reset();
      dispatch(setIsLoading(false));
      nav("/");
      console.log(auth.currentUser?.displayName);
    } catch (error: any) {
      alert(error.code);
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className=" h-screen flex px-5 items-center justify-center">
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        ref={signInForm}
        className=" border-2 rounded-lg shadow-md p-7 w-[400px]"
      >
        <h1 className=" text-blue-600 text-2xl font-bold mb-2">Sign In</h1>
        <hr className="" />
        <TextInput
          name="email"
          placeholder="youremail@gmail.com"
          className=" mt-3 mb-2"
        />
        <PasswordInput
          name="password"
          placeholder="enter your password"
          className=" mt-3"
        />
        <div className=" flex gap-1 items-center mt-2">
          <div className=" text-sm">Don't have an account?</div>
          <span
            className=" cursor-pointer text-blue-800"
            onClick={() => {
              nav("/signUp");
            }}
          >
            Register
          </span>
        </div>
        <button
          type="submit"
          disabled={isLoading && true}
          className={`bg-blue-600 text-white py-2 w-full rounded-md mt-3 ${
            isLoading && "opacity-50"
          }`}
        >
          {isLoading ? (
            <div className=" flex justify-center items-center text-white">
              <Loader color="gray" size="sm" />
            </div>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
