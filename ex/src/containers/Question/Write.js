import React,{useState}  from "react";
import Header from "../../components/pages/Header";
import Search from "../../components/pages/Search";
import Footer from "../../components/pages/Footer";
import  Axios  from "axios";
import { useNavigate } from "react-router";
import "../../css/write.css";
import Linkpage from "../../components/pages/Linkpage";

const Write = () => {
    const nav = useNavigate();
    const [title, setTitle] = useState("");
    const [board,setBoard] = useState("");
    Axios.defaults.withCredentials = true;
    const Write_process =(e)=>{
        e.preventDefault();
        Axios.post("/write",{
            Sendtitle : title,
            Sendboard : board,
        }).then(            
            ()=>{     
                console.log("글"); 
            alert("글작성완료");
            nav('/question')
        });


    };

    return(

        <div>
            <Linkpage/>
            <Search/>
            <Header/>
            {/* <Calendar/> */}

            <div className="box1">
            <div className="select-box">
            <select>
            <option>종류를 선택해주세요</option>
            <option>계정</option>
            <option>구매/판매</option>
            <option>이용 제재</option>
            <option>거래 품목</option>
            </select>
            </div>
            <br/>
            <br/>
        <div>
        <input className="text-input" onChange={(e)=>{
                setTitle(e.target.value);
            }} placeholder="제목을 입력하세요"></input>
        </div>
            <br/>
            <br/>
        <div>
            <textarea className="text-area"
            onChange={(e)=>{setBoard(e.target.value);}}
             placeholder="내용을 입력하세요"></textarea>
        </div>
            <br/>
            <br/>
        
        <div>
            <button className="submit-button" onClick={()=>{nav('/question')}}>돌아가기</button>
            <button className="submit-button" onClick={Write_process}> 등록 </button>
        </div>
        </div>
        <Footer/>
        </div>
    );
};


export default Write;