import React, {Component} from 'react';
import '../../css/new.css'
import {Link} from 'react-router-dom';

class FindId extends Component{

    render() {
        return(
            <div className='header'>
                    <div className='loginform'>
                        <form onSubmit={this.Submit}>
                        <input type='text' name='id' id='id' placeholder='아이디 찾기 페이지'></input>
                        </form>
                        <Link to='/'><button type='button'>뒤로가기</button></Link>
                    </div>
            </div>
        )
    }
}

export default FindId;