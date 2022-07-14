import React from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import "./css/All.css";

import Question from "./containers/Question/Question";
import Notice from "./containers/Notice";
import Login from './components/pages/Login';
import Main from './components/pages/Main';
import Sale from './components/pages/Sale';
import SaleInfo from './components/pages/SaleInfo';
import Join from './components/pages/Join';
import FindId from './components/pages/FindId';
import FindPw from './components/pages/FindPw';
import Header from "./components/pages/Header";
import Search from "./components/pages/Search";
import Footer from "./components/pages/Footer";
import Write from "./containers/Question/Write";
import Read from "./containers/Question/Read";
import SearchResult from './components/pages/SearchResult';
import SaleReg from './components/pages/SaleReg';
import Chat from './components/pages/Chat';
import My from "./components/pages/my";

//class Routess extends React.Component {
 const Routess = () => {
    return (
      <>
        <Routes>
          <Route  path='/' element={<Login/>} />
          
          <Route  path='/join' element={<Join/>} />

          <Route  path='/main' element={<Main/>} />
        
          <Route  path='/findId' element={<FindId/>} />
          <Route  path='/findPw' element={<FindPw/>} />
          
          <Route  path='/Header' element={<Header/>} />
          <Route  path='/Search' element={<Search/>} />
          <Route  path='/Footer' element={<Footer/>} />
         
          <Route  path='/sale' element={<Sale/>}/>
          <Route  path='/salereg' element={<SaleReg/>}/>
          <Route  path='/question' element={<Question/>}/>
          <Route  path='/notice' element={<Notice/>}/>
          <Route  path='/write' element={<Write/>} />
          <Route exact path='/Chat' element={<Chat/>}/>
          <Route  path='/Read/:name' element={<Read/>} />
          <Route  path='/searchresult' element={<SearchResult/>}/>
          <Route  path='/saleReg' element={<SaleReg/>}/>
          <Route  path='/SaleInfo/:name' element={<SaleInfo/>}/>
          <Route  path='/my' element={<My/>}/>
        </Routes>
    </>
      
  )
  
}

export default Routess;