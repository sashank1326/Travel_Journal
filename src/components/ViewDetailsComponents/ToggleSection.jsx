import React from "react";
import { useState } from "react";

export default function ToggleSection ({ title, icon, children, defaultOpen = false, darkMode }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const accentColors = {
      emerald: { bg: darkMode ? "bg-emerald-500/10" : "bg-emerald-50", border: "border-emerald-500", text: darkMode ? "text-emerald-400" : "text-emerald-600" },
    };

    const currentColor = accentColors.emerald;

    return (
      <div className={`rounded-xl overflow-hidden border ${darkMode ? "border-gray-700" : "border-gray-200"} shadow-sm`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between p-4 ${currentColor.bg} ${currentColor.text} transition-all duration-300`}
        >
          <div className="flex items-center gap-2">
            {icon}
            <span className="font-medium text-lg">{title}</span>
          </div>
          <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className={`p-6 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
            {children}
          </div>
        </div>
      </div>
    );
  };