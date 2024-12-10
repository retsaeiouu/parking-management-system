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

  // return diffMinutes >= 2 ? true : false;
  return diffHours >= 2 ? true : false;
};

export const getTimeLeft = (time) => {
  const inputTime = moment(time).tz("Asia/Manila") as any;
  const currentTime = moment().tz("Asia/Manila") as any;

  const timeDifference = currentTime - inputTime;
  const timeLimit = 2 * 60 * 60 * 1000;
  // const timeLimit = 1000;
  const timeLeft = timeLimit - timeDifference;

  if (timeLeft <= 0) {
    return "";
  }

  const hours = Math.floor(timeLeft / (60 * 60 * 1000));
  const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));

  if (hours > 1) {
    return `${hours} hours left`;
  } else if (hours === 1 && minutes > 0) {
    return `${hours} hour ${minutes} mins left`;
  } else if (minutes > 0) {
    return `${minutes} mins left`;
  } else {
    return "Less than a minute left";
  }
};

export const convertTimeTo12HFormat = (time: Date) => {
  return time
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .toLowerCase();
};

export const getCurrentDate = () => {
  const date = new Date();
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
