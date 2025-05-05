import React from 'react'
import { 
  FiFile, FiMap, FiCheck, FiImage, FiCloud, FiMessageCircle
} from 'react-icons/fi'


export default function SideBar({darkMode, activeTab, setActiveTab, blog, weather}) {
  return (
    <div className={`sticky left-3 min-w-[15rem] top-5 overflow-x-auto mb-6 rounded-2xl 
        ${darkMode
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200'
        : 'bg-gradient-to-br from-white to-gray-50 text-gray-800'} 
        shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>

      <div className="p-4">
        <div className="mb-4 px-2">
          <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Navigation
          </h3>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-200 ${activeTab === "overview"
              ? `bg-emerald-600 text-white shadow-md ${darkMode ? 'shadow-emerald-900/30' : 'shadow-emerald-500/30'}`
              : `${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'} hover:text-emerald-500`
              }`}
          >
            <FiFile className="w-5 h-5 mr-3"/>
            Overview
            {activeTab === "overview" && (
              <span className="ml-auto">
                <FiCheck className="w-5 h-5" fill="currentColor"  />
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("insights")}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-200 ${activeTab === "insights"
              ? `bg-emerald-600 text-white shadow-md ${darkMode ? 'shadow-emerald-900/30' : 'shadow-emerald-500/30'}`
              : `${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'} hover:text-emerald-500`
              }`}
          >
            <FiMap className="w-5 h-5 mr-3"/>
            Travel Insights
            {activeTab === "insights" && (
              <span className="ml-auto">
                <FiCheck className="w-5 h-5" fill="currentColor"  />
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-200 ${activeTab === "gallery"
              ? `bg-emerald-600 text-white shadow-md ${darkMode ? 'shadow-emerald-900/30' : 'shadow-emerald-500/30'}`
              : `${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'} hover:text-emerald-500`
              }`}
          >
            <FiImage className="w-5 h-5 mr-3"/>
            Gallery
            {activeTab === "gallery" && (
              <span className="ml-auto">
                <FiCheck className="w-5 h-5" fill="currentColor"  />
              </span>
            )}
          </button>

          {weather && (
            <button
              onClick={() => setActiveTab("weather")}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-200 ${activeTab === "weather"
                ? `bg-emerald-600 text-white shadow-md ${darkMode ? 'shadow-emerald-900/30' : 'shadow-emerald-500/30'}`
                : `${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'} hover:text-emerald-500`
                }`}
            >
              <FiCloud className="w-5 h-5 mr-3"/>
              Weather
              {activeTab === "weather" && (
                <span className="ml-auto">
                 <FiCheck className="w-5 h-5" fill="currentColor"  />
                </span>
              )}
            </button>
          )}

          {blog.author && blog.author._id !== localStorage.getItem('userId') ? (
            <button
              onClick={() => setActiveTab("chat")}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-200 ${activeTab === "chat"
                ? `bg-emerald-600 text-white shadow-md ${darkMode ? 'shadow-emerald-900/30' : 'shadow-emerald-500/30'}`
                : `${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'} hover:text-emerald-500`
                }`}
            >
              <FiMessageCircle className="w-5 h-5 mr-3"/>
              Message Author
              {activeTab === "chat" && (
                <span className="ml-auto">
                 <FiCheck className="w-5 h-5" fill="currentColor"  />
                </span>
              )}
            </button>
          ) : null}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <span>Travel Journal</span>
          </div>
        </div>
      </div>
    </div>
  )
}