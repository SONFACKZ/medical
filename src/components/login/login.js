import React, { useState }from 'react';
import axios from 'axios';
import loginImg from "../../login.svg";

// class Login extends React.Component {
//     constructor(props) {
//         super(props)
//         let loggedIn = false
//         this.state = {
//             email: '',
//             password: '',
//             loggedIn
//         }

//         this.onChange = this.onChange.bind(this)
//         this.submitForm = this.submitForm.bind(this) 
//     }

//     onChange(e){
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//     }

//     submitForm(e){
//         e.prevenDefault()
//         const { email, password } = this.state
//         // login magic 

//         // axios.post('/login', data)
//         // .then(res => {
//         //     console.log(res)
//         //     // console.log(data)
//         // })
//         // .catch(err => {
//         //     console.log(err)
//         // })
//     };

function Login(props) {
    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // handle button click of login form
    const handleLogin = () => {
        props.history.push('/admin');
  }

        return (
            <div className="base-container">
                <br />
                <div className="header">Login</div>
                <div className="content border shadow p-5 mx-auto">
                    <div className="image">
                        <img alt = "another test" src={loginImg} />
                    </div><br />
                <form>
                    <div>
                        <label>Email</label>
                        <input class="form-control" type="email" {...email}
                        name="email" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input class="form-control" type="password" {...password}
                        name="password" />
                    </div>
                    {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                        <div>
                            <input type = "submit" class = "form-control btn btn-info" value = {loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} />
                        </div>
                </form>
                </div>
            </div>
        );
    }

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
       
    const handleChange = e => {
        setValue(e.target.value);
        }
        return {
            value,
            onChange: handleChange
          }
        }

export default Login;