"use client"
import React, { createContext, useState, useEffect } from "react";

// Create the context
export const SavedItemsContext = createContext();

// Create the provider component
export const SavedItemsProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedItems")) || [];
    setSavedItems(saved);
  }, []);

  const toggleSaveItem = (item) => {
    let updatedSavedItems;
    if (savedItems.includes(item._id)) {
      // Unsave the item
      updatedSavedItems = savedItems.filter((id) => id !== item._id);
    } else {
      // Save the item
      updatedSavedItems = [...savedItems, item._id];
    }
    setSavedItems(updatedSavedItems);
    localStorage.setItem("savedItems", JSON.stringify(updatedSavedItems));
  };

  return (
    <SavedItemsContext.Provider value={{ savedItems, toggleSaveItem }}>
      {children}
    </SavedItemsContext.Provider>
  );
};
