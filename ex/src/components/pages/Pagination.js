import React, { useEffect, useState } from "react";
import useFetch from "../customHook/useFetch";

const PagiNation = () => {
  const { loading, data, error } = useFetch("http://localhost:3000/question/");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(data?.length / 10); i++) {
    pageNumber.push(i);
  }
  useEffect(() => {
    setStart((currentPage - 1) * 5);
    setEnd(currentPage * 5);
  }, [currentPage]);

  if (loading) {
    return <div>로딩중</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <div>
        {data?.slice(start, end).map((writing_no) => (
          <div key={writing_no?.title}>{writing_no?.author}</div>
        ))}
      </div>
      <nav style={{ listStyleType: "none", display: "flex" }}>
        {pageNumber.map((num) => (
          <li key={num} onClick={() => setCurrentPage(num)}>
            <button>{num}</button>
          </li>
        ))}
      </nav>
    </>
  );
};

export default PagiNation;
