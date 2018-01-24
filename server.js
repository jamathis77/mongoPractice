const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app.use(bodyParser.json());
const jsonParser = bodyParser.json();

const {Person} = require('./models');

mongoose.Promise = global.Promise


app.use(express.static('public'))

mongoose.connect('mongodb://localhost/person', { useMongoClient: true }, err => { if (err) { return reject(err); }});

app.listen(8080, () => {
  console.log('server is running...')
});



app.get('/', (req, res) => {
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');
  // res.write('the write is working\n')
  // res.end('yes yes yes');
  console.log('get request successful');
  res.sendFile(__dirname + '/views/index.html');
});



app.post('/person', jsonParser, (req, res) => {

  const requiredFields = ['name', 'age'];
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
      }
    }

  Person
  .create({
    name: req.body.name,
    age: req.body.age
  })
  .then(person => res.status(201).json(person.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({message: 'Internal server error'})
  });
  console.log(req.body.name)
});
