import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Running from "./Running"


const Search = () => {
    const { register, handleSubmit } = useForm();
    const [results, setResults] = useState([])
    // const url = 'http://localhost:8000';
    const url = 'https://guarded-taiga-97709.herokuapp.com'

    //Convert local date to UTC. Modify output to match Plivo requirements.
    function cnvrt(date) {
        let newDate = new Date(date).toISOString();
        return newDate.replace("T", " ").replace(".000Z", "")
    }

    // Pass params to Rails. Rails sends req to Plivo. Results saved to state. 
    const onSubmit = (data, r) => {
        fetch(url + `/smslog?gte=${cnvrt(data.begin)}&lte=${cnvrt(data.end)}`)
            .then(resp => resp.json())
            .then(data => {
                setResults(data)
            })
        r.target.reset();
    }

    // Show messages held in state. visible if modal is open. 
    function searchHistory() {
        return results && results.map(msg => {
            if(msg !== null){ 
                return <><Running key={msg.MessageUUID} message={msg} /></>
            }
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
