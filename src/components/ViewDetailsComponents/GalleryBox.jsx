import React from 'react'
import { useState } from 'react'

export default function GalleryBox({ blog, darkMode }) {
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div>

      <div className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        {blog.images && blog.images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10">
            {blog.images.map((image, index) => (
              <div key={index} className="aspect-w-16 aspect-h-12 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <img
                  src={`http://localhost:5000/${image}`}
                  alt={`${blog.title} - Image ${index + 1}`}
                  onClick={() => setSelectedImage(`http://localhost:5000/${image}`)}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <p className="mt-4 text-gray-500 dark:text-gray-400">No images available for this adventure</p>
          </div>
        )}
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 bg-opacity-75"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-0 right-0 text-white text-4xl "
            >
              &times;
            </button>
            <img src={selectedImage} alt="Expanded view" className="w-full p-5 h-auto rounded-lg" />
          </div>
        </div>
      )}
    </div>

  )
}