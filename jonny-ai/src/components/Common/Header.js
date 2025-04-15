import React from "react";

function Header({ setIsSidebarOpen }) {
  return (
    <header className="bg-background-light border-b border-background-lighter p-3 flex items-center md:hidden">
      <button onClick={() => setIsSidebarOpen(true)} className="mr-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className="flex items-center">
        <img src="/logo.svg" alt="Jonny AI Logo" className="w-7 h-7 mr-2" />
        <h1 className="text-lg font-bold text-primary">Jonny AI</h1>
      </div>
    </header>
  );
}

export default Header;
