// import React from 'react'
// // import { Jumbotron, Button } from 'reactstrap';
// // import { AuthContext } from '../App';
// import { Redirect } from 'react-router-dom';

// function CheckRole() {
//     // const {state} = useContext(AuthContext)
//     const token = localStorage.getItem('token')
//     const role_id = localStorage.getItem('role_id')
//     // const status = localStorage.getItem('status')
//     // const role_name= localStorage.getItem('role_name')

//     if(!token){
//         return <Redirect to="/login" />
//     }
//     else
//     {
//         if(role_id === 1){
//             return <Redirect to="/manager" />
//         }
//         else if(role_id === 2){
//             return <Redirect to="/doctor" />
//         }
//         else if(role_id === 3){
//             return <Redirect to="/patient" />
//         }
//     }
//     return (
//         <div>
//             {/* <Jumbotron>
//                 <h1 className="display-3">Hello, {state.user}!</h1>
//                 <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
//                 <hr className="my-2" />
//                 <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
//                 <p className="lead">
//                     <Button color="primary">Learn More</Button>
//                 </p>
//             </Jumbotron> */}
            
//         </div>
//     )
// }

// export default CheckRole