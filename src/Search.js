import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Running from "./Running"


const Search = () => {
    const { register, handleSubmit } = useForm();
    const [results, setResults] = useState([])
    const url = 'http://localhost:8000';

    //translate date for plivo api
    function cnvrt(date) {
        return date.replace("T", " ")
    }

    // post form data to db, optimistically render to page 
    const onSubmit = (data, r) => {
        fetch(url + `/smslog?gte=${cnvrt(data.begin)}&lte=${cnvrt(data.end)}`)
            .then(resp => resp.json())
            .then(data => {
                setResults(data)
                console.log(data, results)
            })
        // r.target.reset();
    }

    // recent texts appear only when modal is visible
    function searchHistory() {
        return results && results.map(msg => {
            return <><Running key={Math.random()} message={msg} /></>
        })
    }

    return (
        <>
            <div className="Search">
                <div className="h2Form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>Begin  <input name="begin" type="datetime-local" ref={register({ required: true })} /></div>
                        <div>End  <input name="end" type="datetime-local" ref={register({ required: true })} /></div>
                        <button id="aButton" type="submit" value="Submit">Search</button>
                    </form>
                </div>
                <div className="H2Title"><h2>select <br />range</h2></div>
            </div>
            <div >
                {searchHistory()}
            </div>
        </>
    );
}

export default Search;
