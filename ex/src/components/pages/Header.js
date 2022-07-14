
import "../../css/com.css";
import {Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Axios from "axios";
import {FaBars} from "react-icons/fa";

function Header() {
  const [loginStatus, setLoginStatus]= useState("");
  Axios.defaults.withCredentials = true;

  
  useEffect( ()=>{
      Axios.get("/").then((response)=>{
  
          if(response.data.LoggedIn === true)
          {  
              setLoginStatus(response.data.user[0].user_name)
          }
         else
         {
          
         }
      });
      },[]);

  return (
    
    <body>
    
      <div class="dropmenu">
      <ul>
      <li><a href="#" id="current"><FaBars/> </a>
      <ul>
      <Link to="/sale"><li><a href="#">판매/구매</a></li></Link>
      <li><a href="/chat">쪽지</a></li>
      
      <Link to="/question"><li><a href="#">문의하기</a></li></Link>
      </ul>
      </li>
      </ul>
      </div>
    </body>
  );
};

export default Header;

