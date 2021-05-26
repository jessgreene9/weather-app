var apiKey = "2f5fe5c63f4f11da53f650c0726010f9";
var inputCityEl= document.querySelector("#input-city");
var searchFormEl = document.querySelector(".search-form");
var searchBtnEl= document.querySelector("#searchBtn");
var searchHistoryEl = document.querySelector("#searchHistory");
var weatherEl = document.querySelector("#weather");
var dateEl = document.querySelector("#date");
var cityEl = document.querySelector("#city");
var descriptionEl = document.querySelector("#description");
var temperatureEl = document.querySelector("#temp");
var humidityEl = document.querySelector("#humidity");
var windSpeedEl = document.querySelector("#windSpeed");
var uvIndexEl = document.querySelector("#uvIndex");
var lat = "";
var lon = "";

function saveToLocal (cityInput) {
    var inputData = JSON.parse(localStorage.getItem("cityInput")) || [];
    inputData.push(cityInput);
    localStorage.setItem("cityInput", JSON.stringify(inputData));
}
function renderSavedSearch() {
    searchHistoryEl.innerHTML = "";
    var inputData = JSON.parse(localStorage.getItem("cityInput")) || [];
    console.log(inputData);
    inputData.forEach(function (citySearched) {
       var cityBtn = document.createElement("button");
       searchHistoryEl.appendChild(cityBtn);
       cityBtn.textContent = citySearched;
       cityBtn.addEventListener('click', function(event){
           event.preventDefault();
           getWeather(event.target.textContent);
       })
    })
}
renderSavedSearch();

searchFormEl.addEventListener("submit", function (event) {
    event.preventDefault();
    var cityInput = document.querySelector("#input-city").value;
    saveToLocal(cityInput);
    getWeather(cityInput);
    // saveSearchedWeather(cityInput);
    renderSavedSearch();
});

// var savedSearches = document.querySelector("#saved-searches");
// savedSearches.forEach (function (eachSearch){
//     eachSearch.addEventListener('click', function (event){
//         var city = eachSearch.innerHTML;
//         getWeather(city);
//     });
// });


function getWeather(cityName) {
    console.log(cityName);
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;
    console.log(apiUrl);
    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        showWeather(cityName, data);
       
        var fiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&units=imperial&appid=" + apiKey;
        fetch(fiveDayUrl)
          .then(function (response) {
            return response.json();
          })
          .then(function (fiveDayData) {
            console.log(fiveDayData);
            showFiveDay(fiveDayData);
          });
      });
  }

  function showWeather(cityName, data) {
    var temperature = data.main.temp;
    console.log(temperature);
    temperatureEl.textContent = temperature + "°";
  };

  function showFiveDay(data) {
      var fiveDayContainersEl = document.querySelector("#fiveDayContainers");
      fiveDayContainersEl.innerHTML = "";
    var fiveDayArray = data.daily.slice(0,5);
    fiveDayArray.forEach(function(day){
        console.log(day.temp.day)
        var fiveTempEl= document.createElement("p");
        fiveTempEl.textContent = day.temp.day;
        var weatherBox = document.createElement("div");
        weatherBox.classList.add("boxes");
        fiveDayContainersEl.appendChild(weatherBox);
        weatherBox.appendChild(fiveTempEl);
;    })
  };



