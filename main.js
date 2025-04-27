const apiKey = "facb6a0ac71033c4cf57cb801e9a3720";

const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

async function getWeather(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 404) {
            Swal.fire({
                icon: 'error',
                title: 'City Not Found',
                text: 'Please enter a valid city name.',
                confirmButtonColor: '#3085d6',
            });
            return;
        }

        const weatherIcon = data.weather[0].icon;
        const temperature = data.main.temp;
        const city = data.name;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const weatherDescription = data.weather[0].description;

        let weatherMain = data.weather[0].main;
let imagePath = "";

switch (weatherMain) {
    case "Clear":
        imagePath = "images/clear.png";
        break;
    case "Clouds":
        imagePath = "images/clouds.png";
        break;
    case "Rain":
        imagePath = "images/rain.png";
        break;
    case "Drizzle":
        imagePath = "images/drizzle.png";
        break;
    case "Thunderstorm":
        imagePath = "images/thunderstorm.png";
        break;
    case "Snow":
        imagePath = "images/snow.png";
        break;
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Ash":
    case "Squall":
    case "Tornado":
        imagePath = "images/mist.png";
        break;
    default:
        imagePath = "images/clear.png";
}

const weatherIconElement = document.getElementById("weather-icon");

// عمل ريستارت للأنيميشن
weatherIconElement.classList.add("fade-in");

setTimeout(() => {
    weatherIconElement.src = imagePath;
    weatherIconElement.classList.remove("fade-in");
}, 100); 

        document.getElementById("temp").textContent = Math.round(temperature) + "°C";
        document.getElementById("city").textContent = city;
        document.getElementById("humidity").textContent = humidity + "%";
        document.getElementById("wind").textContent = windSpeed + " m/s";
        document.getElementById("description").textContent = weatherDescription;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            confirmButtonColor: '#d33',
        });
    }
}

searchButton.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city !== "") {
        getWeather(city);
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Empty Input!',
            text: 'Please enter a city name.',
            confirmButtonColor: '#f39c12',
        });
    }
});
