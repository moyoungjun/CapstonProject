import React, { Component, useState, useEffect } from "react";
import '../../css/com.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



function Linkpage() {
    const nav = useNavigate();
    
    const logout = () =>{
      
        axios.get('/').then((response)=>{

          alert("로그아웃");

          nav('/');
        })
        axios.post('/').then((response)=>{
          
        })
    }
    return(
        <div className="linkbuttons">
        <button className="linkbutton link1"onClick={()=> window.open('https://instar.jj.ac.kr/','_blank')}>
        inStar
        </button>
        <button className="linkbutton link2"onClick={()=> window.open('https://cyber.jj.ac.kr/','_blank')}>
        사이버캠퍼스
        </button>
        <button className="linkbutton link3"onClick={()=> window.open('https://jj.ac.kr/','_blank')}>
        전주대학교
        </button>
        <Link to = "/my"> <button className="linkbutton link4"><a>내 정보</a></button></Link>
        <button className="linkbutton link5" onClick={logout}>로그아웃</button>
        </div>
        
);
};

export default Linkpage;