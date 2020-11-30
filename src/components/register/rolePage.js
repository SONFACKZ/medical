import React, {useState} from 'react';

import {FormRole} from '../Form/formRole';


 const RolePage = ()=> {
    const [addRole, setAddRole] = useState('')


    const handleFormChange = (inputValue) => {
        setAddRole(inputValue)
    }

    const handleFormSubmit = () =>{
        fetch('/role/create', {
            method: 'POST',
            body: JSON.stringify({
                name: addRole
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
        .then(message => console.log(message))
    }
    return (
        <div>
            <FormRole userInput={addRole} onFormChange={handleFormChange} onFormSubmit = {handleFormSubmit} />
        </div>
    )
}

export default RolePage;