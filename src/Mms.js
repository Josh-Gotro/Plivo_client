import React, { useState, useEffect } from 'react';
import './App.css';
import { useForm } from "react-hook-form";

function Mms() {
    const { register, handleSubmit, errors } = useForm();
    const url = "https://guarded-taiga-97709.herokuapp.com"


    const onSubmit = (data, r) => {
        console.log(Number(data.phone))
        fetch(url + '/sendmms', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                Text: data.content,
                From: "+15125822277",
                To: `+${data.phone}`,
                MediaURL: `${data.gif}`,
                isoutgoing: true,
            })
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
            })
        r.target.reset();
    }


    return (
        <div className="HiContainer">
            <div className="HiTitle">
                <h1>send an<br />mms</h1>
            </div>

            {/* Send-SMS Form */}
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

                    <textarea
                        name="gif"
                        placeholder="GIF URL"
                        id="gif"
                        ref={
                            register({
                                required: true
                            })
                        }
                    /><br />
                    {errors.content && "Please enter a URL"}<br />

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
        </div>
    );
}

export default Mms;