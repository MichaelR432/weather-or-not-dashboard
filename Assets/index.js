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
        let searchResults = $("#search-results")
        searchResults.empty();
    }

    for (let i=0; i<cityArray.length; i++) {
        let city = $("<li>").text(cityArray[i]);
        city.addClass("list-group-item");
        searchResults.prepend(city);
    }

    // click event to search cities
    $("#search-btn").click(function () {
        let cityInput = $("#search-input").val();
        cityArray.push(cityInput)
        queries(cityInput)

    // placing city inputs into local storage
    localStorage.setItem("cities", JSON.stringify(cityArray));
    
    console.log(cityArray);

    })

    //Calling function to show cities
    showCities();

});