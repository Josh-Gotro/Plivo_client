import React from 'react';

const Running = (props) => {

    function runningChat(){
        console.log("recent individual message", props.message)
        if(props.message.isoutgoing === true){
            return <p className="Red">From: {props.message.From} <br /> Message: {props.message.Text}<br /></p>
        } else { 
            return <p className="Green">From: {props.message.From} <br /> Message: {props.message.Text}<br /></p>
        }
    }

    return (
            <div>
                {runningChat()}
            </div>
    );
}

export default Running;
