const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 6060;
const db_path = process.env.MYSQL_DB || './db/group_arrangement_development.db';
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(cors()); // https://stackoverflow.com/a/63547498/8186540

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

// Test route which queries all users and returns all the data via JSON
app.get('/api/users', (req, res) => {
  res.send('bruh');
});

app.get('*', (req, res) => {
  res.send({ something: 'You hit the all other routes matcher' })
})

app.listen(port, () => console.log(`Listening on port ${port}`));