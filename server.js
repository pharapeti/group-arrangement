const express = require('express');
const session = require('express-session');
const cors = require('cors');
var cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 6060;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // https://stackoverflow.com/a/63547498/8186540
app.use(cookieParser());
app.use(session({ secret: 'someSecret', saveUninitialized : true, resave : true }));

// Route Configuration
require('./routes/projects/project.routes')(app);
require('./routes/users/user.routes')(app);
// require('./routes/users/projects/project.routes')(app);

// Application-wide routes
app.post('/api/post_test', (req, res) => {
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

// Simple route for health-checking
app.get('/ping', (_req, res) => {
  res.status(200).send('PONG');
})

app.get("/get-all-routes", (req, res) => {
  let get = app._router.stack.filter(r => r.route && r.route.methods.get).map(r => r.route.path);
  let post = app._router.stack.filter(r => r.route && r.route.methods.post).map(r => r.route.path);
  res.send({ get: get, post: post });
});

// 404 Route
app.get('*', (req, res) => {
  res.status(404).send({ message: `The URL '${req.url}' is not defined` });
})

app.listen(port, () => console.log(`Listening on port ${port}`));
