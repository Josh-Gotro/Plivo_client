import React, { useState, useEffect } from 'react';
import './App.css';
import { useForm } from "react-hook-form";
import { ActionCableConsumer } from "react-actioncable-provider";
import History from "./Running";
import Search from "./Search";



function App() {
  const abortController = new AbortController();
  const { register, handleSubmit, errors } = useForm();
  const [history, setHistory] = useState([])
  const [showRunning, setShowRunning] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  // const url = 'http://localhost:8000';
  const url = "https://guarded-taiga-97709.herokuapp.com/"

  // As page loads, fetch data
  useEffect(() => {
    fetchData();
    return () => {
      abortController.abort();
    };
  }, []);

  // Fetch data and set to state
  const fetchData = async () => {
    try {
      const response = fetch(url + '/messages', { signal: abortController.signal });
      const data = await (await response).json();
      setHistory(data.reverse())
    } catch (e) {
      console.log(e);
    }
  };

  // post form data to db, optimistically render to page 
  const onSubmit = (data, r) => {
    console.log("data stringify", JSON.stringify({
      Text: data.content,
      From: "+15125185935",
      To: `+${data.phone}`,
      isoutgoing: true,
    }))
    console.log(Number(data.phone))
    fetch(url + '/send', {
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
      .then(data => {
        console.log("message succesfully sent", data)
        newUpdate(data)
      })
    r.target.reset();
  }

  // state update for optimistic render
  const newUpdate = (msg) => {
    setHistory((prev) => [msg, ...prev])
  }

  // toggle state boolean for running texts
  function toggleRunning() {
    setShowRunning(!showRunning)
  }

  // toggle state boolean for history
  function toggleHistory() {
    setShowHistory(!showHistory)
  }

  // current state boolean triggers modal 
  function showHide() {
    if (showRunning === true) {
      return "Modal-Open"
    } else {
      return "Modal"
    }
  }

  // recent texts appear only when modal is visible
  function recentHistory() {
    return history && history.map(msg => {
      return <><History key={msg.id} message={msg} /></>
    })
  }


  return (
    <>
      <ActionCableConsumer
        channel={{ channel: "MessagesChannel" }}
        onReceived={newUpdate}
      />
      <div className="HiContainer">
        <div className="HiTitle">
          <h1>send an<br />sms</h1>
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

            <button id="aButton" type="submit" value="Submit" >send</button>
          </form>
        </div>
        <div onClick={() => setShowRunning(!showRunning)} className={showHide()}>
          <div className="RecentHistory">
            {recentHistory()}
          </div>
        </div>
      </div>
      <button id="bButton" onClick={() => toggleRunning()}>
        Running Text
      </button><br />
      {showHistory ? <Search/> : null}
      <button id="cButton" onClick={() => toggleHistory()}>
        Search
      </button>
    </>
  );
}

export default App;