// server/index.js
const express = require("express");
const axios = require('axios')
require('dotenv').config()

const getData = async (url) => {
  try {
    const response = await axios.get(url)
    const data = response.data
    return data
  } catch (error) {
    console.log(error)
  }
}

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json())

app.get("/api", async (req, res) => {
  const data = await getData(process.env.GOOGLE_SHEET)
  // console.log(data.invitees)
    res.json(data.invitees)
  });

  app.post("/api", function(request, response) {

    axios.post(process.env.GOOGLE_SHEET, request.body)
      .then(function () {
        response.json({posted: "success"})
      })
      .catch(function(error) {
        console.log(error)
      })
      // response.send(request.body)
  })

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});