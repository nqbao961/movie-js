import React, { useEffect, useState } from "react";
import "../styles/TopNavigation.scss";
import Button from "./Button";

export default function TopNavigation() {
  const [position, setPosition] = useState(0);

  let handleScroll = () => {
    setPosition(document.querySelector("body")?.getBoundingClientRect().top);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className='topNavigation container'
      style={position !== 0 ? { backgroundColor: "#0a11166e" } : undefined}
    >
      <div className='wrapper'>
        <div className='favicon'>
          <img src="/favicon.ico" alt="" />
        </div>
        <div className='navList'>
          <ul className='leftNav'>
            <li className='navItem'>
              <a href="movies">Movies</a>
            </li>
          </ul>
          <div className='rightNav'>
            <input type="text" />
            <Button type="primary">Sign in</Button>
            <Button type="border">Sign up</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
