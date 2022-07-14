import '../../css/new.css'
import {Link, useNavigate} from 'react-router-dom';
import Axios from "axios";
import React,{useState, useEffect} from 'react';//eslint-disable-line no-unused-vars
import background2 from "./img/background2.png"
import { Nav } from 'react-bootstrap';

const Join = () => {

    const nav = useNavigate();
    const [userIDReg,setUserID] = useState("")

    const [userPwdReg,setUserPwd] = useState("")
    const [userPwdReg2,setUserPwd2] = useState("")
    const [consumername,setConsumerNmae] = useState("")
    const [phonenumber,setPhoneNumber] = useState("")

   /*const [idconfirm,setIdConfirm]=useState("");*/
    const [pwconfirm,setPwConfirm]=useState("");
    const [valueconfirm,setValueConfirm]=useState("");
    const submitSignup=(e)=>{
        e.preventDefault();
        Axios.post("/join",{
            username:userIDReg,
            password:userPwdReg,
            password2: userPwdReg2,
            consumername : consumername,
            phone:phonenumber,
            

        }).then((response)=>{  

        if(  response.data.msg ){
            
            
            setValueConfirm(response.data.msg);
            /*if((response.data.message || response.data.msg)===null){
                setPwConfirm(" ");
                setValueConfirm(" ");
            }*/
        }
        else if(response.data.message){
            setPwConfirm(response.data.message);
            setValueConfirm(" ");

        }


        else if(response.data.true){
            setPwConfirm(" ");
            setValueConfirm(" ");
            alert("회원가입 완료");
            nav('/');
        
        
        }

        
        });
    };



        return(
            <div className='Join'>
                <img className='background2' alt='background2' src={background2}></img>
                    <div className='singupform'>
                        <div className='h1text'></div>
                        <input type='text' 
                            onChange={(e)=>{
                                setUserID(e.target.value);
                            }}
                         placeholder='학번'></input>

                        <input type='password' 
                          onChange={(e)=>{
                            setUserPwd(e.target.value);
                        }}
                        placeholder=' 비밀번호 '></input>
                        <input type='password' 
                          onChange={(e)=>{
                            setUserPwd2(e.target.value);
                        }}
                        placeholder=' 비밀번호 확인 '></input>
                        <input type='text' 
                          onChange={(e)=>{
                            setConsumerNmae(e.target.value);
                        }}
                        placeholder=' 이름 '></input>
                      
                        <input type='text' 
                          onChange={(e)=>{
                            setPhoneNumber(e.target.value);
                        }}
                        placeholder=' 전화번호 '></input>
		
                        <div>
                        <button className='button subbutton btnpush'onClick={submitSignup}> 회원가입 </button>
                        <Link to='/'><button className='button backbutton btnpush'>뒤로가기</button></Link>
                        </div>
                    </div>
                    
                    <h1>{pwconfirm} {valueconfirm}</h1>
            </div>
        )
    }


export default Join;