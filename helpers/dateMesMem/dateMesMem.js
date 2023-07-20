const fs = require('fs');
const path = require('path');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const msgsAndMemesByDay = async (start, end) => {
  if (!start && !end) {
    console.log(`function is called without arguments, probably require()`);
    return null;
  }

  const messagesfile = path.join(__dirname, '../../data/messages.json');
  let data;
  try {
    const fileContents = await readFileAsync(messagesfile);
    data = JSON.parse(fileContents);
  } catch (err) {
    console.error('Error reading the messages file:', err);
    return;
  }

  const f = (msgs) => {
    if (typeof msgs === 'undefined') return 'sosi hui';

    const dates = {};
    const startDate = new Date(start);
    const endDate = new Date(end);
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateString = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      dates[dateString] = { messages: 0, memes: 0 };

      currentDate.setDate(currentDate.getDate() + 1);
    }

    data.forEach((entity) => {
      if (entity.className !== 'Message') return;
      const ts = entity.date * 1000;
      const mDate = new Date(ts);
      const month = mDate.getMonth() + 1;
      const datekey = `${month.toString().padStart(2, '0')}/${mDate.getDate().toString().padStart(2, '0')}/${mDate.getFullYear()}`;
      if (!dates[datekey]) return;
      dates[datekey].messages++;
      if (!entity.media && !entity.message.includes('instagram')) return;
      dates[datekey].memes++;
    });

    const datesIterable = Object.keys(dates);
    datesIterable.forEach((date) => {
      dates[date].messages = dates[date].messages - dates[date].memes;
    });

    return dates;
  };

  const jsonData = f(data);
  console.log('prepared 1st data')
  return jsonData
};

module.exports = msgsAndMemesByDay;
