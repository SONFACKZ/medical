import React from 'react';

export const FormRole = ({ userInput, onFormChange, onFormSubmit })=>{
    const handleChange = (event) => {
        onFormChange(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" required value={userInput} onChange={handleChange} />
                <input type="submit" />
            </form>
        </div>
    )
}