"use client";

import React, { useState, useEffect, useCallback, useContext } from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import Image from "next/image";
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
import { client } from "@/sanity/lib/client";
import SearchBar from "./SearchBar"; // Import your SearchBar component

export default function SavedBlogs({ isUserAuthenticated }) {
  const { savedItems, toggleSaveItem } = useContext(SavedItemsContext);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const itemsPerPage = 6;

  useEffect(() => {
    async function fetchSavedBlogs() {
      if (savedItems && savedItems.length > 0) {
        const query = `*[_type == 'post' && _id in ${JSON.stringify(savedItems)}]{
            _id,
            title,
            "slug": slug.current,
            description,
            "mainImageUrl": mainImage.asset->url,
            imageURL,
            author,
            dateCreated,
            category,
            content
        }`;
        const result = await client.fetch(query);
        setBlogs(result);
        setFilteredBlogs(result);
      } else {
        setBlogs([]);
        setFilteredBlogs([]);
      }
    }
    fetchSavedBlogs();
  }, [savedItems]);

  useEffect(() => {
    let filtered = blogs;

    if (selectedCategory !== "") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    if (searchQuery !== "") {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [selectedCategory, searchQuery, blogs]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handlePageChange = useCallback(
    (pageNumber, event) => {
      event.preventDefault();
      setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
    },
    [filteredBlogs]
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  const uniqueCategories = [...new Set(blogs.map((item) => item.category))];

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

  const handleCardClick = (e, slug) => {
    e.preventDefault();
    if (!isUserAuthenticated) {
      return;
    } else {
      window.location.href = `/blog/${slug}`;
    }
  };

  const handleToggleSaveItem = (item) => {
    toggleSaveItem(item);
    // Update the filteredBlogs and blogs state after toggling
    setBlogs(blogs.filter((blog) => blog._id !== item._id));
    setFilteredBlogs(filteredBlogs.filter((blog) => blog._id !== item._id));
  };

  if (filteredBlogs.length === 0) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <h2>No saved blogs found</h2>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-[10vh] p-6 dark:bg-gray-900">
      {filteredBlogs.length >= 6 && (
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>
      )}

      {blogs.length > 6 && (
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
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center mx-auto">
        {paginatedData?.map((item) => {
          const imageUrl = item.imageURL ? item.imageURL : item.mainImageUrl;

          return (
            <div
              key={item._id}
              className="w-full max-w-[400px] cursor-pointer"
              onClick={(e) => handleCardClick(e, item.slug)}
            >
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
                      By {item.author} • {formatDateToLocalTime(item.dateCreated)}
                    </CardDescription>
                    <button className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      Read More
                    </button>
                    {isUserAuthenticated && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSaveItem(item); // Trigger the save/unsave and update state
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
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="w-full h-full flex flex-col items-center p-10">
          <Pagination>
            <PaginationContent className="cursor-pointer">
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => handlePageChange(currentPage - 1, e)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => handlePageChange(page, e)}
                    className={`${
                      currentPage === page ? "bg-blue-600 text-white" : ""
                    }`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={(e) => handlePageChange(currentPage + 1, e)}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
