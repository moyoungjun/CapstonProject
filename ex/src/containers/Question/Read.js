import React,{useState,useEffect}  from "react";
import Header from "../../components/pages/Header";
import Search from "../../components/pages/Search";
import Footer from "../../components/pages/Footer";
import Logo from "../../components/pages/Logo";
import "../../css/Read.css";
import  Axios  from "axios";
import { useNavigate } from "react-router";
import {useLocation} from 'react-router';
import Modal from './Modal'; // 추가 된 부분
import { keys } from "@mui/system";
import Linkpage from "../../components/pages/Linkpage";

const Read = () => {
    const nav = useNavigate();
    const location = useLocation();

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

    const [title, setTitle] = useState("");
    const [board,setBoard] = useState("");
    const [Author,setAuthor] = useState("");
    const [comment, setComment] = useState('');
    
    const [commentView, setCommentView] = useState([]);
    const [commentNum, setCommentNum] = useState([]);
    const [userName, setUserName] = useState([]);

    const [userNum, setUserNum] = useState(sessionStorage.getItem("userNum"));
    const onChange = event => setComment(event.target.value);
    const [commentArray, setCommentArray] = useState([]);
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
        console.log(num);
        Axios.post( url, {
            userNum: userNum,
            comment: msg,
            writingNum: location.state.match,
            commentNum: num
        }).then(res => {
            console.log("성공");

        }).catch(e => {
            console.log("에러 : " + e);
        })
        nav('/Read/'+location.state.match,{
            state:{
                data: userNum,
                match: location.state.match
            }
        });
        window.location.reload();
    }

   useEffect(()=>{
    //    console.log(sessionStorage.getItem('userNum'));
        Axios.post("/Read",{
            Sendtitle: location.state.match
        }).then((response)=>{
            console.log(response);
            setUserNum(sessionStorage.getItem('userNum'));
            setTitle(response.data[0].title);
            setBoard(response.data[0].board);
            setAuthor(response.data[0].author);

            for(let i=0; i < response.data.length; i++){
                setCommentView(commentView => [...commentView, response.data[i].comment]);
                setUserName(userName => [...userName, response.data[i].user_name]);
                setCommentNum(commentNum => [...commentNum, response.data[i].comment_no])
            }
            
        })
   },[location]);

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
   const myComment = () => {
        let array = [];

        for(let i=0; i < commentView.length; i++){
            const myComment = commentNum[i];
            array.push(
                <div className="comment-window">
                    <div className="comment-user-name">
                        { userName[i] }
                    </div>
                    <div className="comment-context">
                        <div style={{float: "left"}}>
                            { commentView[i] }   
                        </div>
                        <div 
                        key={myComment}
                        className="comment-btns"
                        onClick={() => {
                            let msg = "삭제된 메세지입니다.";
                            let url = '/mydel';
                            mySend(url, msg, myComment);
                        }}>
                            삭제
                        </div>
                        <div 
                        className="comment-btns"
                        onClick={() => {
                            openModal();
                            setModalNum(myComment);
                        }}>
                            수정
                        </div>
                    </div>
                </div>
            )
        }
        return array;
   }

    return(
        <div>
            <Linkpage/>
            <Search/>
            <Header/>        
            <Modal open={modalOpen} close={closeModal} commentKey={myComment} header="Modal heading">
                            
                            {commentForm('/myup', modalNum)}
                        </Modal>
            <div className="readform">
            <input value={title} readOnly className="readtitle"></input><br></br>
            <input value={Author} readOnly className="readwriter"></input>
            <br></br>
            <br></br>
            {/* <button className="submit" onClick={()=>{nav('/question',{
                state:{
                    data: userNum
                }
            })}}>목록</button> */}
            <p></p>
            <textarea rows= {8} value={board} readOnly className="readpost"></textarea>
            <br></br>
            <br></br>
            <button className="submit" onClick={()=>{nav('/question',{
                state:{
                    data: userNum
                }
            })}}>목록</button>
          </div>
            <div className="reply">
                {myComment()}
            </div>
            {commentForm('/mycomment', 0)}
            <Footer/>
          </div>
        
    );
};

export default Read;