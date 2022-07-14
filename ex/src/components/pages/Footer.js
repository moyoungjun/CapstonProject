import React from "react";
// import jju from '../../img/jju.png';
import jju from '../../img/jjFooterLogo.jpg';
import '../../css/footer.css';

const Footer = (props) => {
    return (
        <div className="foot">

            <div className="foot-title">
                <img src={jju} className = "foot-logo"alt='jju'/>
                JJ MARKET
            </div>
            <div className="footer">
                <div className="footer-member">
                    MEMBER : 모영준ㅣ박태환ㅣ홍석주ㅣ김세희ㅣ김다은
                </div>
            </div> 
            <div>&#60;Copyright 2022 . MoTeam . All rights reserved.&#62;</div>
            <div className="link-jj">
                <button onClick={()=> window.open('https://instar.jj.ac.kr/','_blank')}>inStarㅣ</button>
                <button onClick={()=> window.open('https://cyber.jj.ac.kr/','_blank')}>사이버캠퍼스ㅣ</button>
                <button onClick={()=> window.open('https://jj.ac.kr/','_blank')}>  전주대학교</button>
            </div>    
        </div>
    );
};

export default Footer;