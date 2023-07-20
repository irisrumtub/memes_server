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
    totalReactions: 0,
    info: []
  }
})

messages.forEach(entity=>{
    if(entity.reactions) {
        usersObj[entity.fromId.userId].totalReactions = usersObj[entity.fromId.userId].totalReactions + entity.reactions.results.length;
        const emojis = []
        entity.reactions.results.forEach(reactionIter => {
            emojis.push(reactionIter.reaction.emoticon)
        })
        console.log(emojis)
        const info = {messageid: entity.id, reactions: emojis}
        usersObj[entity.fromId.userId].info.push(info)
    }
})
fs.writeFile('10.json', JSON.stringify(usersObj), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });