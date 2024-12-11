const searchInput = document.getElementById("search");
const searchbtn = document.getElementById("submit");
const forecastContaciner = document.getElementById("forecastContaciner");

let forecastContainer = [];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

(function () {
  allData();
})();

//events
searchInput.addEventListener("input", allData);
searchbtn.addEventListener("click", allData);

//day by name
let dayByName = (date) => new Date(date);

async function allData() {
  await getData();
  display();
}

async function getData() {
  try {
    let searchValue = searchInput.value ? searchInput.value : "cairo";
    let weatherData = await (
      await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=08aafac0886448a9abb231843241012&q=${searchValue}07112&days=3`
      )
    ).json();
    forecastContainer = weatherData;
  } catch (error) {
    onerror = true;
  }
}

async function display() {
  try {
    let forecastDay = forecastContainer.forecast.forecastday;
    let curentNameDay = days[dayByName(forecastDay[0].date).getDay()];
    let curentDayMonth = months[dayByName(forecastDay[0].date).getMonth()];
    let curentMonthNum = new Date().getDate();
    let nextNameDay = days[dayByName(forecastDay[1].date).getDay()];
    let latestNameDay = days[dayByName(forecastDay[2].date).getDay()];
    forecastContaciner.innerHTML = `
            <div class="col-lg-4">
              <div class="card my_card">
                <div class="card_header d-flex justify-content-between">
                  <div class="day">${curentNameDay}</div>
                  <div class="date">${curentMonthNum}${curentDayMonth}</div>
                </div>
                <div class="card-body">
                  <p class="m-4">${forecastContainer.location.name}</p>
                  <h3 class="degree m-4">${forecastContainer.current.temp_c} <sup>o</sup>C</h3>
                  <img src="${forecastContainer.current.condition.icon}" alt="wind" />
                  <p class="ms-2 custom">${forecastContainer.current.condition.text}</p>
                  <div class="details d-flex gap-4 m-4">
                    <div>
                      <img
                        src="./images/icon-umberella.png"
                        alt="umberella"
                      /><span class="ms-2">${forecastContainer.current.cloud}%</span>
                    </div>
                    <div>
                      <img src="./images/icon-wind.png" alt="wind" /><span
                        class="ms-2"
                        >${forecastContainer.current.wind_kph}km/h</span
                      >
                    </div>
                    <div>
                      <img src="./images/icon-compass.png" alt="compass" /><span
                        class="ms-2"
                        >${forecastContainer.current.wind_dir}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4 ">
              <div class="card my_card2">
                <div class="card_header d-flex justify-content-between">
                 <p class="m-0 text-center w-100"> ${nextNameDay}</p>
                </div>
                <div class="card-body">
                  
                  <img src="${forecastContainer.forecast.forecastday[1].day.condition.icon}" alt=""  class="pt-5"/>
                  <h3 class="degree m-4 pt-2">${forecastContainer.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h3>
                  <p class="m-4">${forecastContainer.forecast.forecastday[1].day.mintemp_c} <sup>o</sup></p>
                  <p class="custom">${forecastContainer.forecast.forecastday[1].day.condition.text}</p>
         
                </div>
              </div>
            </div>
            <div class="col-lg-4">
                <div class="card my_card3">
                    <div class="card_header d-flex justify-content-between">
                        <p class="m-0 text-center w-100"> ${latestNameDay}</p>
                    </div>
                    <div class="card-body">
                      
                      <img src="${forecastContainer.forecast.forecastday[2].day.condition.icon}" alt="wind"  class="pt-5"/>
                      <h3 class="degree m-4 pt-2">${forecastContainer.forecast.forecastday[2].day.maxtemp_c} <sup>o</sup>C</h3>
                      <p class="m-4">${forecastContainer.forecast.forecastday[2].day.mintemp_c} <sup>o</sup></p>
                      <p class="custom">${forecastContainer.forecast.forecastday[2].day.condition.text}</p>
             
                    </div>
                  </div>
            </div>
      `;
  } catch (error) {
    onerror = true;
  }
}
