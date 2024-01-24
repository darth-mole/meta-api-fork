import * as Stream from "stream";

declare module "meta-api" {
  export function login(
    loginData: LoginData,
    callback: Callback<Api>,
  ): Promise<void>;

  export type Callback<T> = (err: any, data: T) => void;

  export type LoginData = {
    cookies?: CookieObject[];
    email?: string;
    password?: string;
    configs?: Config;
    language?: string;
  };

  export type CookieObject = {
    key: string;
    name: string;
    value: string;
    expires: string;
    domain: string;
    path: string;
  };

  export type Config = {
    autoUpdate: boolean;
    selfListen: boolean;
    selfListenEvents: boolean;
    listenEvents: boolean;
    listenTyping: boolean;
    updatePresence: boolean;
    readReceipt: boolean;
    autoMarkRead: boolean;
    onlineStatus: boolean;
    emitReady: boolean;
    autoReconnect: boolean;
    userAgent: string;
  };

  export type Api = {
    setConfigs: (options: Config, callback?: Callback<Config>) => void;

    listen: (callback: Callback<ListenData>) => Promise<void>;

    markRead: (
      threadID: string,
      read?: boolean,
      callback?: Callback<null>,
    ) => Promise<void>;

    sendMessage: (
      message: string | MessageObject,
      threadID: string,
      replyToMessage?: Callback<SentMessageInfo>,
      callback?: Callback<SentMessageInfo>,
    ) => Promise<void>;

    setMessageReaction: (
      reaction: string,
      messageID: string,
      callback?: Callback<null>,
    ) => Promise<void>;
  };

  export type ListenData = {
    type: "message" | string;
    body: string;
    isGroup: boolean;
    threadID: string;
    senderID: string;
    messageID: string;
    timestamp: string;
  };

  export type MessageObject = {
    body?: string;
    sticker?: string;
    attachment?: Stream.Readable | Stream.Readable[];
    url?: string;
    emoji?: string;
    emojiSize?: "small" | "medium" | "large";
    mentions?: Array<{
      id: string;
      tag: string;
      fromIndex?: number;
    }>;
    location?: {
      latitude: number;
      longitude: number;
      current?: boolean;
    };
  };

  export type SentMessageInfo = {
    threadID: string;
    messageID: string;
    timestamp: string;
  };
}
