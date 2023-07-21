const express = require('express')
const createError = require('http-errors');
const path = require('path')
const queryRouter = require('./routes/get_data')
const app = express()
const port = 3000
const cors = require('cors')
app.use(cors())
app.get('/',  (req, res)=> {
  const options = {
      root: path.join(__dirname, 'react/')
  };
  const index = 'index.html';
  res.sendFile(index, options,  (err) => {
      if (err) {
          next(err);
      } else {
          console.log('Sent:', index);
      }
  });
});
app.use('/query', queryRouter)
app.use((req, res, next) => {
  next(res.send('404 :)'));
});
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})