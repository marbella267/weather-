function btnRemoveLoading(btn){
  btn.removeAttribute('disabled')
  document.querySelector(`#${btn.id} .spinner`).classList.add('hide')
  document.querySelector(`#${btn.id} .icon`).classList.remove('hide')
} 

function btnAddLoading(btn){
  btn.setAttribute('disabled','true')
  document.querySelector(`#${btn.id} .spinner`).classList.remove('hide')
  document.querySelector(`#${btn.id} .icon`).classList.add('hide')
}

async function fetchForcastData(fn,btn) {
  try{  
    btnAddLoading(btn)
    let getData = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${data.location.name}&key=c506e5f0923840aaaee104416243008&dt=${requiredDate}`
    );
    if(!getData.ok){
     btnRemoveLoading(btn)
      console.log('something wrong')
    }
    else{
    fn()
    
    let response = await getData.json();
    data = response;
    //check if the forecast array aren't empty
    if(data.forecast.forecastday.length!=0){
    var forcast = data.forecast.forecastday[0].hour;
    var measure = localStorage.getItem("measure");
    var forcastData = getForcastData(forcast, measure);
    addDataToGraph(forcastData.temps, forcastData.icons);
    build_chart(forcastData.temps, forcastData.hours);
    let currentDay =  currentTime.getDate() == timeDay
    let feelslike ;
    let day = ""; 
    let currentTemp = '';
    let uv = '';
    let hum = '' ;
    let wind = '';
    let windDir = ''
    //handle data of the current day 
    if(currentDay){
      day = `today ${timeMonth} ${timeDay}` 
      currentTemp = Math.round(data.current[`temp_${measure}`])
      feelslike = data.current[`feelslike_${measure}`]
      uv = data.current.uv
      hum = data.current.humidity
      wind= data.current.wind_kph
      windDir = data.current.wind_dir
    }else{
      day = `${days[time.getDay()]}, ${timeMonth} ${timeDay}`
      currentTemp = Math.round(data.forecast.forecastday[0].day[`avgtemp_${measure}`])
      feelslike = data.forecast.forecastday[0].day[`avgtemp_${measure}`]
      uv = data.forecast.forecastday[0].day.uv
      hum = data.forecast.forecastday[0].day.avghumidity
      wind = data.forecast.forecastday[0].day.maxwind_kph
      windDir = data.forecast.forecastday[0].hour[0].wind_dir
      
    }
          
    displayInfo({
      sunrise: data.forecast.forecastday[0].astro.sunrise,
      sunset: data.forecast.forecastday[0].astro.sunset,
      name: data.location.name,
      country:
        data.location.country == "United States of America"
          ? "US"
          : data.location.country,
      currentTemp: currentTemp,
      maxTemp: Math.round(
        data.forecast.forecastday[0].day[`maxtemp_${measure}`]
      ),
      minTemp: Math.round(
        data.forecast.forecastday[0].day[`mintemp_${measure}`]
      ),
      img: data.forecast.forecastday[0].day.condition.text.toLowerCase().replace(/\s+/g, ''),
      tempIcon: data.forecast.forecastday[0].day.condition.icon,
      imgDesc:data.forecast.forecastday[0].day.condition.text,
      date: `${day}`,
    });
 
    changeChartsData([
      hum,
      data.forecast.forecastday[0].day.totalprecip_mm,
      data.forecast.forecastday[0].day.daily_chance_of_rain,
      feelslike,
      uv,
      wind,
      windDir
    ])
    btnRemoveLoading(btn)
    }else{
      btnRemoveLoading(btn)
      console.log("can't get more")
    }
  } 
   
  }catch(error){
  btn.removeAttribute('disabled')
  document.querySelector(`#${btn.id} .spinner`).classList.add('hide')
  document.querySelector(`#${btn.id} .icon`).classList.remove('hide')
  console.log('network error')
 
}
}

nextBtn.addEventListener("click", () => {
 
if (data.forecast.forecastday[0].hour) {
    let requiredDateSec =
    data.forecast.forecastday[0].date_epoch + 24 * 60 * 60;
    time = new Date(requiredDateSec * 1000);
    timeDay = time.getDate();
    timeMonth = months[time.getMonth()];

    requiredDate = `${time.getFullYear()}-${
      time.getMonth() + 1
    }-${timeDay}`;
    function handleBtn(){
      countNext += 1;
      nextBtn.dataset.clicked = countNext;
      prevBtn.classList.remove("hide");
    }
    fetchForcastData(handleBtn,nextBtn);
  
    
if (countNext == 14) {
    nextBtn.classList.add("hide");
  }
}else{
  console.log('cnat go next')
}
});

prevBtn.addEventListener("click", () => {
  if (data.forecast.forecastday[0].hour) {
    
    let requiredDateSec =data.forecast.forecastday[0].date_epoch - 24 * 60 * 60;
    time = new Date(requiredDateSec * 1000);
    timeDay = time.getDate();
    timeMonth = months[time.getMonth()];
    if(currentTime.getDate()==timeDay){
      prevBtn.classList.add('hide')
    } 

    requiredDate = `${time.getFullYear()}-${
      time.getMonth() + 1
    }-${timeDay}`;
    function handleBtn(){
      countNext -= 1;
      nextBtn.dataset.clicked = countNext;
      nextBtn.classList.remove("hide");
    }
    fetchForcastData(handleBtn,prevBtn);
  }
});
 