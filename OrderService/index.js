const express = require("express");
const app = express();
const port = 6666;
const cors = require('cors')
const {bookingProcess, checkStatus} = require('./service/index')

app.use(cors())
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/order", async (req, res) => {
  const data = await bookingProcess(req)
  res.json(data);
});

app.post("/status", async (req, res) => {
  const data = await checkStatus(req)
  res.json(data);
});

app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});