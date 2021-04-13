const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 6060;
const db_path = process.env.MYSQL_DB || './db/group_arrangement_development.db';
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(cors()); // https://stackoverflow.com/a/63547498/8186540

// This behaviour to be moved into a route
const { User } = require('./models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

app.get('/api/get_test', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/post_test', (req, res) => {
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

// Restful API to return all users (use this as a template for other routes requiring
// a database query)
app.get('/api/users', (req, res) => {
  res.send(User.findAll());
});

// 404 Route
app.get('*', (req, res) => {
  res.send(404, `The URL '${req.url}' is not defined`);
})

app.listen(port, () => console.log(`Listening on port ${port}`));