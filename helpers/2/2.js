const fs = require('fs');
const path = require("path")

const usersfile = path.join(__dirname,"../../getusers/users.json");
const users = fs.readFileSync(usersfile);

const messagesfile = path.join(__dirname,"../../messages.json");
const messages = fs.readFileSync(messagesfile);

// Parse the JSON data
const jsonMessages = JSON.parse(messages);
const jsonUsers = JSON.parse(users)

const dates = {};
const startDate = new Date("2023/04/01");
const endDate = new Date("2023/06/30");
const currentDate = new Date(startDate);
userArray = Object.keys(jsonUsers)
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
const f = (messages) => {
messages.forEach(entity => {
    if(entity.className !== "Message") return
    const ts = entity.date * 1000
    const mDate = new Date(ts) 
    const month = mDate.getMonth()+1
    const datekey = `${month.toString().padStart(2, '0')}/${mDate.getDate().toString().padStart(2, '0')}/${mDate.getFullYear()}`
    if (!dates[datekey]) return
    // console.log(datekey)

    dates[datekey][entity.fromId.userId].messages++
    if(!entity.media && !entity.message.includes('instagram')) return
    dates[datekey][entity.fromId.userId].memes++
})
fs.writeFile('2.json', JSON.stringify(dates), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}
f(jsonMessages)