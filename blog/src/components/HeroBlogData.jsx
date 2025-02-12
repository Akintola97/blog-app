"use client";

import React, { useState, useEffect, useCallback, useContext } from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import Image from "next/image";
import SearchBar from "./SearchBar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { SavedItemsContext } from "@/context/SavedItems";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components"; // Import LoginLink

export default function HeroBlogData({ data, isUserAuthenticated }) {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { savedItems, toggleSaveItem } = useContext(SavedItemsContext);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const uniqueCategories = [...new Set(data.map((item) => item.category))];

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  useEffect(() => {
    let filtered = data;

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery) ||
          item.author.toLowerCase().includes(searchQuery)
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, data]);

  const truncate = (str, num) =>
    str.length <= num ? str : str.slice(0, num) + "...";

  const formatDateToLocalTime = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handlePageChange = useCallback(
    (pageNumber, event) => {
      event.preventDefault();
      setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
    },
    [totalPages]
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Function to generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => handlePageChange(i, e)}
            className={`${currentPage === i ? "bg-blue-600 text-white" : ""}`}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <div className="w-full h-full p-6 dark:bg-gray-900">
      <SearchBar onSearch={handleSearch} />

      <div className="flex justify-center space-x-4 my-4 p-7 items-center">
        <button
          className={`btn ${
            selectedCategory === ""
              ? "bg-blue-600 text-white py-3 px-6 rounded-full shadow-md"
              : ""
          } hover:text-blue-600 dark:hover:text-blue-400 capitalize`}
          onClick={() => setSelectedCategory("")}
        >
          All
        </button>
        {uniqueCategories.map((category) => (
          <button
            key={category}
            className={`btn ${
              selectedCategory === category
                ? "bg-blue-600 text-white py-3 px-6 rounded-full shadow-md"
                : ""
            } hover:text-blue-600 dark:hover:text-blue-400 capitalize`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center mx-auto">
        {paginatedData?.map((item) => {
          const imageUrl = item.imageURL ? item.imageURL : item.mainImageUrl;

          return (
            <div key={item._id} className="w-full max-w-[400px] cursor-pointer">
              {isUserAuthenticated ? (
                <a href={`/blog/${item.slug}`}>
                  <Card className="w-full h-[450px] flex flex-col justify-between rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 bg-white dark:bg-gray-800 dark:text-white">
                    <div className="relative w-full h-60 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={item.slug}
                        layout="fill"
                        objectFit="cover"
                        priority={true}
                        className="rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black opacity-20"></div>
                    </div>

                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div className="flex flex-col mb-4">
                        <CardTitle className="text-lg font-bold mb-2">
                          {truncate(item.title, 40)}
                        </CardTitle>
                        <CardDescription className="text-sm mb-2 text-gray-600 dark:text-gray-400">
                          {truncate(item.description, 100)}
                        </CardDescription>
                      </div>

                      <div className="mt-auto relative">
                        <CardDescription className="text-xs text-gray-500 dark:text-gray-400">
                          By {item.author} •{" "}
                          {formatDateToLocalTime(item.dateCreated)}
                        </CardDescription>
                        <button className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                          Read More
                        </button>
                        {isUserAuthenticated && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveItem(item); // Trigger the save/unsave
                          }}
                          className="absolute bottom-2 right-2"
                        >
                          {savedItems.includes(item._id) ? (
                            <FaHeart className="text-red-500" size={24} />
                          ) : (
                            <FaRegHeart className="text-red-500" size={24} />
                          )}
                        </div>
                       )}
                      </div>
                    </div>
                  </Card>
                </a>
              ) : (
                <LoginLink>
                  <Card className="w-full h-[450px] flex flex-col justify-between rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 bg-white dark:bg-gray-800 dark:text-white">
                    <div className="relative w-full h-60 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={item.slug}
                        layout="fill"
                        objectFit="cover"
                        priority={true}
                        className="rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black opacity-20"></div>
                    </div>

                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div className="flex flex-col mb-4">
                        <CardTitle className="text-lg font-bold mb-2">
                          {truncate(item.title, 40)}
                        </CardTitle>
                        <CardDescription className="text-sm mb-2 text-gray-600 dark:text-gray-400">
                          {truncate(item.description, 100)}
                        </CardDescription>
                      </div>

                      <div className="mt-auto relative">
                        <CardDescription className="text-xs text-gray-500 dark:text-gray-400">
                          By {item.author} •{" "}
                          {formatDateToLocalTime(item.dateCreated)}
                        </CardDescription>
                        <button className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                          Read More
                        </button>
                      </div>
                    </div>
                  </Card>
                </LoginLink>
              )}
            </div>
          );
        })}
      </div>

      <div className="w-full h-full flex flex-col items-center p-10">
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent className="cursor-pointer">
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => handlePageChange(currentPage - 1, e)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {generatePaginationItems()}
              <PaginationItem>
                <PaginationNext
                  onClick={(e) => handlePageChange(currentPage + 1, e)}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
