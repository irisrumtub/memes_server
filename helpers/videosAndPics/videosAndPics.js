const fs = require("fs").promises;
const path = require("path");

const videosAndPics = async (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  endDate.setHours(23, 59, 59);
  const usersfile = path.join(__dirname, "../../data/users.json");
  const messagesfile = path.join(__dirname, "../../data/messages.json");

  try {
    const [usersContent, messagesContent] = await Promise.all([
      fs.readFile(usersfile, "utf-8"),
      fs.readFile(messagesfile, "utf-8"),
    ]);

    const users = JSON.parse(usersContent);
    const messages = JSON.parse(messagesContent);

    const usersIterable = Object.keys(users);
    const usersObj = {};
    const total = {
      videos: 0,
      pics: 0,
    };

    usersIterable.forEach((user) => {
      usersObj[user] = {
        videos: 0,
        pictures: 0,
      };
    });

    messages.forEach((entity) => {
      if (entity.className !== "Message") return;
      const ts = entity.date * 1000;
      const mDate = new Date(ts);
      if (!(mDate >= startDate) || !(mDate < endDate)) return;
      try {
        if (!entity.media && !entity.message.includes("instagram")) return;
        if (
          entity.media.photo ||
          entity.media.document.mimeType.includes("image")
        ) {
          usersObj[entity.fromId.userId].pictures++;
          total.pics++;
        }
        if (
          (entity.media.document &&
            entity.media.document.mimeType.includes("video")) ||
          entity.message.includes("instagram")
        ) {
          usersObj[entity.fromId.userId].videos++;
          total.videos++;
        }
      } catch (err) {}
    });

    return { usersObj, total };
  } catch (error) {
    console.error("Error while processing videosAndPics:", error);
    throw error;
  }
};

module.exports = videosAndPics;
