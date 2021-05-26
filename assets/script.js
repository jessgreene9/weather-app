var apiKey = "2f5fe5c63f4f11da53f650c0726010f9";
var inputCityEl= document.querySelector("#input-city");
var searchFormEl = document.querySelector(".search-form");
var searchBtnEl= document.querySelector("#searchBtn");
var searchHistoryEl = document.querySelector("#searchHistory");
var weatherEl = document.querySelector("#weather");
var dateEl = document.querySelector("#date");
var cityEl = document.querySelector("#city");
var descriptionEl = document.querySelector("#description");
var temperatureEl = document.querySelector("#temperature");
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
    var inputData = JSON.parse(localStorage.getItem("cityInput")) || [];
    inputData.forEach(function (citiesSearched) {
        searchHistoryBtnEl.innerHTML = citiesSearched;
        document.push(searchHistoryBtnEl);
    })
}

searchFormEl.addEventListener("submit", function (event) {
    event.preventDefault();
    var cityInput = document.querySelector("#input-city").value;

    getWeather(cityInput);
    saveSearchedWeather(cityInput);
    renderSavedSearch();

});

var savedSearches = document.querySelector("#saved-searches");
savedSearches.forEach (function (eachSearch){
    eachSearch.addEventListener('click', function (event){
        var city = eachSearch.innerHTML;
        getWeather(city);
    });
});


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
       
        var fiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.lat + "&lon=" + data.lon + "&units=imperial&appid=" + apiKey;
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

  };

  function showFiveDay(data) {

  };



