const fs = require('fs');
const path = require("path")

const usersfile = path.join(__dirname,"../../users.json");
const users = fs.readFileSync(usersfile);
const messagesfile = path.join(__dirname,"../../messages.json");
const messages = fs.readFileSync(messagesfile);

const jsonUsers = JSON.parse(users)
const jsonMessages = JSON.parse(messages)

const usersObj = {}
jsonUsers.forEach(user => {
  usersObj[user.id] = {
    totalReactions: 0,
  }
})
jsonMessages.forEach(entity=>{
    if(entity.reactions) {
        usersObj[entity.fromId.userId].totalReactions = usersObj[entity.fromId.userId].totalReactions + entity.reactions.results.length;
    
    }
})
fs.writeFile('10totals.json', JSON.stringify(usersObj), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });