import React, { useEffect } from "react";
import { FaDiscord } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";
import { TbLogout } from "react-icons/tb";
import Image from "next/image";
import {
  addMessage,
  removeMessage,
  updateMessage,
} from "@/redux/reducers/channels";
import { Message } from "@/types";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "", {
  autoConnect: false,
});

export default function Navbar() {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  // socket connection on user load
  useEffect(() => {
    if (session) {
      socket.connect();
      socket.on("message", (data: Message) => {
        dispatch(addMessage(data));
      });
      socket.on("messageUpdate", (data: Message) => {
        dispatch(updateMessage(data));
      });
      socket.on("messageDelete", (data: { channelId: string; id: string }) => {
        dispatch(removeMessage(data));
      });
    }
    return () => {
      socket.off("message");
      socket.off("messageUpdate");
      socket.off("messageDelete");
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
  return (
    <div className="w-full flex items-center justify-end">
      {status === "authenticated" ? (
        <div className="flex justify-center items-center space-x-2">
          <Image
            src={session?.user?.image || ""}
            alt="profile"
            width={32}
            height={32}
            className="rounded-full w-8 h-8"
          />
          <p className="text-primary font-semibold uppercase">
            {session?.user?.name}
          </p>
          <button
            onClick={() => signOut()}
            className="px-2 py-2 hover:shadow hover:shadow-primary rounded transition-all duration-300"
          >
            <TbLogout size={20} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("discord")}
          className="btn-primary flex items-center space-x-2"
        >
          <FaDiscord size={18} />
          <p>Log in</p>
        </button>
      )}
    </div>
  );
}
