import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Running from "./Running"


const Search = () => {
    const { register, handleSubmit } = useForm();
    const [results, setResults] = useState([])
    // const url = 'http://localhost:8000';
    const url = 'https://guarded-taiga-97709.herokuapp.com'

    //translate date for plivo api
    function cnvrt(date) {
        let newDate = new Date(date).toISOString();
        return newDate.replace("T", " ").replace(".000Z", "")
    }

    // post form data to db, optimistically render to page 
    const onSubmit = (data, r) => {
        fetch(url + `/smslog?gte=${cnvrt(data.begin)}&lte=${cnvrt(data.end)}`)
            .then(resp => resp.json())
            .then(data => {
                setResults(data)
                // console.log(data)
            })
        // r.target.reset();
    }

    // recent texts appear only when modal is visible
    function searchHistory() {
        console.log(results)
        return results && results.map(msg => {
            return <><Running key={Math.random()} message={msg} /></>
        })
    }

    return (
        <>
            <div className="Search">
                <div className="h2Form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        Begin  <br /><input name="begin" type="datetime-local" ref={register({ required: true })} /><br /><br />
                        End <br /> <input name="end" type="datetime-local" ref={register({ required: true })} /><br/>
                        <button id="aButton" type="submit" value="Submit">Search</button>
                    </form>
                </div>
                <div className="H2Title"><h1>select <br />range</h1></div>
            </div>
            <div >
                {searchHistory()}
            </div>
        </>
    );
}

export default Search;
