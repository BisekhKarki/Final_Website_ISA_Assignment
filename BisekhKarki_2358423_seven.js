function before() {
    const cityName = localStorage.getItem("cityName")
    console.log(cityName)
    const formData = new FormData();
    formData.append('cityName', cityName);
    // Fetch the JSON data using the provided PHP script (display.php)
    fetch('display.php', { method: 'POST', body: formData })
    .then(response => response.json()) // Convert the response to JSON format
    .then(data => {
        console.log("data", data)
        let weather_detail = document.querySelector('.before');
        weather_detail.innerHTML = ''; // Clear previous data before appending new data

        if (data.length === 0) {
            weather_detail.innerHTML = '<p>No past weather data available.</p>';
            return;
        }

        data.forEach(list => {
            let details = document.createElement('li');

            details.innerHTML = `
                <p>City: ${list.city}</p>
                <p>Date: ${list.date}</p>
                <p>Temperature: ${list.temperature}°C</p>
                <p>Humidity: ${list.humidity}%</p>
                <p>Pressure: ${list.pressure} Pa</p>
                <p>Wind: ${list.wind} m/s</p>
                <p>Description: ${list.description}</p>
                <br>
            `;

            weather_detail.appendChild(details);
        });
    })

    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
}

before()

