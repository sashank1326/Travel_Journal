import React from 'react'
import { FiCloud, FiEye, FiSun, FiWind } from 'react-icons/fi'

export default function WeatherBox({ darkMode, blog, weather }) {
  return (
    <div className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 md:col-span-2">
          <div className='grid grid-cols-2'>
            <div className="flex items-center">
              <div className="mr-4">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  alt={weather.weather[0].description}
                  className="w-24 h-24"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold  ">{Math.round(weather.main.temp)}°C</h3>
                <p className="text-xl capitalize text-gray-600 dark:text-gray-300">{weather.weather[0].description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Current weather in {blog.location}</p>
              </div>
            </div>
            <div className={` ${darkMode ? 'text-gray-200 bg-emerald-600' : 'text-gray-800 bg-emerald-400'} p-6 rounded-lg shadow-md`}>
              <h3 className="text-xl font-bold mb-4">Travel Tip</h3>
              <p>
                {weather.weather[0].main === "Rain"
                  ? "Don't forget your umbrella and waterproof gear!"
                  : weather.weather[0].main === "Clear"
                    ? "It's a clear day - great for photography and outdoor activities!"
                    : weather.weather[0].main === "Clouds"
                      ? "It's a cloudy day - perfect for sightseeing without harsh sun."
                      : "Check local weather reports for any advisories before heading out."
                }
              </p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className={`${ darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-50 text-blue-600'}   p-4 rounded-lg`}>
              <div className="flex items-center">
                <FiCloud className='w-6 h-6 mr-2 ' />
                <h4 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} `}>Humidity</h4>
              </div>
              <p className="mt-2 text-2xl font-bold">{weather.main.humidity}%</p>
            </div>

            <div className={`${ darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-50 text-blue-600'}   p-4 rounded-lg`}>
              <div className="flex items-center">
                <FiWind className='w-6 h-6 mr-2 ' />
                <h4 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} `}>Wind Speed</h4>
              </div>
              <p className="mt-2 text-2xl font-bold">{weather.wind.speed} m/s</p>
            </div>

            <div className={`${ darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-50 text-blue-600'}   p-4 rounded-lg`}>
              <div className="flex items-center">
                <FiSun className='w-6 h-6 mr-2 ' />
                <h4 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} `}>Pressure</h4>
              </div>
              <p className="mt-2 text-2xl font-bold">{weather.main.pressure} hPa</p>
            </div>

            <div className={`${ darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-50 text-blue-600'}   p-4 rounded-lg`}>
              <div className="flex items-center">
                <FiEye className='w-6 h-6 mr-2 ' />
                <h4 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} `}>Visibility</h4>
              </div>
              <p className="mt-2 text-2xl font-bold">{(weather.visibility / 1000).toFixed(1)} km</p>
            </div>
          </div>
        </div>


      </div>

    </div>
  )
}