import React, { Component } from 'react';

class create extends Component{

    render(){
        return(
            <article>
                 <h2>Create Contents </h2>
                 <form action="/creste_process" method="post">
                     <p><input type="text" name = "title" placeholder="title"></input></p>
                    <p><textarea name="desc" placeholder="description"></textarea></p>
                 </form>
            </article>
        );
    }
}
export default create;
