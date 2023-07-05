import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { auth, db } from "../utils/Firebase";
import { useAppSelector } from "../store/store";
import { selectRoomId } from "../store/state/state-selector";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

interface it {
  nanoseconds: number;
  seconds: number;
}

interface messagesType {
  createdAt: it;
  roomId: string;
  text: string;
  user: string;
  id: string;
}

const Chat = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const roomId = useAppSelector(selectRoomId);
  const colMessageRef = collection(db, "messages");
  const nav = useNavigate();

  const [messages, setMessages] = useState<messagesType[]>([]);

  useEffect(() => {
    const q = query(
      colMessageRef,
      where("roomId", "==", roomId),
      orderBy("createdAt")
    );
    const unsub = onSnapshot(q, (snapShot) => {
      const updatedMessages: messagesType[] = [];
      snapShot.forEach((doc) => {
        const data = doc.data() as messagesType; // Cast doc.data() to MessageType
        updatedMessages.push({
          ...data, // {...doc.data() , id : doc.id}
          id: doc.id,
        });
      });
      setMessages(updatedMessages);
    });
    return () => {
      unsub(); // Unsubscribe from the snapshot listener when the component unmounts
    };
  }, []);

  const sendHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (formRef.current?.message.value === "") return;
      await addDoc(colMessageRef, {
        text: formRef.current?.message.value,
        createdAt: serverTimestamp(),
        user: auth.currentUser?.displayName,
        roomId,
      });
      formRef.current?.reset();
    } catch (error: any) {
      alert(error.code);
    }
  };

  return (
    <div className=" flex h-screen md:p-10 justify-center">
      <div className=" flex relative flex-col py-3 px-4 border-2 h-full w-full md:w-2/4">
        <div className=" font-bold text-3xl flex justify-between items-center">
          <h1>Room : {roomId}</h1>
          <div className=" cursor-pointer" onClick={() => nav("/")}>
            <GrClose />
          </div>
        </div>
        <div className=" mt-4">
          {messages.map((text, i) => (
            <div className=" flex gap-2" key={i}>
              <h1 className=" font-bold ">{text.user} :</h1>
              <p>{text.text}</p>
            </div>
          ))}
        </div>
        <form
          ref={formRef}
          onSubmit={(e) => sendHandler(e)}
          className=" w-full gap-4 md:gap-0 grid grid-cols-12 absolute bottom-2"
        >
          <input
            name="message"
            placeholder="send a message"
            type="text"
            className=" col-span-8 md:col-span-9 border-b-2 outline-none"
          />
          <button className=" md:ms-12 col-span-3 md:col-span-2 flex items-center gap-2 w-auto justify-center rounded-md text-white bg-blue-500  py-2">
            <span className=" hidden md:block">Send</span>
            <span>
              <AiOutlineSend />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
