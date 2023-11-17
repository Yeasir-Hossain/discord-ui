import React from "react";
import Marquee from "@/components/marquee/Marquee";
import { useEffect } from "react";
import req from "@/utils/req";
import { shallowEqual, useDispatch } from "react-redux";
import { setChannels } from "@/redux/reducers/channels";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Channel } from "@/types";
import Wrapper from "./Wrapper";

export default function Channel() {
  const { channels } = useSelector(
    (state: RootState) => ({
      channels: state.channelStore.channels,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    req({ uri: "channels" })
      .then((response) => {
        dispatch(setChannels(response));
      })
      .catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {channels.length > 0 && (
        <>
          <Marquee />
          {channels
            .filter((d) => d.name !== "notice")
            .map((d: Channel) => (
              <Wrapper key={d.id} data={d} />
            ))}
        </>
      )}
    </>
  );
}
