const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  const city = req.body.cityName;
  const appID = "c788a2a0b0fb14005189a148d1143e6a";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appID + "&units=" + unit;
  https.get(url,function(response){
    console.log(response.statusCode);
      response.on("data",function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<p>The weather is currently " + weatherDescription +"</p>");
        res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celcius</h1>");
        res.write("<img src=" + imageURL +">");
        res.send();
    });
  });
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running in port 3000");
});
