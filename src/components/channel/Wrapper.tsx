import React, { useEffect } from "react";
import Table from "../shared/Table";
import { Channel } from "@/types";
import req from "@/utils/req";
import { useDispatch } from "react-redux";
import { insertMessages } from "@/redux/reducers/channels";
import { MdErrorOutline } from "react-icons/md";

const Wrapper: React.FC<{ data: Channel }> = ({ data }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    req({ uri: `messages/${data.id}` })
      .then((response) => {
        dispatch(insertMessages(response));
      })
      .catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mt-10">
      <h1 className="heading capitalize">#{data.name}</h1>
      {data?.messages?.length > 0 ? (
        <Table messages={data.messages} />
      ) : (
        <div className="flex gap-2 items-center">
          <MdErrorOutline size={20} color="red" />
          <h1 className="text-2xl font-bold">No messages in this channel</h1>
        </div>
      )}
    </div>
  );
};

export default Wrapper;
