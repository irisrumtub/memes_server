const fs = require('fs');
const path = require("path")
const data = JSON.parse(fs.readFileSync('2.json'))
const usersfilepath = path.join(__dirname,"../../data/users.json");
const users = JSON.parse(fs.readFileSync(usersfilepath))
const userArray = Object.keys(users)
const usersObj = {}
let idsIterable = []
userArray.forEach(user => {
    usersObj[user] = {
        messages:0,
        memes:0
    }
});
const datesIterable = Object.keys(data)
datesIterable.forEach(date => {
    idsIterable = Object.keys(data[date])
    idsIterable.forEach(id => {
        usersObj[id].messages = usersObj[id].messages + data[date][id].messages
        usersObj[id].memes = usersObj[id].memes + data[date][id].memes
    })
})
idsIterable.forEach(id => {
    usersObj[id].messages = usersObj[id].messages - usersObj[id].memes
})
console.log(usersObj)