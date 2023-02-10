import React from "react";
import Home from "./Home";

const Page1 = () => {
  return (
    <div>
      <Home />

      <header>
        <span className="nav-list">
          <nav>Home</nav>
          <nav>Movies</nav>
        </span>
        <span className="nav-search">
          <input type="text" placeholder="Search" id="search" />
          <button className="button">Search</button>
        </span>
      </header>
    </div>
  );
};

export default Page1;
