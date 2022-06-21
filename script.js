let weather = {
    apiKey: "2aa66550c1b2eda783fa6abef3eb004b",

    //fetchWeather is a function, but he had to store the api key in the js file first, 
    //then use the fetchWeather function to get data from the api key
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("Input City/Town in search bar.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather(" ");

  //function for the reset button
  //might redo this using getElementById and store .clear as an id in css and then let reseter = document.getElementById('clear');
  document.querySelector(".clear").addEventListener("click", function () {
    document.querySelector(".search-bar").value = " ";
    document.querySelector(".city").innerText = "- - - -";
    document.querySelector(".temp").innerText = "- - -";
    document.querySelector(".description").innerText = "- - - -";
    document.querySelector(".humidity").innerText = "- - -";
    document.querySelector(".wind").innerText = "- -";
  });
