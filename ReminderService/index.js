const express = require("express");
const app = express();
const port = 5555;
const { createNoteRemind, checkStatus } = require('./service/index')
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/reminder", async (req, res) => {
  const data = await createNoteRemind(req)
  res.json(data);
});

app.post("/status", async (req, res) => {
  const data = await checkStatus(req)
  res.json(data);
});

app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});