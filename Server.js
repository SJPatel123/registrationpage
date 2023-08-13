const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const mongoURL = 'mongodb://localhost:27017';
const dbName = 'regdata';
const collectionName = 'regusers';

mongoose.connect(`${mongoURL}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const userSchema = new mongoose.Schema({
  mail: { type: String, required: true },
  passwd: { type: String, required: true }
});

const User = mongoose.model(collectionName, userSchema);

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const userData = {
    mail: email,
    passwd: password
  };

  await User.create(userData)
    .then(() => {
      console.log('User Registered Successfully');
      res.status(200).json({ message: "User Registered Successfully" });
    })
    .catch((error) => {
      console.error('Error inserting data into MongoDB:', error);
      res.status(500).json({ message: "Failed to register user" });
    });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port no. ${port}`);
});
