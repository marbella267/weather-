//for the first calling in the website
// let form = document.querySelector(".form2");
// let input2 = document.querySelector(".input-con2 input");
// let inputCon2 = document.querySelector(".input-con2");

// input2.addEventListener("input", () => {
//   form.classList.add("formFocus");
// });

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   form.classList.remove("formFocus");
//   if (inputCon2.children[0].value != "") {
//     fetchData(inputCon2.children[0].value, alertEle2, btnSearch2, spinner2, true);
//   }
// });

// inputCon2.children[0].addEventListener("focus", () => {
//   form.classList.add("formFocus");
// });

// display all the data at the first section
const displayInfo = (data) => {
  date.innerHTML = data.date;
  document.querySelector(".city").textContent = `${data.name}, ${data.country}`;
  sunris.textContent = data.sunrise;
  sunset.textContent = data.sunset;
  maxTemp.textContent = data.maxTemp + "°";
  minTemp.textContent = data.minTemp + "°";
  currentTemp.textContent = data.currentTemp + "°";
  imgTemp.setAttribute(
    "src",
    imgTempObject[data.img] ? imgTempObject[data.img] : data.tempIcon
  );

  imgTemp.setAttribute("alt", data.img);
  document.querySelectorAll(".temp-desc").forEach((tempDesc) => {
    tempDesc.innerHTML = `<img src=https:${data.tempIcon} class='img-desc'
   alt=${data.img}/>${data.imgDesc}`;
  });
};

// getting the wheather data of city
async function fetchData(cityInput, alertEle, btnSearch,spinner , firstCall = false) {
  spinner.classList.remove("hide");
  btnSearch.classList.add("hide");
  try {
    const fecthPromise = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${cityInput}&key=c506e5f0923840aaaee104416243008`
    );
    if (!fecthPromise.ok) {
      alertEle.classList.remove("hide");
      let error = await fecthPromise.json();
      alertEle.innerHTML = `<strong>Oops!</strong> ${error.error.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
            </button`;
      btnSearch.classList.remove("hide");
      spinner.classList.add("hide");
    } else {
      data = await fecthPromise.json();
      //reset changes in graph
      countNext = 0;
      nextBtn.classList.remove("hide");
      alertEle.classList.add("hide");

      inputCon.children[0].value = data.location.name;
      var forcast = data.forecast.forecastday[0].hour;
      let time = new Date(data.location.localtime_epoch * 1000);
      let timeDay = time.getDate();
      let timeMonth = months[time.getMonth()];
      let measure = localStorage.getItem("measure");
      var forcastData = getForcastData(forcast, measure);
      addDataToGraph(forcastData.temps, forcastData.icons);
      build_chart(forcastData.temps, forcastData.hours);

      let timeOfSunrise = data.forecast.forecastday[0].astro.sunrise;
      let timeOfSunset = data.forecast.forecastday[0].astro.sunset;

      displayInfo({
        sunrise: timeOfSunrise,
        sunset: timeOfSunset,
        name: data.location.name,
        country:
          data.location.country == "United States of America"
            ? "US"
            : data.location.country,
        currentTemp: Math.round(data.current[`temp_${measure}`]),
        maxTemp: Math.round(
          data.forecast.forecastday[0].day[`maxtemp_${measure}`]
        ),
        minTemp: Math.round(
          data.forecast.forecastday[0].day[`mintemp_${measure}`]
        ),
        img: data.current.condition.text.toLowerCase().replace(/\s+/g, ""),
        tempIcon: data.current.condition.icon,
        imgDesc: data.current.condition.text,
        date: `today ${timeMonth} ${timeDay}`,
      });

      changeChartsData([
        data.current.humidity,
        data.current.precip_mm,
        data.forecast.forecastday[0].day.daily_chance_of_rain,
        data.current[`feelslike_${measure}`],
        data.current.uv,
        data.current.wind_kph,
        data.current.wind_dir,
      ]);
      btnSearch.classList.remove("hide");
      spinner.classList.add("hide");
      if (firstCall) {
        document.querySelector(".parent").style.display = "grid";
        document.querySelector(".first-appear").style.display = "none";
      }
    }
  } catch (error) {
    alertEle.classList.remove("hide");
    alertEle.innerHTML = `something went <strong>internet</strong> wrong
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
          </button`;
    btnSearch.classList.remove("hide");
    spinner.classList.add("hide");
  }
}

//for eny coming submitting
Form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputCon.classList.add("disabled");
  inputCon.children[0].blur();
  cityInput = inputCon.children[0].value;

  if (cityInput != "") {
    fetchData(cityInput, alertEle, btnSearch , spinner);
    nextBtn.dataset.clicked = 0;
    prevBtn.classList.add("hide");
  }
});

inputCon.children[0].addEventListener("focus", () => {
  document.querySelector(".input-con").classList.remove("disabled");
});

// changing in the mode
let currentMode = localStorage.getItem("theme");
function applyMode(mode) {
  if (mode == "dark") {
    btnMode.classList.remove("mode-white");
    btnMode.classList.add("mode-dark");
    parent.classList.remove("white");
    parent.classList.add("dark");
    icon.innerHTML = "☀️";
    config.data.datasets[0].backgroundColor = "#1b1e2438";
    myChart.update();
    localStorage.setItem("theme", "dark");
  } else {
    btnMode.classList.remove("mode-dark");
    btnMode.classList.add("mode-white");
    parent.classList.remove("dark");
    parent.classList.add("white");
    icon.innerHTML = '<i id="icon" class="fa-solid fa-moon"></i>';
    config.data.datasets[0].backgroundColor = " #5c9ce5";
    myChart.update();
    localStorage.setItem("theme", "white");
  }
}
applyMode(currentMode);
function modeConvert() {
  currentMode == "dark" ? (currentMode = "white") : (currentMode = "dark");
  applyMode(currentMode);
}

// filling all the charts with it's data
function changeChartsData([
  hum,
  precip,
  rain,
  feelsLike,
  uvValue,
  wind,
  windDir,
]) {
  humValue.textContent = hum + "%";
  windValue.textContent = Math.round(wind);
  windDirection.textContent = windDir;
  precipValue.textContent = precip + "mm";
  precipProgress.style.width = `${precip}%`;
  rainValue.textContent = rain + "%";
  rainProgress.style.width = `${rain}%`;
  feelsLike = Math.round(feelsLike);
  feelsLikeEle.textContent = feelsLike + "°";
  if (localStorage.getItem("measure") == "f") {
    feelsLike = (5 / 9) * (feelsLike - 32);
    feelsLikeProgress.style.width = `${(feelsLike / 50) * 100}%`;
  } else {
    feelsLikeProgress.style.width = `${(feelsLike / 50) * 100}%`;
  }
  document.querySelector(".uv-index .value").textContent = uvValue;
  humProgress.forEach((progress) => (progress.style.width = "0%"));
  uvIndexProgress.forEach((progress) => (progress.style.width = "0%"));
  for (let i = 0; i < humProgress.length; i++) {
    if (hum > humProgress[i].dataset.max) {
      humProgress[i].style.width = "100%";
      hum -= humProgress[i].dataset.max;
    } else {
      humProgress[i].style.width = `${
        (hum / humProgress[i].dataset.max) * 100
      }%`;
      document.querySelector(
        ".hum .humidity-desc"
      ).textContent = `${humProgress[i].dataset.desc}`;
      break;
    }
  }

  for (let i = 0; i < uvIndexProgress.length; i++) {
    if (uvValue >= 11) {
      uvDesc.textContent = "Extreme";
      uvIndexProgress.forEach((progress) => (progress.style.width = "100%"));
      break;
    } else if (uvValue > uvIndexProgress[i].dataset.max) {
      uvIndexProgress[i].style.width = "100%";
    } else {
      if (uvValue == 6) {
        uvDesc.textContent = uvIndexProgress[i].dataset.desc;
        uvIndexProgress[i].style.width = `50%`;
        break;
      }
      uvDesc.textContent = uvIndexProgress[i].dataset.desc;
      uvIndexProgress[i].style.width = `${
        (uvValue / uvIndexProgress[i].dataset.max) * 100
      }%`;
      break;
    }
  }
}

function getForcastData(forcast, measure) {
  let extractTemp = [];
  let extractIcons = [];
  let hours = [];
  for (let i = 1; i < forcast.length; i++) {
    extractTemp.push(Math.round(forcast[i][`temp_${measure}`]));
    extractIcons.push(forcast[i].condition.icon);
    hours.push(forcast[i].time.substring(11, 16));
  }

  return {
    temps: extractTemp,
    icons: extractIcons,
    hours: hours,
  };
}
function handleMeasure(measure) {
  if (measure == "f") {
    if (!document.querySelector(".btn-f .active")) {
      localStorage.setItem("measure", "f");
      document.querySelector(".active").classList.remove("active");
      document.querySelector(".btn-f").children[0].classList.add("active");
      let feels = document.querySelectorAll(".feelsLikeMeasure");
      for (let i = 1; i < feels.length; i++) {
        let value = eval(feels[i].textContent.replace("°", ""));
        value = value * (9 / 5) + 32;
        feels[i].textContent = value + "°";
      }
    }
  } else {
    localStorage.setItem("measure", "c");
    if (!document.querySelector(".btn-c .active")) {
      document.querySelector(".active").classList.remove("active");
      document.querySelector(".btn-c").children[0].classList.add("active");
      let feels = document.querySelectorAll(".feelsLikeMeasure");
      for (let i = 1; i < feels.length; i++) {
        let value = eval(feels[i].textContent.replace("°", ""));
        value = (5 / 9) * (value - 32);
        feels[i].textContent = value + "°";
      }
    }
  }

  if (data.hasOwnProperty("forecast")) {
    measure = localStorage.getItem("measure");
    var forcast = data.forecast.forecastday[0].hour;
    var forcastData = getForcastData(forcast, measure);
    let currentTempValue = "";
    let progressWidth = "";
    var feelsLikeValue;
    if (timeDay != "") {
      if (currentTime.getDate() == timeDay) {
        feelsLikeValue = data.current[`feelslike_${measure}`];
        currentTempValue = data.current[`temp_${measure}`];
        progressWidth = data.current[`feelslike_c`];
      } else {
        feelsLikeValue = data.forecast.forecastday[0].day[`avgtemp_${measure}`];
        currentTempValue =
          data.forecast.forecastday[0].day[`avgtemp_${measure}`];
        progressWidth = data.forecast.forecastday[0].day.avgtemp_c;
      }
    } else {
      feelsLikeValue = data.current[`feelslike_${measure}`];
      currentTempValue = data.current[`temp_${measure}`];
      progressWidth = data.current[`feelslike_c`];
    }

    addDataToGraph(forcastData.temps, forcastData.icons);
    build_chart(forcastData.temps, forcastData.hours);
    maxTemp.textContent =
      Math.round(data.forecast.forecastday[0].day[`maxtemp_${measure}`]) + "°";
    minTemp.textContent =
      Math.round(data.forecast.forecastday[0].day[`mintemp_${measure}`]) + "°";

    currentTemp.textContent = Math.round(currentTempValue) + "°";
    feelsLikeEle.textContent = Math.round(feelsLikeValue) + "°";
    feelsLikeProgress.style.width = `${(progressWidth / 50) * 100}%`;
  }
}
handleMeasure(localStorage.getItem("measure"));
