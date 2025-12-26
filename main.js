const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', function (event) {
  if (event.key === "Enter") {
    getResults(searchBox.value.trim());
  }
});

function getResults(query) {
  if (query === "") return;

  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(response => response.json())
    .then(displayResults)
    .catch(() => alert("City not found"));
}

function displayResults(weather) {
  document.querySelector('.city').innerText =
    `${weather.name}, ${weather.sys.country}`;

  document.querySelector('.date').innerText =
    dateBuilder(new Date());

  const temp = Math.round(weather.main.temp);
  document.querySelector('.current .temp').innerHTML =
    `${temp}<span>°C</span>`;

  document.querySelector('.current .weather').innerText =
    weather.weather[0].main;

  document.querySelector('.current .hi-low').innerText =
    `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

  applyTheme(temp);
}

function applyTheme(temp) {
  const app = document.querySelector('.app-wrap');

  // Remove all existing theme classes
  app.classList.remove('theme-cold', 'theme-mild', 'theme-hot', 'theme-very-hot');

  if (temp <= 10) {
    app.classList.add('theme-cold');      // Cold: ≤10°C
  } else if (temp <= 20) {
    app.classList.add('theme-mild');      // Mild: 11–25°C
  } else if (temp <= 25) {
    app.classList.add('theme-hot');       // Hot: 26–35°C
  } else if (temp <= 30) {
    app.classList.add('theme-v-hot');}
    else if (temp <= 35) {
    app.classList.add('theme-very-hot');  }
     else if (temp <= 35) {
    app.classList.add('theme-ex-hot');}
      else if (temp <=45) {
    app.classList.add('theme-vx-hot');}
   else{
    app.classList.add('theme-horhot');  // Very hot: >35°C
  }
}


function dateBuilder(d) {
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const days = [
    "Sunday","Monday","Tuesday","Wednesday",
    "Thursday","Friday","Saturday"
  ];

  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
