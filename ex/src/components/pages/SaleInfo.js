import React,{ useState,useEffect } from "react";
import '../../css/saleInfo.css'
import Search from "./Search";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router";
import {useLocation} from "react-router-dom"
import Linkpage from "./Linkpage";
import Modal from '../../containers/Question/Modal'; // 추가 된 부분
import displayCreatedAt from "./displayCreatedAt";
import 'moment-timezone';


function SaleInfo() {
    const nav = useNavigate();
    const location = useLocation();
    const moment = require('moment');
    const [saletitle,setsaletitle] = useState("");
    const [saletextarea,setsaletextarea] = useState("");
    const [saleprice,setsaleprice] = useState("");
    const [regDt,setsaleregDt] = useState("");
    const [img,setimg] = useState("");
    const url1 ="http://202.31.243.19:80";
    const [data,setdata] = useState("");
    // 모달
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const [modalNum, setModalNum] = useState('');
    // 모달


    const [comment, setComment] = useState('');
    const [commentView, setCommentView] = useState([]);
    const [commentNum, setCommentNum] = useState([]);
    const [userName, setUserName] = useState([]);
    const [userNum, setUserNum] = useState(sessionStorage.getItem("userNum"));
    const onChange = (event) => {setComment(event.target.value);}
    const [commentArray, setCommentArray] = useState([]);

    const [myComment, setMyComment] = useState([]);

    const onSubmit = event => {
        event.preventDefault();
        if (comment === '') {
            return;
        }
        setCommentArray(commentValueList => [comment, ...commentValueList]);
        setComment('');
    }; 

    // url : API 경로
    // msg : 댓글
    // axios를 이용해서 API와 연동
    const mySend = (url, msg, num) => {
        const commentNo = location.state.name +"_"+num;
        Axios.post( url, {
            userNum: userNum,
            comment: msg,
            saleNum: location.state.name ,
            commentNum: commentNo
        }).then(res => {
            console.log("성공");

        }).catch(e => {
            console.log("에러 : " + e);
        })
        nav('/saleinfo/'+location.state.name,{
            state:{
                data: userNum,
                name: location.state.name
            }
        });
        window.location.reload();
    }
    
    
    useEffect(()=>{
        console.log(location.state.name);
        Axios.post("/saleinfo",{
            Sendsaletitle: location.state.name 
        }).then((response)=>{
            setUserNum(sessionStorage.getItem('userNum'));
            setsaletitle(response.data.saletitle);
            setsaletextarea(response.data.saletextarea);
            setsaleprice(response.data.saleprice);
            setsaleregDt(response.data.regDt);
            setimg(response.data.image);
           

        //    for(let i=0; i < response.data.length; i++){
        //         setCommentView(commentView => [...commentView, response.data[i].comment]);
        //         setUserName(userName => [...userName, response.data[i].user_name]);
        //         setCommentNum(commentNum => [...commentNum, response.data[i].salecomment_no])
        //     }
        })

        Axios.get('/salecomment/'+location.state.name)
        .then( res => {
            setMyComment(res.data);
            console.log(myComment);
        });

   }, [location])

    // 댓글 작성 폼 함수로 변경
    // url 파라미터를 통해서 url 경로 전달
    const commentForm = (url, num) => {
        return (
        <div className="commentContainer" onSubmit={onSubmit}> 
        <form className="commentWrap">
            <input className="textarea" 
                type="textarea"
                placeholder="댓글을 작성해주세요"
                value={comment}
                onChange={onChange}
            />
            <button className="commetBtn" onClick={() => {
                mySend(url, comment, num);
            }}>작성</button>
        </form>
        </div>
        )
    }

    // 댓글 창
   const salecomment = () => {
        let array = [];

        for(let i=0; i < myComment.length; i++){
            array.push(
                <div key={i} className="comment-window">
                    <div className="comment-user-name">
                        { userName[i] }
                    </div>
                    <div className="comment-context">
                        <div style={{float: "left"}}>
                            { myComment[i].comment }   
                        </div>
                        <div 
                        key={salecomment}
                        className="comment-btns"
                        onClick={() => {
                            let msg = "삭제된 메세지입니다.";
                            let url = '/saleup';
                            mySend(url, msg, i+1);
                        }}>
                            삭제
                        </div>
                        <div 
                        className="comment-btns"
                        onClick={() => {
                            openModal();
                            setModalNum(i+1);
                        }}>
                            수정
                        </div>
                    </div>
                </div>
            )
        }
        return array;
    }

    return (
      
      <div>
        <Linkpage/>
        <Search/>
        <Header/>
        <Modal open={modalOpen} close={closeModal} commentKey={salecomment} header="Modal heading">
                             
                        {commentForm('/saleup', modalNum)}
                        </Modal>
        <div className="main">
            <div className="img-set">
            <img src={url1+img}></img>
            
            </div>

            <div className="saleInfo">
                <div className="saletitle">
                    <input value={saletitle}></input>
                </div>
                <div className="price">
                <input value={saleprice}></input>
                <p>원</p> 
                </div><hr/>
                <div className="regDt"><input value={regDt}></input> </div>
                <br/>
                <div className="info">
                <textarea  className="info" rows = {9} value={saletextarea}></textarea>
                </div>
                
                {/* <div className="btn-set">
                        <button type="button">찜</button>
                        <button type="button" className="a">연락하기</button>
                        <button type="button" className="b">바로구매</button>
                        
                </div> */}
            
            </div>
        </div>
            <Link to="/sale">
                <button className="backBtn"> 돌아가기 </button>
            </Link>
            <h4 className="title">댓글</h4>
            <div className="reply">
                {salecomment()}
            </div>
            {commentForm('/salecomment', myComment.length +1)}
        <Footer/>
      </div>
      
    );
  
};

export default SaleInfo;