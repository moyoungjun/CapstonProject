import React, { Component,useState,useEffect } from "react";
import {Link} from 'react-router-dom';
import '../../css/com.css'
import  Axios  from "axios";
import { MdOutlineSearch } from "react-icons/md";


const Search = ({onChange}) => {
    const [searchText,setSearchText] = useState([]);

    const [info,setinfo] = useState([]);
    const handleChange = (e) => {
        setSearchText(e.target.value)
        
    }
    const click = (e)=>{
    
     
    }
    useEffect(()=>{
        Axios.post("/Search")
        .then((response)=>{
        setinfo(response.data);
        console.log(response.data[0]);
            
        })

    }, []);
    


    return (

        <div className="logo"> <Link to="/sale"><li>JJ MARKET</li></Link>
      
            <div className="searchwindow">
            <form className="search">
                <label htmlFor="header-search">
                    <span className="visually-hidden"></span>
                </label>
                <input
                    type="text"
                    placeholder="찾는 제품을 검색해보세요!"
                    className="search_bar"
                    name="searchText"
                    id="header-search" onChange={handleChange}/>
                    
                    {/*info.map(element=>
                        <div>
                            <tr key = {element.salenum}></tr>
                            {element.saletitle}
                            </div>

                    )*/}

                    {/* <button className="submitButton" type='submit' 
                    onClick={click}
                    > <MdOutlineSearch size={30} color="rgb(43, 95, 145)"/> </button>
                 */}
            
            </form>
            
        </div>
        
        </div>
    );
};


export default Search;