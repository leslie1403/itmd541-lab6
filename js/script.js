const cities = { 
    chicago: { 
        latitude: 41.8781, 
        longitude: -87.6298, 
        url: "https://api.sunrisesunset.io/json?lat=41.8781&lng=-87.6298", 
        timezone: "America/Chicago" 
    }, 
    phoenix: { 
        latitude: 33.4484, 
        longitude: -112.0740, 
        url: "https://api.sunrisesunset.io/json?lat=33.4484&lng=-112.0740", 
        timezone: "America/Phoenix" 
    }, 
    losAngeles: { 
        latitude: 34.0522, 
        longitude: -118.2437, 
        url: "https://api.sunrisesunset.io/json?lat=34.0522&lng=-118.2437", 
        timezone: "America/Los_Angeles" 
    }, 
    sanDiego: { 
        latitude: 32.7157, 
        longitude: -117.1611, 
        url: "https://api.sunrisesunset.io/json?lat=32.7157&lng=-117.1611", 
        timezone: "America/Los_Angeles" 
    }, 
    sanJose: { 
        latitude: 37.3382,
        longitude: -121.8863,
        url: "https://api.sunrisesunset.io/json?lat=37.3382&lng=-121.8863", 
        timezone: "America/Los_Angeles"
    }, 
    newYorkCity: { 
        latitude: 40.7128, 
        longitude: -74.0060, 
        url: "https://api.sunrisesunset.io/json?lat=40.7128&lng=-74.0060", 
        timezone: "America/New_York" 
    }, 
    philadelphia: { 
        latitude: 39.9526, 
        longitude: -75.1652, 
        url: "https://api.sunrisesunset.io/json?lat=39.9526&lng=-75.1652", 
        timezone: "America/New_York" 
    }, 
    austin: { 
        latitude: 30.2672, 
        longitude: -97.7431, 
        url: "https://api.sunrisesunset.io/json?lat=30.2672&lng=-97.7431", 
        timezone: "America/Chicago" 
    }, 
    dallas: { 
        latitude: 32.7767, 
        longitude: -96.7970, 
        url: "https://api.sunrisesunset.io/json?lat=32.7767&lng=-96.7970", 
        timezone: "America/Chicago" 
    }, 
    houston: { 
        latitude: 29.7604, 
        longitude: -95.3698, 
        url: "https://api.sunrisesunset.io/json?lat=29.7604&lng=-95.3698", 
        timezone: "America/Chicago" 
    }, 
    sanAntonio: {
        latitude: 29.4241, 
        longitude: -98.4936, 
        url: "https://api.sunrisesunset.io/json?lat=29.4241&lng=-98.4936", timezone:"America/Chicago" 
    },
    //myLocation: { 
      //latitude: ,  // Replace with your latitude
      //longitude: // Replace with your longitude
      //url: "https://api.sunrisesunset.io/json?lat=41.8781&lng=-87.6298"  // Update with your latitude and longitude
    //}
  };

  document.querySelectorAll('.location').forEach(button => {
    button.addEventListener('click', () => {
      const cityId = button.id;
      const city = cities[cityId];
      
      fetch(city.url)
        .then(response => response.json())
        .then(data => {
          // Check the API response to confirm property names
          const results = data.results;
  
          const sunriseToday = results.sunrise;
          const sunsetToday = results.sunset;
          const dawnToday = results.civil_twilight_begin || results.dawn || results.astronomical_twilight_begin;
          const duskToday = results.civil_twilight_end || results.dusk || results.astronomical_twilight_end;
          const dayLength = results.day_length;
          const solarNoon = results.solar_noon;
          const currentDate = new Date(); 
          const todayDate = currentDate.toLocaleDateString('en-US'); 
          const tomorrowDate = new Date(currentDate); 
          tomorrowDate.setDate(tomorrowDate.getDate() + 1); 
          const tomorrowDateString = tomorrowDate.toLocaleDateString('en-US'); 
          const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; 
          
          document.querySelector('.today-header').innerText = `Today, ${todayDate}`; 

          document.querySelector('.today-sun-info .sunrise-info h4:nth-child(2)').innerText = `Sunrise: ${sunriseToday}`;
          document.querySelector('.today-sun-info .sunrise-info h4:nth-child(3)').innerText = `Dawn: ${dawnToday}`;
          document.querySelector('.today-sun-info .sunset-info h4:nth-child(2)').innerText = `Sunset: ${sunsetToday}`;
          document.querySelector('.today-sun-info .sunset-info h4:nth-child(3)').innerText = `Dusk: ${duskToday}`;
          document.querySelector('.today-sun-info .day-info h4:nth-child(2)').innerText = `Day Length: ${dayLength}`;
          document.querySelector('.today-sun-info .day-info h4:nth-child(3)').innerText = `Solar Noon: ${solarNoon}`;
  
          // Optionally update the "tomorrow" section similarly if you have the data
          document.querySelector('.tomorrow-header').innerText = `Tomorrow, ${tomorrowDateString}` 



          document.querySelector('.location-name').innerText = `Location: ${button.innerText}`; 
          document.querySelector('.location-timezone').innerText = `Time Zone: ${city.timezone}`
        })
        .catch(error => console.error('Error fetching data:', error));
    });
  });
  