import React from 'react';
import SingleTweet from './SingleTweet';

class Comment extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            tweets: [
                {
                    
                }
                
            ]
        }
        this.addTweet = this.addTweet.bind(this);
    }
    addTweet(){
        let value = document.querySelector('#new-tweet-content').value;
        this.setState({tweets: [...this.state.tweets, {
            uuid: this.state.tweets.length + 1,
            writer : "운영자",
            date: new Date(). toISOString().slice(0,10),
            content: value
        }]})
    }
    render() {
        return(
            <div id='root' className='comment-box'>
                <div>
                    <div className='comment-box1'> 작성자 : 운영자 </div>
                    <div id='writing-area' className='comment-box'>
                        <textarea id='new-tweet-content' className='comment-text'></textarea>
                        <br/>
                        <button id='submit-new-tweet' className='comment-box' onClick={this.addTweet}> 새 글 쓰기</button>
                    </div>
                    <ul id='tweets' className='comment-box2'>
                        {
                            this.state.tweets.map(tweet => {
                                return <SingleTweet key={tweet.uuid} tweet={tweet}/>
                                
                            }) 
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Comment;