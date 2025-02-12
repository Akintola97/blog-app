// "use client";
// import React, { useState, useEffect, useCallback, useContext } from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import Image from "next/image";
// import SearchBar from "./SearchBar";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// // import { SavedItemsContext } from "@/context/SavedItems"; // Import the context

// const formatDateToLocalTime = (dateString) => {
//   const date = new Date(dateString);
//   const options = {
//     month: "2-digit",
//     day: "2-digit",
//     year: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//     hour12: true,
//   };
//   return new Intl.DateTimeFormat("en-US", options).format(date);
// };

// const PaginationComponent = ({ data, isAuthenticated }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchInput, setSearchInput] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [uniqueCategories, setUniqueCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");

// //   const { savedItems, toggleSaveItem } = useContext(SavedItemsContext); // Use the context

//   useEffect(() => {
//     const categoriesSet = new Set();
//     const uniqueData = data?.filter((item) => {
//       if (!categoriesSet?.has(item.category)) {
//         categoriesSet?.add(item.category);
//         return true;
//       }
//       return false;
//     });
//     setFilteredData(uniqueData);
//     setUniqueCategories(Array.from(categoriesSet));
//   }, [data]);

//   useEffect(() => {
//     let newData = data;
//     if (selectedCategory) {
//       newData = newData.filter((item) => item.category === selectedCategory);
//     }
//     if (searchInput) {
//       newData = newData.filter(
//         (item) =>
//           item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
//           item.author.toLowerCase().includes(searchInput.toLowerCase())
//       );
//     }
//     setFilteredData(newData);
//   }, [searchInput, selectedCategory, data]);

//   const items_per_page = 6;
//   const totalPages = Math.ceil(filteredData?.length / items_per_page);

//   const handlePageChange = useCallback(
//     (pageNumber, event) => {
//       event.preventDefault();
//       setCurrentPage(Math?.max(1, Math.min(pageNumber, totalPages)));
//     },
//     [totalPages]
//   );

//   const startIndex = (currentPage - 1) * items_per_page;
//   const paginatedData = filteredData?.slice(
//     startIndex,
//     startIndex + items_per_page
//   );

//   const handleCardClick = (e, link) => {
//     e.preventDefault();
//     if (!isAuthenticated) {
//       return;
//     } else {
//       window.location.href = link;
//     }
//   };

//   const truncate = (str, num) =>
//     str.length <= num ? str : str.slice(0, num) + "...";

//   const generatePaginationItems = () => {
//     const items = [];
//     for (let i = 1; i <= totalPages; i++) {
//       items.push(
//         <PaginationItem key={i}>
//           <PaginationLink href="#" onClick={(e) => handlePageChange(i, e)}>
//             {i}
//           </PaginationLink>
//         </PaginationItem>
//       );
//     }
//     return items;
//   };

//   return (
//     <>
//       {/* <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} /> */}
//       <div className="flex justify-center space-x-8 p-8 dark:bg-black capitalize">
//         <button
//           onClick={() => setSelectedCategory("")}
//           className={`btn ${
//             selectedCategory === "" ? "btn-active" : ""
//           } hover:text-blue-700`}
//         >
//           All
//         </button>
//         {uniqueCategories.map((category) => (
//           <button
//             key={category}
//             onClick={() => setSelectedCategory(category)}
//             className={`btn ${
//               selectedCategory === category ? "btn-active" : ""
//             } hover:text-blue-700`}
//           >
//             {category}
//           </button>
//         ))}
//       </div>
//       <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mx-auto p-5 dark:bg-black">
//         {paginatedData?.map((item) => (
//           <div key={item._id}>
//             {isAuthenticated ? (
//               <div
//                 onClick={(e) => handleCardClick(e, `/blog/${item.current_slug}`)}
//               >
//                 <Card className="w-[380px] h-[350px] flex flex-col justify-between mb-10 relative hover:border-card dark:hover:border-primary cursor-pointer transition-transform transform hover:-translate-y-2 hover:shadow-lg">
//                   <CardHeader className="flex flex-col items-center p-2">
//                     <Image
//                       src={urlFor(item.images).url()}
//                       alt={item.current_slug}
//                       width={340}
//                       height={340}
//                       style={{ objectFit: "cover" }}
//                       priority={true}
//                       className="rounded-lg"
//                     />
//                     <CardTitle>{truncate(item.title, 30)}</CardTitle>
//                     <CardDescription>
//                       {truncate(item.description, 40)}
//                     </CardDescription>
//                     <CardDescription className="text-gray-300">
//                       {item.author}
//                     </CardDescription>
//                     <CardDescription className="text-gray-300">
//                       {formatDateToLocalTime(item.dateCreated)}
//                     </CardDescription>
//                   </CardHeader>
//                   <div
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSaveItem(item); // Trigger the save/unsave
//                     }}
//                   >
//                     {savedItems.includes(item._id) ? (
//                       <FaHeart
//                         className="absolute bottom-2 right-2 text-red-500"
//                         size={24}
//                       />
//                     ) : (
//                       <FaRegHeart
//                         className="absolute bottom-2 right-2 text-red-500"
//                         size={24}
//                       />
//                     )}
//                   </div>
//                 </Card>
//               </div>
//             ) : (
//               <LoginLink>
//                 <Card className="w-[380px] h-[350px] flex flex-col justify-between mb-10 relative hover:border-card dark:hover:border-primary cursor-pointer transition-transform transform hover:-translate-y-2 hover:shadow-lg">
//                   <CardHeader className="flex flex-col items-center p-2">
//                     <Image
//                       src={urlFor(item.images).url()}
//                       alt={item.current_slug}
//                       width={340}
//                       height={340}
//                       style={{ objectFit: "cover" }}
//                       priority={true}
//                       className="rounded-lg"
//                     />
//                     <CardTitle>{truncate(item.title, 30)}</CardTitle>
//                     <CardDescription>
//                       {truncate(item.description, 40)}
//                     </CardDescription>
//                     <CardDescription className="text-gray-300">
//                       {item.author}
//                     </CardDescription>
//                     <CardDescription className="text-gray-300">
//                       {formatDateToLocalTime(item.dateCreated)}
//                     </CardDescription>
//                   </CardHeader>
//                 </Card>
//               </LoginLink>
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="w-full h-full flex flex-col items-center p-10 dark:bg-black">
//         {totalPages > 1 && (
//           <Pagination>
//             <PaginationContent className="cursor-pointer">
//               <PaginationItem>
//                 <PaginationPrevious
//                   onClick={(e) => handlePageChange(currentPage - 1, e)}
//                   disabled={currentPage === 1}
//                 />
//               </PaginationItem>
//               {generatePaginationItems()}
//               <PaginationItem>
//                 <PaginationNext
//                   onClick={(e) => handlePageChange(currentPage + 1, e)}
//                   disabled={currentPage === totalPages}
//                 />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         )}
//       </div>
//     </>
//   );
// };

// export default PaginationComponent;

"use client";
// PaginationComponent.js
import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
// import imageUrlBuilder from "@sanity/image-url";
// import { SavedItemsContext } from "@/context/SavedItems";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
// import SearchBar from "./SearchBar";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// const builder = imageUrlBuilder(client);

// function urlFor(source) {
//   return builder.image(source);
// }

const PaginationComponent = ({ data, isAuthenticated }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  //   const { savedItems, toggleSaveItem } = useContext(SavedItemsContext);

  useEffect(() => {
    const categoriesSet = new Set();
    const uniqueData = data?.filter((item) => {
      if (!categoriesSet?.has(item.category)) {
        categoriesSet?.add(item.category);
        return true;
      }
      return false;
    });
    setFilteredData(uniqueData);
    setUniqueCategories(Array.from(categoriesSet));
  }, [data]);

  useEffect(() => {
    let newData = data;
    if (selectedCategory) {
      newData = newData.filter((item) => item.category === selectedCategory);
    }
    if (searchInput) {
      newData = newData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.author.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    setFilteredData(newData);
  }, [searchInput, selectedCategory, data]);

  const items_per_page = 6;
  const totalPages = Math.ceil(filteredData?.length / items_per_page);

  const handlePageChange = useCallback(
    (pageNumber, event) => {
      event.preventDefault();
      setCurrentPage(Math?.max(1, Math.min(pageNumber, totalPages)));
    },
    [totalPages]
  );

  const startIndex = (currentPage - 1) * items_per_page;
  const paginatedData = filteredData?.slice(
    startIndex,
    startIndex + items_per_page
  );

  const handleCardClick = (e, link) => {
    e.preventDefault();
    if (!isAuthenticated) {
      return;
    } else {
      window.location.href = link;
    }
  };

  const truncate = (str, num) =>
    str.length <= num ? str : str.slice(0, num) + "...";

  const generatePaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink href="#" onClick={(e) => handlePageChange(i, e)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <>
      {/* <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} /> */}
      <div className="flex justify-center space-x-8 p-8 dark:bg-black capitalize">
        <button
          onClick={() => setSelectedCategory("")}
          className={`btn ${
            selectedCategory === "" ? "btn-active" : ""
          } hover:text-blue-700`}
        >
          All
        </button>
        {uniqueCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`btn ${
              selectedCategory === category ? "btn-active" : ""
            } hover:text-blue-700`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mx-auto p-5 dark:bg-black">
        {paginatedData?.map((item) => (
          <div key={item._id}>
            {isAuthenticated ? (
              <div onClick={(e) => handleCardClick(e, `/blog/${item.slug}`)}>
                <Card className="w-[380px] h-[350px] flex flex-col justify-between mb-10 relative hover:border-card dark:hover:border-primary cursor-pointer transition-transform transform hover:-translate-y-2 hover:shadow-lg">
                  <CardHeader className="flex flex-col items-center p-2">
                    <Image
                      src={item.mainImageUrl}
                      alt={item.slug}
                      width={340}
                      height={340}
                      style={{ objectFit: "cover" }}
                      priority={true}
                      className="rounded-lg"
                    />
                    <CardTitle>{truncate(item.title, 30)}</CardTitle>
                    <CardDescription>
                      {truncate(item.description, 40)}
                    </CardDescription>
                    <CardDescription className="text-gray-300">
                      {item.author}
                    </CardDescription>
                    <CardDescription className="text-gray-300">
                      {formatDateToLocalTime(item.dateCreated)}
                    </CardDescription>
                  </CardHeader>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveItem(item);
                    }}
                  >
                    {/* {savedItems.includes(item._id) ? (
                      <FaHeart
                        className="absolute bottom-2 right-2 text-red-500"
                        size={24}
                      />
                    ) : (
                      <FaRegHeart
                        className="absolute bottom-2 right-2 text-red-500"
                        size={24}
                      />
                    )} */}
                  </div>
                </Card>
              </div>
            ) : (
              <LoginLink>
                <Card className="w-[380px] h-[350px] flex flex-col justify-between mb-10 relative hover:border-card dark:hover:border-primary cursor-pointer transition-transform transform hover:-translate-y-2 hover:shadow-lg">
                  <CardHeader className="flex flex-col items-center p-2">
                    <Image
                      src={item.mainImageUrl}
                      alt={item.slug}
                      width={340}
                      height={340}
                      style={{ objectFit: "cover" }}
                      priority={true}
                      className="rounded-lg"
                    />
                    <CardTitle>{truncate(item.title, 30)}</CardTitle>
                    <CardDescription>
                      {truncate(item.description, 40)}
                    </CardDescription>
                    <CardDescription className="text-gray-300">
                      {item.author}
                    </CardDescription>
                    <CardDescription className="text-gray-300">
                      {formatDateToLocalTime(item.dateCreated)}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </LoginLink>
            )}
          </div>
        ))}
      </div>
      <div className="w-full h-full flex flex-col items-center p-10 dark:bg-black">
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
    </>
  );
};

export default PaginationComponent;
