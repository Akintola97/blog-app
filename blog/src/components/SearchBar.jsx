"use client";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="w-full max-w-lg mx-auto mb-6">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by title or author..."
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-800 dark:text-white"
      />
    </div>
  );
}