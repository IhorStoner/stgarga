const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('express-async-errors');
const https = require('https')
const http = require('http')

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/.well-known/pki-validation/73B5D5BB2552AE7A424AD5DAAC829BC0.txt', async (req, res) => {
  res.sendFile(path.join(__dirname, '.well-known', 'pki-validation', '73B5D5BB2552AE7A424AD5DAAC829BC0.txt'))
})

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, './client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build/index.html'))
  })
}

app.use((err, req, res, next) => {
  res
    .status(500)
    .send({ error: err.message })
});

const PORT = process.env.PORT || 5002


async function start() {
  try {
    http.createServer(app).listen(PORT, () => {
      console.log(`Server is running on ${PORT} port`)
    });
  }
  catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()