import React, {Component, useEffect} from 'react';
import '../../css/main2.css'
import Main1 from './img/main1.png';
import Main2 from './img/main2.png';
import Main3 from './img/main3.png';
import { useLocation } from 'react-router';
import MAIN from './img/MAIN.png';
import $ from 'jquery';
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";


//class Main extends Component{

const Main = () => {
        const location = useLocation();
        const nav = useNavigate();

        useEffect(() => {

            Axios.get("/").then((response)=>{
               
        
                if(response.data.LoggedIn === false)
                {  
                    nav('/');
                    alert("로그인을 해주세요");
                }
               else
               {    console.log(response.data)
                    alert("로그인 성공");
               }
            });
        }, [location]);

        return(
            <div>
           
            <div className='mainimg'>
            <p className='blink' > CLICK THE SCREEN! </p> 
                <Link to='/sale'><img className='mainpng' alt='MAIN' src={MAIN}></img> </Link>
                
            </div> 
            </div>
               
        
        )
}

export default Main;