const express = require('express');
const app = express();
const port = process.env.PORT || 6060;
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.get('*', (req, res) => {
  res.send({ something: 'Hello my friend' })
})

app.listen(port, () => console.log(`Listening on port ${port}`));