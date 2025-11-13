"use client";
import { useState } from "react";
import header from "./header.module.css";
import { LoginButton } from "./LoginButton";
import { HomeButton } from "./HomeButton";
import LogOutButton from "./LogOutButton";
import { usePathname } from "next/navigation";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className={`${header.custom__header__gradient} text-white py-3`}>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <span className="navbar-brand fw-bold">
              <i className="bi bi-lightbulb-fill me-2"></i>
              <HomeButton></HomeButton>
            </span>
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="navbar-toggler-icon "></span>
            </button>
            <div
              className={`collapse navbar-collapse ${header.navbar__collapse} ${
                isOpen ? "show" : ""
              }`}
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                  {pathname === "/dashboard" ? (
                    <LogOutButton />
                  ) : (
                    <LoginButton />
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
