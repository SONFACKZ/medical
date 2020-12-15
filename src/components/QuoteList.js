import React, {useState, useEffect, useContext} from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { QuoteContext} from "../contexts/QuoteContext";
import AddQuoteForm from "./AddQuoteForm";
import Pusher from "pusher-js";

export default function QuotesList () {
    const { quotes, setQuotes } = useContext(QuoteContext);
    const [editing, setEditing] = useState(0);
    const [edited, setEdited] = useState({
        speaker: "",
        quote: ""
    })

    const getQuotes = _ => {
        axiosWithAuth().get("users")
            .then(res => setQuotes(res.data))
            .catch(err => console.log(err))
    }

    useEffect( _ => {
        getQuotes();
        Pusher.logToConsole = true;
        var pusher = new Pusher('326bd157958340453bb2', {
            cluster: 'us2',
            forceTLS: true
        });
        var channel = pusher.subscribe('quotes');
        channel.bind('new-quote-data', function(data) {
            getQuotes()
            console.log(data)
        });
    }, [])

    const toggleEdit = quote => {
        if (editing !== quote.public_id) {
            setEdited(quote)
            setEditing(quote.public_id)
        } else {

            axiosWithAuth().put(`users/${quote.public_id}`, edited)
                .then(res => {
                    setQuotes([...quotes.filter(item => item.public_id !== quote.public_id), res.data])
                    setEditing(0);
                })
                .catch(err=> console.log(err))
            
        }
    }

    const handleChange = e => setEdited({...edited, [e.target.name]: e.target.value});


    const deleteQuote = public_id => {
        axiosWithAuth().delete(`users/${public_id}`)
            .then(res => setQuotes(quotes.filter(item => item.public_id !== public_id)))
            .catch(err => console.log(err));
    } 


    return(
        <div className="quotes-list">
            {quotes.sort((a,b) => a.public_id-b.public_id ).map(item => {
                return (
                
                
                    
                <div className="quote-card" key={item.public_id}>
                    {editing === item.public_id 
                    ?  <>
                        <input 
                            name="speaker"
                            value={edited.email}
                            onChange={handleChange} />
                        <input 
                            name="quote"
                            value={edited.fullname}
                            onChange={handleChange} />
                    </>
                    : <>
                        <h3>{item.email}</h3>
                        <p>{item.fullname}</p> 
                    </>}
                    <button onClick={_ => toggleEdit(item)}>{editing===item.public_id ? "Submit": "Edit Quote"} </button>
                    <button onClick={ _ => deleteQuote(item.public_id)}>Delete Quote</button>
                </div>
               
            )
            })}
            <AddQuoteForm />
        </div>

    )
}