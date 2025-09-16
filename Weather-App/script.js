const inputbox = document.querySelector(".inputbox")
const searchBtn = document.querySelector("#searchBtn")
const temp = document.querySelector(".temp")
const description = document.querySelector(".description")
const humidity = document.querySelector("#humidity")
const windspeed = document.querySelector("#windspeed")
const weatherimg = document.querySelector("#weatherimg")

searchBtn.addEventListener("click",()=>{
    checkweather(inputbox.value)
})

async function checkweather(city){
    const api_key = API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data  = await fetch(`${url}`)
    .then(response => response.json());

    if(weather_data.cod=="404"){
        weatherimg.src = "404.png";
        return
        
    }

    temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`
    humidity.innerHTML = `${(weather_data.main.humidity)}%`
    description.innerHTML = `${(weather_data.weather[0].description)}`
   windspeed.innerHTML = `${(weather_data.wind.speed)}Km/H`
//   console.log(weather_data)
    switch(weather_data.weather[0].main){
        case 'Clouds':
            weatherimg.src = "cloud.png";
            break;
        case 'Clear':
            weatherimg.src = "clear.png";
            break;
        case 'Rain':
            weatherimg.src = "rain.png";
            break;
        case 'Mist':
            weatherimg.src = "mist.png";
            break;
        case 'Snow':
            weatherimg.src = "snow.png";
            break;
    }

 

}