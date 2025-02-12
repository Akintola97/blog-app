'use client'
import React, { useState, useEffect, useRef, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import SaveIcon from '@mui/icons-material/Save';
import Link from "next/link";
import Badge from '@mui/material/Badge';
import { Button } from "@/components/ui/button";
import { SavedItemsContext } from "@/context/SavedItems";  // Import the context

const HamburgerMenu = ({ user, isUserAuthenticated }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Use savedItems from the context
   const { savedItems } = useContext(SavedItemsContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { id, picture, given_name } = user || {};

  return (
    <>
      <div className="p-3 cursor-pointer">
        <MenuIcon onClick={handleOpen} className="h-8 w-8 hover:text-foreground" />
      </div>
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full md:w-[35%] w-full bg-black transform ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex items-center justify-end p-5 font-bold">
          <CloseIcon
            className="h-8 w-8 cursor-pointer hover:text-destructive"
            onClick={handleClose}
          />
        </div>
        <div className="w-full h-[50%] flex justify-center items-center">
          <ul className="text-white flex flex-col justify-center items-center">
            {!isUserAuthenticated ? (
              <>
                <li className="p-5">
                  <LoginLink onClick={handleClose}>
                    <h3 className="transform transition duration-300 hover:text-foreground">
                      Login
                    </h3>
                  </LoginLink>
                </li>
                <li className="p-5">
                  <RegisterLink onClick={handleClose}>
                    <h3 className="transform transition duration-300 hover:text-foreground">
                      Register
                    </h3>
                  </RegisterLink>
                </li>
              </>
            ) : (
              <>
                <li className="p-5 text-2xl capitalize flex flex-col items-center">
                  <Image
                    key={id}
                    src={picture}
                    height={100}
                    width={100}
                    alt={`${given_name}'s profile picture`}
                    className="rounded-full border-2"
                  />
                  <h2 className="mt-4 transform transition duration-300">
                    Hi, {given_name}
                  </h2>
                </li>
                <li className="relative p-5">
                  <Link href='/saved' onClick={handleClose}>
                    <Badge badgeContent={savedItems.length} color="secondary">
                      <SaveIcon className="dark:text-white text-[5vmin] hover:text-foreground" />
                    </Badge>
                  </Link>
                </li>
                <li className="p-5">
                  <LogoutLink onClick={handleClose}>
                  <Button variant="destructive">
                     <h3 className="dark:text-white">Logout</h3> 
                    </Button>
                  </LogoutLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;

