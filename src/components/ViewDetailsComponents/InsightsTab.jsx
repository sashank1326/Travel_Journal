import React from 'react'
import ToggleSection from './ToggleSection'

export default function InsightsTab({ analysis, darkMode }) {
  const data = Array.isArray(analysis) ? analysis[0] : analysis;
  return (
    <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="p-6">
        <div className="flex flex-wrap gap-4 mb-8">
          <div className={`flex-1 min-w-[180px] rounded-xl p-5 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm border-l-4 border-emerald-500`}>
            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Travel Style</p>
            <p className="text-xl font-medium flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path>
              </svg>
              {data?.["Travel Style"]}
            </p>
          </div>

          <div className={`flex-1 min-w-[180px] rounded-xl p-5 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm border-l-4 border-emerald-500`}>
            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Season</p>
            <p className="text-xl font-medium flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
              </svg>
              {data?.Season}
            </p>
          </div>

          <div className={`flex-1 min-w-[180px] rounded-xl p-5 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm border-l-4 border-emerald-500`}>
            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Travel Mode</p>
            <p className="text-xl font-medium flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
              </svg>
              {data?.["Travel Mode"]}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <ToggleSection
            title="Must-Visit Attractions"
            icon={
              <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            }
            defaultOpen={true}
            darkMode={darkMode}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data?.["Nearby Attractions"]?.map((place, index) => (
                <div
                  key={index}
                  className={`group relative rounded-xl overflow-hidden transition-all ${darkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50"} shadow-md hover:shadow-lg`}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className={`font-medium text-lg ${darkMode ? 'text-gray-300' : 'text-gray-800'} mb-2`}>{place.Name}</h4>
                      <span className={`flex items-center font-bold justify-center w-8 h-8 rounded-full ${darkMode ? 'bg-emerald-500' : 'bg-emerald-700'} text-white`}>
                        {index + 1}
                      </span>
                    </div>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{place.Description}</p>
                  </div>
                </div>
              ))}
            </div>
          </ToggleSection>

          <ToggleSection
            title="Where To Stay"
            icon={
              <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            }
            defaultOpen={false}
            darkMode={darkMode}
          >
            <div className="space-y-6">
              <div className={`rounded-xl overflow-hidden border-2 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <div className={`px-5 py-3 ${darkMode ? "bg-emerald-900/20" : "bg-emerald-50"}`}>
                  <h4 className={`flex items-center gap-2 font-medium ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 text-xs">$</span>
                    Budget-Friendly Options
                  </h4>
                </div>
                <div className={`px-5 py-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                  {data?.["Hotel Suggestions"]?.["Budget"]?.map((hotel, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className={`font-bold ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                          {hotel.Name}
                        </h5>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${darkMode ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-50 text-emerald-700"}`}>
                          {hotel["Price Range"]}
                        </span>
                      </div>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Comfortable stay at a great value.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-xl overflow-hidden border-2 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <div className={`px-5 py-3 ${darkMode ? "bg-emerald-900/20" : "bg-emerald-50"}`}>
                  <h4 className={`flex items-center gap-2 font-medium ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 text-xs">$$</span>
                    Mid-Range Comfort
                  </h4>
                </div>
                <div className={`px-5 py-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                  {data?.["Hotel Suggestions"]?.["Mid-Range"]?.map((hotel, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className={`font-bold ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                          {hotel.Name}
                        </h5>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${darkMode ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-50 text-emerald-700"}`}>
                          {hotel["Price Range"]}
                        </span>
                      </div>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Comfortable and scenic mid-range stay.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-xl overflow-hidden border-2 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <div className={`px-5 py-3 ${darkMode ? "bg-emerald-900/20" : "bg-emerald-50"}`}>
                  <h4 className={`flex items-center gap-2 font-medium ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 text-xs">$$$</span>
                    Luxury Experiences
                  </h4>
                </div>
                <div className={`px-5 py-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                  {data?.["Hotel Suggestions"]?.["Luxury"]?.map((hotel, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className={`font-bold ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                          {hotel.Name}
                        </h5>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${darkMode ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-50 text-emerald-700"}`}>
                          {hotel["Price Range"]}
                        </span>
                      </div>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Premium luxury stay with top-tier amenities.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ToggleSection>

          <ToggleSection
            title="Budget Planner (Per week)"
            icon={
              <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            }
            defaultOpen={false}
            darkMode={darkMode}
          >
            <div className={`rounded-xl overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`text-left ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
                      <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Expense Category</th>
                      <th className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 text-xs">$</span>
                          <span className={`text-sm font-medium ${darkMode ?  'text-gray-300' : 'text-gray-900'} `}>Budget</span>
                        </div>
                      </th>
                      <th className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 text-xs">$$</span>
                          <span className={`text-sm font-medium ${darkMode ?  'text-gray-300' : 'text-gray-900'} `}>Mid-Range</span>
                        </div>
                      </th>
                      <th className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 text-xs">$$$</span>
                          <span className={`text-sm font-medium ${darkMode ?  'text-gray-300' : 'text-gray-900'} `}>Luxury</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(data?.["Estimated Cost"]?.Budget || {}).map(([category, budgetValue], index) => {
                      if (category === "Total") return null;

                      return (
                        <tr key={index} className={`${darkMode ? "border-gray-700" : "border-gray-200"} ${index % 2 === 0 ? darkMode ? "bg-gray-800" : "bg-white" : darkMode ? "bg-gray-750" : "bg-gray-50"}`}>
                          <td className="px-6 py-4 text-sm font-medium capitalize">{category}</td>
                          <td className="px-6 py-4 text-sm font-medium text-emerald-700">
                            {data?.["Estimated Cost"]?.Budget?.[category]}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-emerald-700">
                            {data?.["Estimated Cost"]?.["Mid-Range"]?.[category]}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-emerald-700">
                            {data?.["Estimated Cost"]?.Luxury?.[category]}
                          </td>
                        </tr>
                      );
                    })}

                    <tr className={`${darkMode ? "border-gray-700 border-t-2" : "border-gray-300 border-t-2"} font-bold`}>
                      <td className="px-6 py-4 text-sm font-extrabold">Total Estimated Cost</td>
                      <td className="px-6 py-4 text-sm text-emerald-600 dark:text-emerald-400">
                        {data?.["Estimated Cost"]?.Budget?.Total}
                      </td>
                      <td className="px-6 py-4 text-sm text-emerald-600 dark:text-emerald-400">
                        {data?.["Estimated Cost"]?.["Mid-Range"]?.Total}
                      </td>
                      <td className="px-6 py-4 text-sm text-emerald-600 dark:text-emerald-400">
                        {data?.["Estimated Cost"]?.Luxury?.Total}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ToggleSection>


        </div>
      </div>
    </div>
  )
}