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
app.use(express.urlencoded({ extended: false }));
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

// Auth routes
require('./routes/auth/auth.routes')(app);

// Admin routes
require('./routes/admin/groups/groups.routes')(app);
require('./routes/admin/projects/projects.routes')(app);
require('./routes/admin/projects/project_allocations/project_allocations.routes')(app);
require('./routes/admin/users/users.routes')(app);

// Student Routes
require('./routes/student/groups/groups.routes')(app);
require('./routes/student/profile/profile.routes')(app);
require('./routes/student/projects/projects.routes')(app);

// Simple route for health-checking
app.get('/ping', (_req, res) => {
  res.status(200).send('PONG');
})

// 404 Route
app.get('*', (req, res) => {
  res.status(404).send({ message: `The URL '${req.url}' is not defined` });
})

app.listen(port, () => console.log(`Listening on port ${port}`));
