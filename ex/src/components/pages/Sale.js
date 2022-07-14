import React, { Component,useState,useEffect } from "react";
import '../../css/com.css';
import Header from "./Header";
import Search from "./Search";
import Footer from "./Footer";
import SaleInfo from "./SaleInfo";
import {Link} from "react-router-dom";
import img from "./img/id.png"
import  Axios  from "axios";
import { useNavigate } from "react-router";
import {useLocation} from 'react-router';
import { MdFileUpload } from "react-icons/md";
import Linkpage from "./Linkpage";


const Sale =({history})=> {
    const nav = useNavigate();
    const location = useLocation();
    const [content,setcontent] = useState([]);

    useEffect(()=>{
      Axios.post("/sale")
      .then((response)=>{
        
        setcontent(response.data);
      })
    },[])



    return (
      
      <div>
        <Linkpage/>
        <Search/>
        <div className="sellbutton">
          <Link to='/salereg'>
            <MdFileUpload size={40} color="rgb(43, 95, 145)"/>
          </Link>
        </div>
        <Header/>
        
      
        <div className="grid">

         { content.map(element=>
            <div className="grid-item">
            <tr key = {element.salenum}>
              <div className="saleProduct">
              <tr onClick = {()=>nav('/saleinfo/'+element.salenum, {
                state:{
                  name: element.salenum
                }
              })}><img src={"http://202.31.243.19:80"+element.image}></img></tr>
              </div>
              
                  <div  className="sale-title">
                  <tr>
                  <p>{element.saletitle}</p>
                  </tr>
                  </div>
                  <div className="sale-price">
                    <p className="price">{element.saleprice}원</p><br></br>
                    <p className="regDt">{element.regDt}</p><br></br>
                    <p className="sale-writer">작성자 : {element.user_id}</p>
                    </div>
                  </tr>
                  </div>
            ).reverse()
          } 
        
        </div>
        
        <Footer/>
      </div>
      
    );
  
};

export default Sale;