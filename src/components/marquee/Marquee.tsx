/* eslint-disable react-hooks/exhaustive-deps */
import { insertMessages } from "@/redux/reducers/channels";
import { RootState } from "@/redux/store";
import req from "@/utils/req";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
import { MdOutlineNotificationsActive } from "react-icons/md";

const Marquee: React.FC = () => {
  const dispatch = useDispatch();
  const { channels } = useSelector(
    (state: RootState) => ({
      channels: state.channelStore.channels,
    }),
    shallowEqual
  );
  useEffect(() => {
    const notice = channels.find((d) => d.name === "notice");
    if (notice) {
      req({ uri: `messages/${notice.id}?channel=notice` })
        .then((response) => dispatch(insertMessages(response)))
        .catch((error) =>
          console.error("Error fetching notice messages:", error)
        );
    }
  }, []);

  return (
    <div className="overflow-hidden relative whitespace-nowrap border-2 border-primary rounded py-2 shadow-inset-white">
      <div className="animate-marquee flex gap-5">
        {channels.length > 0 &&
          channels
            .filter((d) => d.name === "notice")[0]
            .messages?.map((notice) => (
              <div key={notice.id} className="mx-5 flex items-center gap-2">
                <MdOutlineNotificationsActive
                  className="text-primary"
                  size={20}
                />
                {notice.content.replace(/<[^>]+>/g, "")}
              </div>
            ))}
      </div>
    </div>
  );
};

export default Marquee;
