// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

// Date & Time
const times = document.getElementById('time');
const dates = document.getElementById('date');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


setInterval (()=>{
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const in12hrformat = hour >= 13 ? hour % 12 : hour;
    const minute = time.getMinutes();
    const ampm = hour > 12 ? 'PM' : 'AM';

    times.innerHTML = (in12hrformat < 10 ? '0' + in12hrformat : in12hrformat) + ':' + (minute < 10 ? '0' + minute : minute) + '' + `<span id='am-pm'>${ampm}</span>`;

    dates.innerHTML = days[day] + ', ' + date+ ' ' + months[month];

},1000);

// Weather Key
document.querySelector('.app-main').style.display = "none";

const weatherApi = {
    key: "bab281d79e5f1e9755a68d754cc313e7",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
}

const searchInputBox = document.getElementById('input-box');

// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (e) => {
    if(e.keyCode == 13) {
        // console.log(e);
        // console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.app-main').style.display = "block";
        document.querySelector("#modal").style.display = "none";
    }
});

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
}

// Show Weather Report
function showWeatherReport(weather){
    // console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;


    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url(./img/clear.jpg)";
        // document.body.style.backgroundImage = "url('./img/snow.gif')";
        // document.body.style.backgroundImage = "url('./img/thunder.gif')";    

    } else if(weatherType.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url(./img/cloud.jpg)";
       
    } else if(weatherType.textContent == 'Rain') {
        document.body.style.backgroundImage = "url(./img/rain.gif)";

    } else if(weatherType.textContent == 'Snow') {
        document.body.style.backgroundImage = "url('./img/snow.gif')";

    } else if(weatherType.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage = "url('./img/thunder.gif')";
    }
}


// Node pad
var random_margin = ["-5px", "1px", "5px", "10px", "7px"];
var random_degree = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-8deg)"];
var index = 0;

// window.onload = document.querySelector("#user_input").select();

    document.querySelector("#modal").style.display = "none";

    document.querySelector("#add").addEventListener("click", () => {
    document.querySelector('.app-main').style.display = "none";
    document.body.style.backgroundImage = 'url(https://jooinn.com/images/sea-136.jpg)';
    searchInputBox.value = '';
    document.querySelector("#modal").style.display = "block";
});

document.querySelector("#hide").addEventListener("click", () => {
  document.querySelector("#modal").style.display = "none";
});

document.querySelector("#user_input").addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
    const text = document.querySelector("#user_input");
    createStickyNote(text.value);
  }
});

createStickyNote = (text) => {
  let note = document.createElement("div");
  let details = document.createElement("div");
  let noteText = document.createElement("h1");
  let img = document.createElement('img');

  note.className = "note";
  details.className = "details";
  noteText.textContent = text;
  img.setAttribute('src','');

  details.appendChild(noteText);
  details.appendChild(img);
  note.appendChild(details);

  note.setAttribute("style", `
    margin:${random_margin[Math.floor(Math.random() * random_margin.length)]}; 
    transform:${random_degree[Math.floor(Math.random() * random_degree.length)]};
    background-image:url(./img/icon.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    object-fit: cover; 
    `);

  note.addEventListener("dblclick", () => {
    note.remove();
  })

  document.querySelector("#all_notes").appendChild(note);
}