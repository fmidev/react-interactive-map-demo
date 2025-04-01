import React, { useState, useEffect } from "react"
import Map from "./components/Map"

const regionCoordinates = {
  åland: "60.11,19.93", // Ahvenanmaa
  "south karelia": "61.17,28.77", // Etelä-Karjala
  "southern ostrobothnia": "62.83,22.85", // Etelä-Pohjanmaa
  "southern savonia": "61.70,27.27", // Etelä-Savo
  kainuu: "64.37,28.25", // Kainuu
  "tavastia proper": "60.91,24.45", // Kanta-Häme
  "central ostrobothnia": "63.72,23.54", // Keski-Pohjanmaa
  "central finland": "62.24,25.75", // Keski-Suomi
  kymenlaakso: "60.78,26.71", // Kymenlaakso
  lapland: "67.92,26.50", // Lappi
  pirkanmaa: "61.50,23.76", // Pirkanmaa
  ostrobothnia: "63.11,21.62", // Pohjanmaa
  "north karelia": "62.99,30.07", // Pohjois-Karjala
  "northern ostrobothnia": "65.01,25.47", // Pohjois-Pohjanmaa
  "northern savonia": "63.09,27.25", // Pohjois-Savo
  "päijänne tavastia": "61.06,25.50", // Päijät-Häme
  satakunta: "61.48,21.79", // Satakunta
  uusimaa: "60.17,24.94", // Uusimaa
  "finland proper": "60.45,22.26" // Varsinais-Suomi
}



function App() {
  const [weatherData, setWeatherData] = useState({})
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Fetch weather data from the API for all regions
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherPromises = Object.entries(regionCoordinates).map(([region, latlon]) => {
          return fetch(
            `http://smartmet.fmi.fi/timeseries?producer=pal_skandinavia&param=Time,Temperature,Precipitation1h,latlon,WindSpeedMS&timesteps=1&latlon=${latlon}&format=json`
          )
            .then(response => response.json())
            .then(data => {
              console.log("Fetched data for region:", region, data)
              return { region, data: data }
            })
        })

        const results = await Promise.all(weatherPromises)

        const regionWeather = results.reduce((acc, { region, data }) => {
          acc[region] = data
          return acc
        }, {})

        setWeatherData(regionWeather)
        console.log("Weather data after fetching:", regionWeather) // Log weather data after setting state
      } catch (error) {
        console.error("Error fetching weather data:", error)
      }
    }

    fetchWeatherData()
  }, [])

  // Handle region click and update mouse position
  const handleRegionClick = (region, e) => {
    if (!region) {
      setSelectedRegion(null) // Close popup
      return
    }
  
    console.log(`Clicked region: ${region}`)
    console.log("Weather data for region:", weatherData[region.toLowerCase()])
  
    if (e && e.clientX && e.clientY) {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setSelectedRegion(region.toLowerCase()) // Ensure lowercase for matching
    }
  }
  

  // Function to display weather data based on selected region
  const getWeatherDetails = (region) => {
    if (weatherData[region] && Array.isArray(weatherData[region]) && weatherData[region].length > 0) {
      return weatherData[region][0] // Get the first object from the array
    }
    return null // Return null if no data is available
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Interactive Weather Map Example</h1>
      <div>
        <Map onRegionClick={handleRegionClick} weatherData={weatherData} />

        {/* Popup for selected region */}
        {selectedRegion && (
          <div
            style={{
              position: "absolute",
              top: `${mousePosition.y + 10}px`,
              left: `${mousePosition.x + 10}px`,
              background: "white",
              padding: "10px",
              border: "1px solid black",
              borderRadius: "5px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 1000
            }}
          >
            <h4>{selectedRegion.toUpperCase()}</h4>

            {/* Get the weather details for the selected region */}
            {getWeatherDetails(selectedRegion) ? (
              <>
                <p><strong>Temperature:</strong> {getWeatherDetails(selectedRegion).Temperature}°C</p>
                <p><strong>Wind Speed:</strong> {getWeatherDetails(selectedRegion).WindSpeedMS} m/s</p>
                <p><strong>Precipitation:</strong> {getWeatherDetails(selectedRegion).Precipitation1h} mm</p>
              </>
            ) : (
              <p>No weather data available</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
