import React, { useState, useEffect } from "react";
import Header from "./Header";
import Search from "./Search";
import Linkpage from "./Linkpage";
import Footer from "./Footer";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../../css/searchResult.css";

const SearchResult = () => {

  const [searchKeyword, setSearchKeyword] = useState("");
  const [content, setcontent] = useState([]);
  const [contentTitle, setContentTitle] = useState([]);
  const [boardContent, setBoardContent] = useState([]);
  const [img,setimage]= useState("");
  
  useEffect(() => {
    const myKeyword = decodeURIComponent(
      window.location.href.replace(`http://202.31.243.19:8080/SearchResult?searchText=`, " ")
    );

    setSearchKeyword(myKeyword);
    if (!(myKeyword == " ")) {
      searchSale(myKeyword);

      searchWriting(myKeyword);
    }
  }, []);

  const searchSale = (myKeyword) => {
    Axios.post("/search", {
      title: myKeyword,
    })
      .then((res) => {
        console.log(res.data[0].saletitle);
        const data = res.data;
        console.log(res.data);
        setContentTitle(res.data);
        
      })
      .catch((e) => console.log(e));
  };

  const searchWriting = (myKeyword) => {
    Axios.post("/search-writing", {
      title: myKeyword,
      
    })
      .then((res) => {
        console.log(res.data[0].saletitle);
        const data = res.data;

        setBoardContent(res.data);
      })
      .catch((e) => console.log(e));
  };

  const myBuy = () => {
    const array = [];
    console.log("tset" + contentTitle);
    for (let i = 0; i < contentTitle.length; i++) {
      array.push(
        <>
          <Link to={"/saleinfo/" + contentTitle[i].saletitle} state={{ name: contentTitle[i].salenum }} key={i}>
          <img src ={"http://202.31.243.19:80"+contentTitle[i].image}></img>
            <span>{contentTitle[i].saletitle}</span>
           </Link>
        </>
      );
    }

    return array;
  };

  const myComment = () => {
    const array = [];
    console.log("tset" + boardContent);
    for (let i = 0; i < boardContent.length; i++) {
      array.push(
        <>
          <Link
            to={"/Read/" + boardContent[i].writing_no}
            state={{
              match: boardContent[i].writing_no,
            }}
            key={i}

          >
         
            {boardContent[i].title} <br />
          </Link>
        </>
      );
    }

    return array;
  };

  return (
    <div>
      <Linkpage />
      <Search />
      <Header />
      
      <div className="searchResult">
        <p>
          {" "}
          <span>"{searchKeyword} "</span> ??? ?????? ???????????? ?????????!
        </p>
      

      {/* ??????/?????? ??? ?????? ???????????? */}
      <div className="searchSale">
        ??????/?????? <hr />
        <div className="grid">{myBuy()}</div>
      </div>

      {/* ?????? ??? ?????? ???????????? */}
      <div className="searchQuestion">
        ?????? <hr />
        {myComment()}
      </div>
      </div>
      <Footer/>

    </div>
  );
};

export default SearchResult;
