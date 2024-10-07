let Form = document.querySelector('.form')
let alertEle = document.querySelector('#alert1')
let alertEle2 = document.querySelector('#alert2')
let nextBtn = document.querySelector('#btn-nextday')
let prevBtn = document.querySelector('#btn-prevday')
let spinner = document.querySelector('#spinner1')
let spinner2 = document.querySelector('#spinner2')
let btnSearch =  document.querySelector('#search-btn')
let btnSearch2 = document.querySelector('#search-btn2')
var data = ''
let cityInput = ''
let btnMode = document.getElementById("mode");
let parent = document.getElementById("parent");
let icon = document.getElementById("mode-icon");
let inputCon = document.querySelector(".input-con");
let sunris = document.querySelector(".sunrise p");
let sunset = document.querySelector(".sunset  p");
let currentTemp = document.querySelector(".current-temp .temp");
let maxTemp = document.querySelector(".max-temp .temp");
let minTemp = document.querySelector(".min-temp .temp");
let imgTemp = document.querySelector(".temp-img img");
let feelsLikeEle = document.querySelector(".feels-like .value")
let feelsLikeProgress = document.querySelector(".feels-like .progress-bar")
let rainProgress = document.querySelector(".channce-of-rain .progress-bar")
let rainValue= document.querySelector(".channce-of-rain .value")
let precipProgress=document.querySelector(".precip .progress-bar")
let precipValue=document.querySelector(".precip .value")
let humValue = document.querySelector(".hum .value")
let humProgress = document.querySelectorAll(
  ".hum .progress-grid-3 .progress-bar"
);
let windValue = document.querySelector('.card-wind-content .wind-value')
let windDirection = document.querySelector('.card-wind-content .wind-direction')
let uvIndexProgress = document.querySelectorAll(".uv-index .progress-bar");
let uvDesc = document.querySelector(".uv-index .uv-desc")
let date = document.querySelector('.date')
let imgTempObject = {
  'clear': "./assets/images/Clear.png",
  'sunny': "./assets/images/Clear.png",
  'mist': "./assets/images/Mist.png",
  'cloudy': "./assets/images/Clouds.png",
  "partlycloudy": "./assets/images/Mist.png",
  'overcast':"./assets/images/Clouds.png",
  "patchyrainnearby": "./assets/images/drizzle.png",
  'thunderyoutbreaksinnearby':'./assets/images/drizzle.png',
  'moderaterain':'./assets/images/Rain.png'
};
 
localStorage.setItem('measure','c')
 

const months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
// let localTime = new Date()
 
var data = ''

const days = ["Sun", "Mon", "Tus", "Wen", "Thur", "Fri", "Sut"];
var countNext = 0;
var requiredDate = ''
var time = ''
var timeMonth = ''
var timeDay = ''
var currentTime = new Date();
 
