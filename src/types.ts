interface Author {
  id: string;
  username: string;
  avatar: string | null;
  discriminator: string;
  public_flags: number;
  premium_type: number;
  flags: number;
  banner: string | null;
  accent_color: string | null;
  global_name: string;
  avatar_decoration_data: any | null;
  banner_color: string | null;
}

export interface Message {
  id: string;
  type: number;
  content: string;
  channel_id: string;
  author: Author;
  attachments: any[];
  embeds: any[];
  mentions: any[];
  mention_roles: string[];
  pinned: boolean;
  mention_everyone: boolean;
  tts: boolean;
  timestamp: string;
  edited_timestamp: string | null;
  flags: number;
  components: any[];
}


export interface Channel {
  id: string;
  type: number;
  last_message_id: string;
  flags: number;
  guild_id: string;
  name: string;
  parent_id: string;
  rate_limit_per_user: number;
  topic: string | null;
  position: number;
  permission_overwrites: any[];
  nsfw: boolean;
  icon_emoji?: {
    id: string | null;
    name: string;
  } | null;
  theme_color: string | null;
  messages: Message[];
}