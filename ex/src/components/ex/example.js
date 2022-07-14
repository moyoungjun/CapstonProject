import React, {Component} from 'react';

class example extends Component{
    render(){
        console.log('log 기록');
        return(
            <ul>
    <li><a href="/create" onClick={function(e){this.props.onChangeMode('create').bind(this);}}>create</a></li>
    <li> <a href="/update">update</a></li>
    <li> <input type="button" value="delete"></input></li>
</ul>

            
        );
    }
}

export default example;

