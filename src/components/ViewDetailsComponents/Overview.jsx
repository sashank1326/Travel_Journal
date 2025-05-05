import React from 'react'
import { FiStar, FiMapPin, FiCalendar, FiCheckSquare, FiBookOpen } from 'react-icons/fi';

export default function Overview({darkMode, blog}) {
  return (
    <div className={`overflow-hidden rounded-2xl shadow-xl ${darkMode
      ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
      : "bg-gradient-to-br from-white to-gray-50 border border-gray-100"}`}>

      <div className={`px-6 py-4 ${darkMode ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-sm border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center px-3 py-1.5 rounded-full bg-opacity-80 
    ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}">
            <FiCalendar className="w-4 h-4 mr-2" />
            <span className="text-md font-medium">{new Date(blog.dateOfTravel).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}</span>
          </div>

          {blog.rating && (
            <div className="flex items-center gap-2">
              <div className="flex bg-opacity-80 px-3 py-2 rounded-full 
        ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-4 h-4 ${i < blog.rating ? "text-yellow-400" : "text-gray-400"}`}
                      fill={i < blog.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="ml-3 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}">
                  {blog.rating}/5
                </span>
              </div>
              <div className="hidden md:flex items-center gap-1 bg-opacity-80 px-3 py-1.5 rounded-full
        ${darkMode ? 'bg-emerald-900/50 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}">
                <FiCheckSquare className="w-4 h-4 text-emerald-700" />
                <span className="text-sm font-medium">Verified Trip</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        {blog.title && (
          <div className="flex gap-3 items-center mb-6 ">
            <FiMapPin className="text-2xl text-emerald-500" />
            <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              {blog.location}
            </h1>
          </div>
        )}


        <p>{blog.content}</p>


        <div className="mt-8 pt-4 border-t border-gray-700">
          <div className="flex text-sm items-center text-emerald-500 gap-1">
            <FiBookOpen className="w-4 h-4 text-xs" />
            <span className="text-md">{Math.ceil(blog.content.split(' ').length / 200)} min read</span>
          </div>
        </div>
      </div>
    </div>
  )
}