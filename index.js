$(document).ready(function () {
  // create an array for cities to be held
  let cityArray = localStorage.getItem("cities");

  // parsing the city search results from local storage
  if (cityArray === null) {
    cityArray = [];
  } else {
    cityArray = JSON.parse(cityArray);
  }

  // function to show cities from search bar

  function showCities() {
    let searchResults = $("#searchResults");
    searchResults.empty();

    for (let i = 0; i < cityArray.length; i++) {
      let city = $("<li>").text(cityArray[i]);
      city.addClass("list-group-item");
      searchResults.prepend(city);
    }
  }

  // connect to weather api and call requests

  function weatherCall(cityInput) {
    let apiKey = "f55bbae1950a45872318ea4d866e7b67";
    let currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + apiKey + "&units=imperial";

    // ajax call to get current weather of city search
    $.ajax({
      url: currentWeather,
      method: "GET",
    }).then(function (response) {
      $("#city").text(response.name);
      $("#temp").html("Temperature " + response.main.temp + " &#176; F");
      $("#wind").text("Wind Speed: " + response.wind.speed + " mph");
      $("#humidity").text("Humidity: " + response.main.humidity + "%");

      var uvResponse = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;

      // ajax call to get UV color from api
      $.ajax({
        url: uvResponse,
        method: "GET",
      }).then(function (uvIndex) {
        $("#uvIndex").text("UV Index: " + uvIndex.value);

        // conditional to change color of uv index
        if (uvIndex.value <= 2) {
          $("#uvIndex").addClass(".text-light");
          $("#uvIndex").attr("style", "background-color: green");
        } else if (uvIndex.value > 3 && uvIndex.value <= 5) {
          $("#uvIndex").addClass(".text-light");
          $("#uvIndex").attr("style", "background-color: yellow");
        } else if (uvIndex.value > 5 && uvIndex.value <= 7) {
          $("#uvIndex").addClass(".text-light");
          $("#uvIndex").attr("style", "background-color: orange");
        } else if (uvIndex.value > 7 && uvIndex.value < 10) {
          $("#uvIndex").addClass(".text-light");
          $("#uvIndex").attr("style", "background-color: red");
        } else if (uvIndex.value > 11) {
          $("#uvIndex").addClass(".text-light");
          $("#uvIndex").attr("style", "background-color: violet");
        }
      });
    });
  

  // Api call to reach 5 day weather 
  let weeklyWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + apiKey + "&units=imperial";
  console.log(weeklyWeather)

  //ajax call to 5-Day Forecast
  $.ajax({
    url: weeklyWeather,
    method: "GET"
    }).then(function (weekRes) {
    console.log(weekRes);

    let list = weekRes.list
    console.log(list);
    $("#weekly-forecast").empty()

    //for loop to pass week forecast variables into group card components.
    for (let i = 0; i < list.length; i += 8) {

        let forecastCol = $("<div class='col text-center align-items-center'>");
        let date = $("<h4 class='card-title'>").text(list[i].dt_txt.split(" ")[0]);
        let humidity = $("<p class='card-subtitle'>").text("Humidity: " + list[i].main.humidity + " %");
        let temperature = $("<p class='card-subtitle'>").html("Temp: " + list[i].main.temp + " &#176; F");
        let img = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + list[i].weather[0].icon + "@2x.png");

        forecastCol.append(date);
        forecastCol.append(temperature);
        forecastCol.append(humidity);
        forecastCol.append(img);
        $("#weekly-forecast").append(forecastCol);

    }
})

  }

  // click event to search cities
  $("#search-btn").click(function () {
    let cityInput = $("#search-input").val();
    cityArray.push(cityInput);
    weatherCall(cityInput);

    // placing city inputs into local storage
    localStorage.setItem("cities", JSON.stringify(cityArray));

    console.log(cityArray);

    //Calling function to show cities
    showCities();
  });

  // Adding in search history to display in a list group

  $(document).on("click", ".list-group-item", function () {
    let cityInput = $(this).text();
    weatherCall(cityInput);
  });

  showCities();
});
// test
