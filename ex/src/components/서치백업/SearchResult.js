import React from "react";
import Header from "./Header";
import Search from "./Search";

function SearchResult () {
    return (
        <div>
            <Search/>
            <Header/>
            <div className="result-1">
                <p>에 대한 검색결과 입니다!</p>
            </div>
        </div>
    )
}

export default SearchResult;