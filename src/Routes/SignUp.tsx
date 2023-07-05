import { PasswordInput, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { auth } from "../utils/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setIsAuth, setIsLoading } from "../store/state/state-reudcer";
import { selectIsLoading } from "../store/state/state-selector";
import { Loader } from "@mantine/core";

const SignUp = () => {
  const signUpForm = useRef<HTMLFormElement>(null);
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      dispatch(setIsLoading(true));
      const userName = signUpForm.current?.displayName.value;
      const email = signUpForm.current?.email.value;
      const password = signUpForm.current?.password.value;
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (user) {
        await updateProfile(user, {
          displayName: userName,
        });
      }
      dispatch(setIsAuth(false));
      dispatch(setIsLoading(false));
      signUpForm.current?.reset();
      nav("/signIn");
      console.log(user);
    } catch (error: any) {
      alert(error.code);
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className=" h-screen flex px-5 items-center justify-center">
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        ref={signUpForm}
        className=" border-2 rounded-lg shadow-md p-7 w-[400px]"
      >
        <h1 className="text-2xl text-blue-600 font-bold mb-2">Register</h1>
        <hr className="" />
        <TextInput
          name="displayName"
          placeholder="username"
          className=" mt-3 mb-2"
        />
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
          <div className=" text-sm">Already have an account?</div>
          <span
            className=" cursor-pointer text-blue-800"
            onClick={() => {
              nav("/signIn");
            }}
          >
            Log in
          </span>
        </div>
        <button
          type="submit"
          disabled={isLoading ? true : false}
          className={` bg-blue-600 text-white py-2 w-full rounded-md mt-3 ${
            isLoading && "opacity-50"
          }`}
        >
          {isLoading ? (
            <div className=" flex justify-center items-center text-white">
              <Loader color="gray" size="sm" />
            </div>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
