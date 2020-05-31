const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");
const ejs = require("ejs");

const app = express();
 
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/" ,(req , res) => {
res.sendFile(__dirname + "/index.html");
});
app.post("/"  ,(req , res) => {
const localcity = req.body.cityName;
const appid = "6ffec033c2cb89b60376f6b6152a497b";
const url ="https://api.openweathermap.org/data/2.5/weather?q=" + localcity + "&appid="+appid+"&units=metric";
https.get(url ,function(response) {
response.on("data" , function(data){
  const weatherData = JSON.parse(data)
  const temp = Math.round(weatherData.main.temp);
  const icon = weatherData.weather[0].icon;
  const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
  const description = weatherData.weather[0].description;
  res.render("home" , {temperature:temp , local:localcity,des:description , icons:imgUrl})


    });
    
});
})

app.get("/forceast" , (req , res) =>{
  res.render("forceast")
})
app.post("/forceast"  ,(req , res) => {
  const forInput = req.body.for;
  const appid = "6ffec033c2cb89b60376f6b6152a497b";
  const url ="https://api.openweathermap.org/data/2.5/forecast?q=" + localcity + "&appid="+appid+"&units=metric";
  https.get(url ,function(response) {
  response.on("data" , function(data){
    const weatherData = JSON.parse(data)
    const temp = Math.round(weatherData.list[0].main.temp);
    const icon = weatherData.list[0].weather[0].icon;
    const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    const description = weatherData.list[0].weather[0].description;
    res.render("forceast" , {temperature:temp , local1:forInput,des:description , icons:imgUrl})
  
  
      });
      
  });
  })


 
 
app.listen(4000, (req , res) =>{
    console.log("run");
    
});