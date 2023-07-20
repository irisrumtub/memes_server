const fs = require('fs');
const path = require("path")

const userspath = path.join(__dirname,"../../10.json");
const usersfile = fs.readFileSync(userspath);
const users = JSON.parse(usersfile)
const twolikes = []
const threeandmore = []
console.log(users);
for (const user in users) {
    users[user].info.forEach(infoIter => {
        if(infoIter.reactions.length === 2){
            const msg = {id:infoIter.messageid, reactions:infoIter.reactions}
            twolikes.push(msg)
        }
        if(infoIter.reactions.length > 2){
            const msg = {id:infoIter.messageid, reactions:infoIter.reactions}
            threeandmore.push(msg)
        }
    })
}
const kings = {two: twolikes, three: threeandmore}
const ids = []
twolikes.forEach(msg => ids.push(msg.id))
threeandmore.forEach(msg => ids.push(msg.id))
fs.writeFile('10sort.json', JSON.stringify(kings), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  fs.writeFile('10ids', JSON.stringify(ids), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });