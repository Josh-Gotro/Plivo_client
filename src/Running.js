import React from 'react';

const Running = (props) => {
// Style and position message based on origin of sender. 
    function runningChat(){
        if(props.message.isoutgoing === true){
            return <p className="Sender">From: {props.message.From} <br /> Message: {props.message.Text}<br /></p>
        } else { 
            return <p className="Receiver">From: {props.message.From} <br /> Message: {props.message.Text}<br /></p>
        }
    }

    return (
            <div>
                {runningChat()}
            </div>
    );
}

export default Running;
