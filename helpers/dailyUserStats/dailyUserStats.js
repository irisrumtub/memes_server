const fs = require('fs');
const util = require('util');
const path = require('path');

// Utilize promisify to convert fs.readFile and fs.writeFile to promise-based functions
const readFileAsync = util.promisify(fs.readFile);

const dailyMemAndMsgs = async (start, end) => {
  const usersfile = path.join(__dirname, '../../data/users.json');
  const users = JSON.parse(await readFileAsync(usersfile));

  const messagesfile = path.join(__dirname, '../../data/messages.json');
  const messages = JSON.parse(await readFileAsync(messagesfile));

  const dates = {};
  const startDate = new Date(start);
  const endDate = new Date(end);
  const currentDate = new Date(startDate);

  const userArray = Object.keys(users);
  const usersObj = {};
  userArray.forEach((user) => {
    usersObj[user] = {
      messages: 0,
      memes: 0,
    };
  });

  
  while (currentDate <= endDate) {
    const dateString = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    dates[dateString] = structuredClone(usersObj);

    currentDate.setDate(currentDate.getDate() + 1);
  }

  messages.forEach((entity) => {
    if (entity.className !== 'Message') return;
    const ts = entity.date * 1000;
    const mDate = new Date(ts);
    const month = mDate.getMonth() + 1;
    const datekey = `${month.toString().padStart(2, '0')}/${mDate.getDate().toString().padStart(2, '0')}/${mDate.getFullYear()}`;
    if (!dates[datekey]) return 'date out of range';
    usersObj[entity.fromId.userId].messages++
    dates[datekey][entity.fromId.userId].messages++;
    if (!entity.media && !entity.message.includes('instagram')) return;
    usersObj[entity.fromId.userId].memes++
    dates[datekey][entity.fromId.userId].memes++;
  });
  return {dates, usersObj}
};



module.exports = dailyMemAndMsgs;
