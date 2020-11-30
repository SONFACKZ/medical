import React from 'react';

export const ListUsers = ({ listOfUsers })=> {
    return(
        <div>
        {listOfUsers.map(initialData =>{
            return(

                <ul key={initialData.user_id}>
                <li>Public Id: {initialData.public_id}</li>
                <li>Name: {initialData.fullname}</li>
                <li>Occupation: {initialData.occupation}</li>
                <li>Residence: {initialData.residence}</li>
                </ul>
            )
        })}
        </div>
    )
}