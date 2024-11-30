import moment from "moment-timezone";

export const formatTime = (timestamp) => {
  if (timestamp === null) return "--";
  const now = moment().tz("Asia/Manila") as any;
  const time = moment(timestamp).tz("Asia/Manila") as any;
  const diff = now - time;
  const diffSeconds = Math.floor(diff / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);

  if (diffSeconds < 60) return "just now";
  if (diffMinutes < 60)
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return "more than a day";
};

export const checkOverdue = (timestamp) => {
  const now = moment().tz("Asia/Manila") as any;
  const time = moment(timestamp).tz("Asia/Manila") as any;
  const diff = now - time;
  const diffSeconds = Math.floor(diff / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);

  return diffHours >= 2 ? true : false;
};
