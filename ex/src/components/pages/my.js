import '../../css/my.css'
import Axios from "axios";
import React,{useState, useEffect} from 'react';//eslint-disable-line no-unused-vars
import Linkpage from './Linkpage';
import Search from './Search';
import Header from './Header';
import Footer from './Footer';
import defaultImg from './img/defaultImg.png'

const my=()=>{
    const [userID,setUserID] = useState("")
    const [username,setUername] = useState("")
    const [userphone,setPone] = useState("")
    const [saletitle,setsaletitle] = useState("")
    const [img,setimg] = useState("")
    useEffect( ()=>{
        Axios.get("/my").then((req,response)=>{
           console.log(req);
           console.log(req.session)
            const data = req.data;
            console.log(response);

            if(req.data)
            {  
                setUserID(data.user_id)
                setUername(data.user_name)
                setPone(data.user_phone)

                setsaletitle(data.saletitle)

               
                setimg(data.image)
                
            }
           else
           {
              console.log('aa');
           }

        });
        },[]);
  
        return(
            <div>
                 <Linkpage/>
                <Search/>
                <Header/>
            
            <div className='userinfo'>
                <img src={defaultImg} alt="defaultImg"></img>
                <div className='userInfos'>
                    <p> 내 아이디 </p>{userID}<br></br>
                    <p> 내 이름 </p>{username}<br></br>
                    <p> 내 핸드폰번호 </p>{userphone}<br></br>
                    <p> 판매 중 </p> {saletitle}
                    <p>
                    <img src={"http://202.31.243.19:80"+img}></img>
                    </p>
               </div>
            </div>
            <Footer/>
            </div>
        )
    
}

export default my;