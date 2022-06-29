require("dotenv").config();
const express = require("express");
const app = express();
const port = 4444;
const {sendMail} = require('./service/index')

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.post("/send-email", async (req, res) => {
  const data = await sendMail(req)
  res.json(data);
});
app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});