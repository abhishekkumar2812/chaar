const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const items = require('./routes/api/items');

const app = express();

app.use(express.json());

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const uri = 'mongodb+srv://user:user123@cluster0-zktma.mongodb.net/reactdb?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected…')
})
.catch(err => console.log(err))

//Use Routes

app.use('/api/items', items)

if(PerformanceObserverEntryList.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

/*
const db = require('./config/keys').mongoURI;

mongoose.connect(db)
	.then() => console.log('MongoDB Connected..')
	.catch(err => console.log(err));*/

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));