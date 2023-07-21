const fs = require('fs');
const path = require("path")

const dailyMemAndMsgs = (start, end) => {
const usersfile = path.join(__dirname,"../../data/users.json");
const users = JSON.parse((fs.readFileSync(usersfile)))
const messagesfile = path.join(__dirname,"../../data/messages.json");
const messages = JSON.parse(fs.readFileSync(messagesfile));

const dates = {};
const startDate = new Date(start);
const endDate = new Date(end);
const currentDate = new Date(startDate);

userArray = Object.keys(users)
usersObj = {}
userArray.forEach(user => {
    usersObj[user] = {
        messages:0,
        memes:0
    }
});
while (currentDate <= endDate) {
  const dateString = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  dates[dateString] = structuredClone(usersObj)

  currentDate.setDate(currentDate.getDate() + 1);
}
console.log(dates)

messages.forEach(entity => {
    if(entity.className !== "Message") return
    const ts = entity.date * 1000
    const mDate = new Date(ts) 
    const month = mDate.getMonth()+1
    const datekey = `${month.toString().padStart(2, '0')}/${mDate.getDate().toString().padStart(2, '0')}/${mDate.getFullYear()}`
    if (!dates[datekey]) return 'date out of range'
    dates[datekey][entity.fromId.userId].messages++
    if(!entity.media && !entity.message.includes('instagram')) return
    dates[datekey][entity.fromId.userId].memes++
})
fs.writeFile('2.json', JSON.stringify(dates), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}
dailyMemAndMsgs("01/01/2023","06/30/2023")
module.exports = dailyMemAndMsgs