import React, { Component, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/com.css";
import { MdOutlineSearch } from "react-icons/md";
import axios from "axios";

const Search = () => {
  const nav = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [info, setinfo] = useState([]);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <body>

    <div className="logo">
      {" "}
      <Link to="/sale">
        <li>JJ MARKET</li>
      </Link>
      
      <div className="searchwindow">
        
        {/*  onSubmit={nav("/SearchResult")} */}
        
        <form className="search">
          <label htmlFor="header-search">
            <span className="visually-hidden"></span>
          </label>
          
          <input
            type="text"
            placeholder="찾는 제품을 검색해보세요!"
            className="search_bar"
            name="searchText"
            id="header-search"
            onKeyDown={(e) => {
              console.log(searchText);

              if (e.code == "Enter") {
                nav("/SearchResult?searchText=" + searchText);
              }
            }}
            onChange={handleChange}
          ></input>
        </form>
      </div>
    </div>
    </body>
  );
};

export default Search;
