import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Channel, Message } from "../../types";

const initialState: { channels: Channel[] } = {
  channels: [],
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action: PayloadAction<Channel[]>) => {
      state.channels = action.payload;
    },
    addChannel: (state, action: PayloadAction<Channel>) => {
      state.channels.push(action.payload);
    },
    removeChannel: (state, action: PayloadAction<string>) => {
      state.channels = state.channels.filter((channel) => channel.id !== action.payload);
    },
    insertMessages: (state, action: PayloadAction<Message[]>) => {
      const targetChannelId = action.payload[0].channel_id;
      const updatedChannels = state.channels.map((channel) => {
        if (channel.id === targetChannelId) {
          return {
            ...channel,
            messages: [...(channel.messages ?? []), ...action.payload],
          };
        }
        return channel;
      });

      state.channels = updatedChannels;
    },

    addMessage: (state, action: PayloadAction<Message>) => {
      state.channels = state.channels.map((channel) => {
        if (channel.id === action.payload.channel_id) {
          return {
            ...channel,
            messages: [action.payload, ...(channel.messages || [])],
          };
        }
        return channel;
      });
    },
    updateMessage: (state, action: PayloadAction<Message>) => {
      state.channels = state.channels.map((channel) => {
        if (channel.id === action.payload.channel_id) {
          return {
            ...channel,
            messages: channel.messages.map((message) => {
              if (message.id === action.payload.id) {
                return action.payload;
              }
              return message;
            }),
          };
        }
        return channel;
      })
    },
    removeMessage: (state, action: PayloadAction<{ channelId: string, id: string }>) => {
      state.channels = state.channels.map((channel) => {
        if (channel.id === action.payload.channelId) {
          return {
            ...channel,
            messages: channel.messages.filter((message) => message.id !== action.payload.id),
          };
        }
        return channel;
      });
    }
  },
});

export const {
  setChannels,
  addChannel,
  removeChannel,
  insertMessages,
  addMessage,
  updateMessage,
  removeMessage,
} = channelSlice.actions;
export default channelSlice.reducer;
