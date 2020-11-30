import React, {useState} from 'react';
import loginImg from "../../login.svg";
// import {FormPatient} from '../Form/formPatient';

// const RegisterPatientPage = ()=> {
//     const [addPatient, setAddPatient] = useState('')


//     const handleFormChange = (inputValue) => {
//         setAddPatient(inputValue)
//     }

//     const handleFormSubmit = () =>{
//         fetch('/register/patient', {
//             method: 'POST',
//             body: JSON.stringify({
//                 name: addPatient
//             }),
//             headers: {
//                 "Content-type": "application/json; charset=UTF-8"
//             }
//         }).then(response => response.json())
//         .then(message => console.log(message))
//     }
//     return (
//         <div>
//             <FormPatient userInput={addPatient} onFormChange={handleFormChange} onFormSubmit = {handleFormSubmit} />
//         </div>
//     )
// }

// export default RegisterPatientPage;


const initialState = {
            fullname: '',
            email: '',
            residence: '',
            sex: '',
            contact_phone: '',
            blood_group: '',
            occupation: '',
            date_birth: '',
            password: '',
            person_to_contact_phone: '',
            person_to_contact_name: '',
            fullnameError: '',
            emailError: '',
            residenceError: '',
            sexError: '',
            contact_phoneError: '',
            blood_groupError: '',
            occupationError: '',
            date_birthError: '',
            passwordError: '',
            person_to_contact_phoneError: '',
            person_to_contact_nameError: ''
}



class RegisterPatient extends React.Component {
    constructor(props){
        super(props)

        this.state = initialState;
    }


// Enable fielling form

    handleFullnameChange = (event) => {
        this.setState({
            fullname: event.target.value
        })
    }
    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleResidenceChange = (event) => {
        this.setState({
            residence: event.target.value
        })
    }
    handleSexChange = (event) => {
        this.setState({
            sex: event.target.value
        })
    }
    handleContactphoneChange = (event) => {
        this.setState({
            contact_phone: event.target.value
        })
    }
    handleBloodgroupChange = (event) => {
        this.setState({
            blood_group: event.target.value
        })
    }
    handleOccupationChange = (event) => {
        this.setState({
            occupation: event.target.value
        })
    }
    handleDatebirthChange = (event) => {
        this.setState({
            date_birth: event.target.value
        })
    }
    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handlePersontophoneChange = (event) => {
        this.setState({
            person_to_contact_phone: event.target.value
        })
    }
    handlePersontonameChange = (event) => {
        this.setState({
            person_to_contact_name: event.target.value
        })
    }

// Validation form
    // valid(item, type)
    // {
    //     let itemValue = item.target.value;
    //     switch(type)
    //     {
    //         case "fullname":{
    //             if(itemValue.length<4)
    //             {
    //                 item.target.style.color='red';
    //                 this.setState({fullname: itemValue})
    //             }
    //             else
    //             {
    //                 item.target.style.color='green';
    //                 this.setState({fullname: itemValue})
    //             }
    //         }
    //     }
    // }

// Validation form
    validate = () => {
        let fullnameError = '';
        let emailError = '';
        let residenceError = '';
        let sexError = '';
        let contact_phoneError = '';
        let blood_groupError = '';
        let occupationError = '';
        let date_birthError = '';
        let passwordError = '';
        let person_to_contact_phoneError = '';
        let person_to_contact_nameError = '';

        if(!this.state.fullname){
            fullnameError = 'Name cannot be blank';
        }
        if(!this.state.email.includes("@")){
            emailError = 'Invalid email';
        }
        if(emailError || fullnameError){
            this.setState({emailError, fullnameError});
            return false;
        }

        return true;
    };


// handle submit value
    handleSubmit = event => {
        alert(`${this.state.fullname} ${this.state.email} ${this.state.residence} ${this.state.sex}
        ${this.state.contact_phone} ${this.state.blood_group} ${this.state.occupation} ${this.state.date_birth}
        ${this.state.password} ${this.state.person_to_contact_phone} ${this.state.person_to_contact_name}`)
        event.preventDefault() //Avoid to lose data after submited
        const isValid = this.validate();
        if(isValid){
            console.log(this.state);
            this.setState(initialState); //Clearing Form
        }
    }


    // const [addPatient, setAddPatient] = useState('')


    //     const handleFormChange = (inputValue) => {
    //         setAddPatient(inputValue)
    //     }
    
    //     const handleFormSubmit = () =>{
    //         fetch('/register/patient', {
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 fullname: addPatient,
    //                 email: addPatient,
    //                 residence: addPatient,
    //                 sex: addPatient,
    //                 contact_phone: addPatient,
    //                 blood_group: addPatient,
    //                 occupation: addPatient,
    //                 date_birth: addPatient,
    //                 password: addPatient,
    //                 person_to_contact_phone: addPatient,
    //                 person_to_contact_name: addPatient
    //             }),
    //             headers: {
    //                 "Content-type": "application/json; charset=UTF-8",
    //                 "Accept": "application/json"
    //             }
    //         }).then(response => response.json())
    //         .then(message => console.log(message))
    //     }

    handleSubmit()
    {
        let url = "/register/patient";
        let data = this.state;
        fetch(url, {
            method:'POST',
            headers:{
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            },
            body:JSON.stringify(data)
        }).then((result)=>{
            result.json().then((resp)=>{
                console.warn("resp", resp)
                alert("data submited")
            })
        })
    }


    render() {
        const{ fullname,email, residence, sex, contact_phone, blood_group, occupation, date_birth,
                password, person_to_contact_phone, person_to_contact_name } = this.state
        return (
            <form onSubmit = {this.handleSubmit}>
                <div className = "from-group">
                    <label>Fullname</label>
                    <input type = "text" name = "fullname" value = {fullname} placeholder = "Names"
                    onChange = {this.handleFullnameChange} required />
                    <span style = {{fontSize: 12, color: 'red'}}>{this.state.fullnameError}</span>
                </div>
                <div>
                    <label>Email</label>
                    <input type = "email" name = "email" value = {email} placeholder = "Email"
                    onChange = {this.handleEmailChange} required />
                    <span style = {{fontSize: 12, color: 'red'}}>{this.state.emailError}</span>
                </div>
                <div>
                    <label>Residence</label>
                    <input type = "text" name = "residence" value = {residence} placeholder = "Quater, Town"
                    onChange = {this.handleResidenceChange} required />
                    <span style = {{fontSize: 12, color: 'red'}}>{this.state.residenceError}</span>
                </div>
                <div>
                    <label>Sex</label>
                    <select name = "sex" value = {sex} onChange = {this.handleSexChange} required>
                        <option value = "">Choose your Sex</option>
                        <option value = "F">Female</option>
                        <option value = "M">Male</option>
                    </select>
                    <span style = {{fontSize: 12, color: 'red'}}>{this.state.sexError}</span>
                </div>
                <div>
                    <label>Contact Phone</label>
                    <input type = "tel" name = "phone_contact" value = {contact_phone} placeholder = "Ex: 123 456 789"
                    onChange = {this.handleContactphoneChange} pattern = "[0-9]{3} [0-9]{3} [0-9]{3}" required />
                    <span style = {{fontSize: 12, color: 'red'}}>{this.state.contact_phoneError}</span>
                </div>
                <div>
                    <label>Blood Group</label>
                    <select value = {blood_group} name = "blood_gooup" onChange = {this.handleBloodgroupChange} required>
                        <option value = "">Choose your Blood Group</option>
                        <option value = "A+">A RhD positive (A+)</option>
                        <option value = "A-">A RhD negative (A-)</option>
                        <option value = "B+">B RhD positive (B+)</option>
                        <option value = "B-">B RhD negative (B-)</option>
                        <option value = "O+">O RhD positive (O+)</option>
                        <option value = "O-">O RhD negative (O-)</option>
                        <option value = "AB+">AB RhD positive (AB+)</option>
                        <option value = "AB-">AB RhD negative (AB-)</option>
                    </select>
                    <span style = {{fontSize: 12, color: 'red'}}>{this.state.blood_groupError}</span>
                </div>
                <div>
                    <label>Occupation</label>
                    <input type = "text" value = {occupation} name = "occupation" onChange = {this.handleOccupationChange} required />
                    <span style = {{fontSize: 12, color: 'red'}}>{this.state.occupationError}</span>
                </div>
                <div>
                    <label>Date of Birth</label>
                    <input type="date" value = {date_birth} name = "date_birth" onChange = {this.handleDatebirthChange} required />
                    <span style = {{fontSize: 12, color: 'red'}}>{this.state.data_birthError}</span>
                </div>
                <div>
                    <label>Password</label>
                    <input type = "password" value = {password} name = "password" onChange = {this.handlePasswordChange} required />
                    <span style = {{fontSize: 12, color: 'red'}}>{this.state.passwordError}</span>
                </div>
                <div>
                    <label>Person to contact Phone</label>
                    <input type = "text" name = "person_to_contact_phone" value = {person_to_contact_phone} placeholder = "Ex: 123 456 789"
                    onChange = {this.handlePersontophoneChange} pattern = "[0-9]{3} [0-9]{3} [0-9]{3}" required />
                    <span style = {{fontSize: 12, color: 'red'}}>{this.state.person_to_contact_phoneError}</span>
                </div>
                <div>
                    <label>Person to Contact Name</label>
                    <input type = "text" name = "person_to_contact_name" value = {person_to_contact_name} onChange = {this.handlePersontonameChange} required />
                    <span style = {{fontSize: 12, color: 'red'}}>{this.state.person_to_contact_nameError}</span>
                </div>
                <div>
                    <input class = "btn btn-info" type = "submit" />
                </div>
            </form>

//             // <div className="base-container">
//             //     <div className="header">Register as a patient</div>
//             //     <div className="content">
//             //         <div className="image">
//             //             <img alt = "just a test" src={loginImg} />
//             //         </div>
//             //         <div className="form">
//             //             <div className="form-group">
//             //                 <label htmlFor="username">Username</label>
//             //                 <input type="text" name="username" placeholder="username"/>
//             //             </div>
//             //             <div className="form-group">
//             //                 <label htmlFor="email">Email</label>
//             //                 <input type="email" name="email" placeholder="email"/>
//             //             </div>
//             //             <div className="form-group">
//             //                 <label htmlFor="username">Password</label>
//             //                 <input type="password" name="password" placeholder="password"/>
//             //             </div>
//             //             <div className="form-group">
//             //                 <input type="radio" value="M" name="gender" /> Male
//             //                 <input type="radio" value="F" name="gender" /> Female
//             //             </div>
//             //         </div>
//             //     </div>
//             //     <div className="footer">
//             //         <button type = "button" className="btn">
//             //             Register
//             //         </button>
//             //     </div>
//             // </div>
        );
    }
}

export default RegisterPatient;