const fs = require('fs');
const path = require("path")

const usersfile = path.join(__dirname,"../../getusers/users.json");
const users = JSON.parse(fs.readFileSync(usersfile));
const messagesfile = path.join(__dirname,"../../messages.json");
const messages = JSON.parse(fs.readFileSync(messagesfile));

const usersIterable = Object.keys(users)
const usersObj = {}
usersIterable.forEach(user => {
  usersObj[user] = {
    videos:0,
    pictures:0,
  }
})
const errors = []
messages.forEach(entity => {
    if(entity.className !== "Message") return
    try{
    if(!entity.media && !entity.message.includes('instagram')) return
    if(entity.media.photo) usersObj[entity.fromId.userId].pictures++
    if(entity.media.document.mimeType.includes("image")) usersObj[entity.fromId.userId].pictures++
    
    if(entity.media.document && entity.media.document.mimeType.includes("video")) usersObj[entity.fromId.userId].videos++
  } catch(err) {
  }
})
fs.writeFile('3.json', JSON.stringify(usersObj), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});