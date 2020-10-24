import React from 'react';
import './App.css';
import { useForm } from "react-hook-form";


function App() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data, r) => {
    console.log(Number(data.phone))
    fetch(`http://localhost:8000/messages`, {
    // fetch(`https://guarded-taiga-97709.herokuapp.com/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        content: data.content,
        yourphone: "+15125185935",
        myphone: `+${data.phone}`,
        isoutgoing: true,
      })
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
      })
    // r.target.reset();
  }

  return (
    <div id="hello" className="HiContainer">
      <div className="HiTitle">
        <h1 style={{ color: "rgb(212, 175, 55)" }}>send a <br />text</h1>
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
      </div>
    </div>
  );
}

export default App;
