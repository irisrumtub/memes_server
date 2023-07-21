const express = require("express");
const router = express.Router();
const path = require("path");
const msgsAndMemesByDay = require("../helpers/dateMesMem/dateMesMem");
const dailyUserStats = require("../helpers/dailyUserStats/dailyUserStats");
const videosAndPics = require('../helpers/videosAndPics/videosAndPics')

/* "21/01/2023": { memes: 1, msgs: 2 },
    "21/01/2023": { memes: 1, msgs: 2 }
}*/
router.get("/dateMesMem", async (req, res, next) => {
  const startDate = req.query.start;
  const endDate = req.query.end;

  try {
    const response = await msgsAndMemesByDay(startDate, endDate);
    res.json(response);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/*
{
  dates: {
    "01/01/2023": {
      id1: {messages: 1, memes: 1},
      id2: {messages: 0, memes: 0}
    },
    "01/02/2023": {
        id1: {messages: 1, memes: 1},
        id2: {messages: 0, memes: 0},
    },
  },
  usersObj: {
    id1: { messages: 111, memes: 222 },
    id2: { messages: 112, memes: 223 },
  },
};

*/
router.get("/dailyUserStats", async (req, res, next) => {
  const startDate = req.query.start;
  const endDate = req.query.end;

  try {
    const response = await dailyUserStats(startDate, endDate);
    res.json(response);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
/*
  {
  "usersObj": {
    "id1": { "videos": 131, "pictures": 111 },
    "id2": { "videos": 0, "pictures": 7 }
  },
  "total": { "videos": 111, "pics": 222 }
}

*/
router.get("/getVideosAndPics", async (req, res, next) => {
  const startDate = req.query.start;
  const endDate = req.query.end;

  try {
    const response = await videosAndPics(startDate, endDate);
    res.json(response);ау
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
})
module.exports = router;
