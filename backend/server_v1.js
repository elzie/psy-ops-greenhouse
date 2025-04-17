const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.json({ msg: "pong" });
});

app.listen(3000, () => {
  console.log('Express server kører på http://localhost:3000');
});