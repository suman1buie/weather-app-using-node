const { response } = require("express");
const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const port = 5000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  const appId = "d82e8baba60415cbff65d94fea64b7d3";
  let city = req.body.city;
  let AppUlr = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}&units=metric`;
  https.get(AppUlr, (response) => {
    response.on("data", (data) => {
      let jsonData = JSON.parse(data);
      let temp = jsonData.main.temp;
      let mint = jsonData.main.temp_min;
      let maxt = jsonData.main.temp_max;

      res.send(`
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weather Application</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
      crossorigin="anonymous"
    />
    <script
      src="https://kit.fontawesome.com/8b0956346c.js"
      crossorigin="anonymous"
    ></script>
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <div class="container heading"><h1>Weather Application</h1></div>
    <div class="conatiner-fluid">
      <form action="/" method="POST">
        <input
          type="text"
          name="city"
          id="city"
          placeholder="Enter a city....."
        />
        <button class="btn btn-outline-primary" type="submit">Search</button>
      </form>
    </div>
    <div class="conatiner-fluid">
      <div class="row">
        <div class="col-12">
          <h1>${city}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-4">Min Tempareture ${mint} &deg; C</div>
        <div class="col-4 img">
          <i class="far fa-sun"></i>
        </div>
        <div class="col-4">Max Tempurature ${maxt} &deg; C</div>
      </div>
    </div>

    <div class="container"></div>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js"
      integrity="sha384-SR1sx49pcuLnqZUnnPwx6FCym0wLsk5JZuNx2bPPENzswTNFaQU1RDvt3wT4gWFG"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js"
      integrity="sha384-j0CNLUeiqtyaRmlzUHCPZ+Gy5fQu0dQ6eZ/xAww941Ai1SxSY+0EQqNXNE6DZiVc"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
`);
    });
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
