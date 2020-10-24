import React, { useState, useEffect } from 'react';
import './App.css';
import { useForm } from "react-hook-form";
import { ActionCable } from "react-actioncable-provider";



function App() {
  const abortController = new AbortController();
  const { register, handleSubmit, errors } = useForm();
  const [history, setHistory] = useState([])
  const url = 'http://localhost:8000';
  
  const fetchData = async () => {
    try {
      const response = fetch(url + '/messages', { signal: abortController.signal });
      const data = await (await response).json();
      // console.log(data)
      setHistory(data)
    } catch (e) {
      console.log(e);
    }
  };
  
  const onSubmit = (data, r) => {
    console.log(Number(data.phone))
    fetchData();
    fetch(url + '/send', {
      // fetch(`https://guarded-taiga-97709.herokuapp.com/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Text: data.content,
          From: "+15125185935",
          To: `+${data.phone}`,
          isoutgoing: true,
        })
      })
      .then(resp => resp.json())
      // .then(data => {
      //   console.log(data)
      // })
      // r.target.reset();
    }
    
    useEffect(() => {
      fetchData();
      return () => {
        abortController.abort();
      };
    }, [url + '/messages']);

    function showHistory(){
      console.log(history)
    }

  return (
    <>
      <div id="hello" className="HiContainer">
        <div className="HiTitle">
          <h1 style={{ color: "rgb(212, 175, 55)" }}>send an<br />sms</h1>
        </div>
        <div className="HiForm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              name="content"
              placeholder="your message"
              id="comment"
              ref={
                register({
                  required: true
                })
              }
            /><br />
            {errors.content && "Please include a message"}<br />

            <input
              name="phone"
              placeholder="recipient's phone number"
              type="tel"
              id="phone"
              ref={
                register({
                  required: "Please enter the phone number where you would like to send this message",
                  maxLength: {
                    value: 20,
                    message: "Please enter a valid phone number"
                  }
                })
              }
            /><br />
            {errors.phone && errors.phone.message}<br />

            <button id="hiButton" type="submit" value="Submit" >send</button>
          </form>
            <button id="hiButton" onClick={() => showHistory()}>
              Text History
            </button>
        </div>
      </div>

    </>
  );
}

export default App;