import React, {useEffect, useState} from 'react';

import { ListUsers } from './List/listUsers';

export const AllUsers = ()=>{
  const [initialData, setInitialData] = useState([{}]);
useEffect(() => {
  fetch('/user').then(response => {
    if(response.ok){
      return response.json()
    }
  }).then(data => setInitialData(data))
}, [])

return(
  <div>
  <ListUsers listOfUsers={initialData} />
  </div>
)
}