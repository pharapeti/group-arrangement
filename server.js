const express = require('express');
const session = require('express-session');
const cors = require('cors');
var cookieParser = require('cookie-parser');

// Sequelize ORM
// Typically would be pulled from environment variables
// Harcoding this connection string this will only be used for local demo's
const Sequelize = require("sequelize");
const sequelize = new Sequelize('postgres://group_arrangement:testpassword@localhost:5432/group_arrangement_development');
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const store = new SequelizeStore({ db: sequelize });

const app = express();
const port = process.env.PORT || 6060;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // https://stackoverflow.com/a/63547498/8186540
app.use(cookieParser());
app.use(session({
  secret: 'someSecret',
  store,
  saveUninitialized : true,
  resave : true
}));

// Keep session store up to date
store.sync();

// Admin routes
require('./routes/admin/groups/groups.routes')(app);
require('./routes/admin/projects/projects.routes')(app);
require('./routes/admin/users/users.routes')(app);

// Signed in user routes
require('./routes/auth/auth.routes')(app);
require('./routes/groups/groups.routes')(app);
require('./routes/profile/profile.routes')(app);
require('./routes/projects/projects.routes')(app);

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
