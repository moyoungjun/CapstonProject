import React,{useState, useEffect}  from "react";
// import Calendar from "../../components/Calendar";
import Header from "../../components/pages/Header";
import Search from "../../components/pages/Search";
import Footer from "../../components/pages/Footer";
import {Link, useNavigate} from "react-router-dom";
import Pagination from "react-js-pagination";
import {Table} from 'react-bootstrap';
import  Axios  from "axios";
import { FaQuestionCircle } from "react-icons/fa";
import '../../css/com.css';
import {useLocation} from 'react-router';
import Linkpage from "../../components/pages/Linkpage";


const Question = () => {
    const location = useLocation();
    const nav = useNavigate();

    
    const [boardContent,setBoardContent] = useState([]);
    useEffect(()=>{
        Axios.post("/question").then((response)=>{
            console.log(response.data);
            setBoardContent(response.data);
            
            
        });
    },[location]);

        const [page, setPage] = useState(1);
        const handlePageChange = (page) => {
            setPage(page);
        };
        return (

            <div>
        <div>
            <Linkpage/>
            <Search/>
            <Header/>

            <div>
            <Link to='/write'>
                <div className="wr-button">
            <FaQuestionCircle size={35} color="rgb(43, 95, 145)"/> </div> </Link>
            <Table className="list">
                <thead>
                    <tr className="list-head">
                    <th style = {{width:"22%"}}>글번호</th>
                    <th style = {{width:"38%"}}>제목</th>
                    <th style = {{width:"20%"}}>작성자</th>
                    <th style = {{width:"20%"}}>작성일</th>
                    </tr>
                </thead>
                <tbody>
                   { boardContent.map(element=>
                    <tr className="list-body" key={element.writing_no}>
                    <td key={element.writing_no}>{element.writing_no}</td>
                  
                   <td onClick = {
                       //()=>{history.push('/Read/'+element.writing_no)}
                       () => {
                        nav('/Read/'+element.writing_no,{
                            state:{
                                // data: location.state.data,
                                match: element.writing_no
                            }
                            
                        })
                       }
                       //() => {console.log('/Read/'+element.writing_no)}
                       }>{element.title}</td>
                  
                   
                   <td>{element.author}</td>
                   <td>{element.date}</td>
                   </tr>
                    ).reverse() }

                </tbody>

            </Table>
            </div>
            
            </div>        
            <Footer/>
        </div>
    );

};

export default Question;