// To display the current date
const time = document.querySelector('.date');
// Get the current date
const date = new Date();
console.log(date)
// Format the date as "day / month / year"
const yearMonthDay = date.getDate() +  " / " + date.toLocaleDateString('en-US', {month: 'long'}) + " / " + date.getFullYear();

// Select various elements on the page for displaying weather information
const btn = document.querySelector('#btn');
let city = document.querySelector('.city');
let temperature = document.querySelector('.temperature');
let pressures = document.querySelector('#pressure-value');
let cloud = document.querySelector('.clouds');
let humidity = document.querySelector("#Humidity");
let wind = document.querySelector('#wind');
let weather = document.querySelector(".description");

// Asynchronous function for fetching weather data
async function fetching(value) {
  try {
    // Make API request from OpenWeatherMap
    let url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=7909a3f6027a002f28a9f982feb7917c&units=metric`);
    // Get the JSON response from the API
    let data = await url.json();

    // Update the date display
    time.innerHTML = yearMonthDay;
    

    // Process and display weather type
    const weathers = data.weather[0].description;
    const capital = weathers.charAt(0).toUpperCase() + weathers.replace(weathers[0],"");
    weather.innerHTML = capital;

    // To display temperature after fetching the data from API
    temperature.innerHTML = "Temperature: " + Math.floor(Math.round(data.main.temp)) + " °C ";

    // To display city after fetching the data from API
    city.innerHTML = "City: " + data.name;
    console.log(city)

    // To display pressure after fetching the data from API
    pressures.innerHTML = "Pressure: " + data.main.pressure + " Pa";
    
    // To display cloud icon according to the weather
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
    cloud.src = iconUrl; 

    // To display wind after fetching the data from API
    wind.innerHTML = "Wind speed: " + data.wind.speed + "m/s";
    // To display humidity after fetching the data from API
    humidity.innerHTML = "Humidity: " + data.main.humidity + "%";



    // For local Storage
    localStorage.setItem(data.name, JSON.stringify(data));

    localStorage.setItem("cityName", `${data.name}`)

    // // Call the function to save data to the database
    saveWeather(data.name, data)
   
    // before(data.name); // Pass the city name to the past function
    

     // Create a FormData object and append the JavaScript variable
    const formData = new FormData();
    formData.append('cityName', value);

    try {
      const response = fetch('display.php', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const data = await response.text();
        console.log(data); // Response from the PHP script
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
}
  } 
  catch(error) 
  {
    let storedData = localStorage.getItem(`${value}`); 
      if (storedData) {
        storedData = JSON.parse(storedData);

        time.innerHTML = yearMonthDay;
        city.innerHTML = "City: " + storedData.name;
        wind.innerHTML = "Wind speed: " + storedData.wind.speed + "m/s";
        humidity.innerHTML = "Humidity: " + storedData.main.humidity + "%";
        pressures.innerHTML = "Pressure: " + storedData.main.pressure + " Pa";
        const weathe = storedData.weather[0].description;
        const capita = weathe.charAt(0).toUpperCase() + weathe.substring(1);
        weather.innerHTML = capita;

        temperature.innerHTML = "Temperature: " + Math.floor(Math.round(storedData.main.temp)) + " °C";

        const ico = storedData.weather[0].icon;
        const icoUrl = `https://openweathermap.org/img/w/${ico}.png`;
        cloud.src = icoUrl;
      }

   
    else {
    // Clear input field after searcing for the city 
    let loc =  document.querySelector("#search");    
    loc.value = ''
    // Handle error when the city name is invalid 
    // Clear weather information if error occured
    time.innerHTML = '';
    city.innerHTML = "Invalid City Name" + "<br>" + "Please enter a valid city name";
    wind.innerHTML = '';
    humidity.innerHTML = '';
    pressures.innerHTML = '';
    weather.innerHTML = '';
    temperature.innerHTML = '';
    cloud.innerHTML = '--'; 
    cloud.src = '--';
    }
    
  }
}



// Fetching the weather details of the default city (Milton Keynes, GB)
fetching('Milton Keynes');

// Event listener for button click to fetch weather data for user-entered city
btn.addEventListener('click', () => {
  let cityName = document.querySelector('#search').value;
  // Fetch weather data for the entered city
  fetching(cityName);
  // Clear the input field
  document.querySelector("#search").value = '';


   // For local Storage
   let dats = localStorage.getItem(`${cityName}`);
   if (dats) {
     dats = JSON.parse(dats);
   
       time.innerHTML = yearMonthDay;
       city.innerHTML = "City: " + dats.name;
       wind.innerHTML = "Wind speed: " + dats.wind.speed + "m/s";
       humidity.innerHTML = "Humidity: " + dats.main.humidity + "%";
       pressures.innerHTML = "Pressure: " + dats.main.pressure + " Pa";
       const weathe = dats.weather[0].description;
       const capita = weathe.charAt(0).toUpperCase() + weathe.substring(1);
       weather.innerHTML = capita;

       temperature.innerHTML = "Temperature: " + Math.floor(Math.round(dats.main.temp)) + " °C";

       const ico = dats.weather[0].icon;
       const icoUrl = `https://openweathermap.org/img/w/${ico}.png`;
       cloud.src = icoUrl;

   }
  
});


// Define a function to save weather data to the server
function saveWeather(city,data) {
  try {
    // Send a POST request to the server to save weather data
    const response = fetch("BisekhKarki_2358423.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ city, data }) // Convert data to JSON format and send it in the request body
    });
    const val = response.text()
    console.log(val)
   
  } catch (error) {
    // Log an error message if data was not saved successfully
    console.error("Data was not saved successfully"+ error);
  }
}




