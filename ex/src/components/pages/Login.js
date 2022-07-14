
import '../../css/new.css';
import {Link} from 'react-router-dom';
import idIcon from './img/id.png';
import passwordIcon from './img/password.png';
import Axios from "axios";
import React,{useState, useEffect} from 'react';//eslint-disable-line no-unused-vars
import {useNavigate} from 'react-router-dom'
import background2 from "./img/background2.png"


function Login() {
    const [userID,setUserID] = useState("")
    const [userPwd,setUserPwd] = useState("")
  
    const [loginStatus,setLoginStatus]=useState("");

    const nav = useNavigate();
    
const login = (e) =>{
    e.preventDefault();
    Axios.post("/",{
        username:userID,
        password:userPwd,
    })
    .then((response)=>{

     
        if(response.data.message){         
            setLoginStatus(response.data.message);
            
            
        }
        else{
           
            setLoginStatus(response.data[0].user_id);
            console.log(response.data[0]);
            sessionStorage.setItem("userNum", response.data[0].user_no)
            nav('/main');
         

        }
       
    });
};
Axios.defaults.withCredentials = true;

    useEffect( ()=>{
    Axios.get("/").then((response)=>{
        console.log(response);
        console.log(response.data);
        if(response.data.LoggedIn === true)
        {  
            setLoginStatus(response.data.user[0].user_id)
        }
       else
       {
          console.log('aa');
       }
    });
    },[]);


        return(
        
            <div>
                <div  className='header' >
                <img className='background2' alt='background2' src={background2}></img>
                </div>
                {/* <img className='background' src='img/background.jpg'></img> */}
                    <div className='loginform'>
                       
                            <div className='idbox'>
                                <img className='idIcon' src={idIcon} alt='idIcon'/>
                                <input type='text'
                                onChange={(e)=>{
                                    setUserID(e.target.value);
                                }}
                                
                                name='id' id='id' placeholder='학번'></input>
                                </div>
                            <div className='passwordbox'>
                                <img className='passwordIcon' src={passwordIcon} alt='passwordIcon'/>
                                <input type='password' 
                                onChange={(e)=>{
                                    setUserPwd(e.target.value);
                                }}
                                
                                name='password' id='password' placeholder='비밀번호'></input>
                            </div>
                            <div className='joinbox'>
                        <button type='button' onClick={login} className='button btnpush loginbutton' value='로그인'> 로그인 </button>
                    </div>
                    <Link to='/join'><button type='button' className='button btnpush join'>회원가입</button></Link>
                    </div>
                    <h1>{loginStatus} </h1>
           </div>
        )
    }


export default Login;