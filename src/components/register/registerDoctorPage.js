import React, {useState, useEffect} from 'react';
import axios from 'axios';
import loginImg from "../../login.svg";


const initialState = {
            fullname: '',
            email: '',
            residence: '',
            sex: '',
            contact_phone: '',
            nic_passport_path: '',
            occupation: '',
            date_birth: '',
            password: '',
            cv_path: '',
            diplomas_path: '',
            marital_status: '',
            fullnameError: '',
            emailError: '',
            residenceError: '',
            sexError: '',
            contact_phoneError: '',
            nic_passport_pathError: '',
            occupationError: '',
            date_birthError: '',
            passwordError: '',
            cv_pathError: '',
            diplomas_pathError: '',
            marital_statusError: ''
}



class RegisterPatient extends React.Component {
    constructor(props){
        super(props)

        const handleFormChange = (inputValue) => {
            // setAddPatient(inputValue)
        }

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
    handleNicPassportPathChange = (event) => {
        this.setState({
            nic_passport_path: event.target.value
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
    handleCvPathChange = (event) => {
        this.setState({
            cv_path: event.target.value
        })
    }
    handleDiplomasPathChange = (event) => {
        this.setState({
            diplomas_path: event.target.value
        })
    }

    handleMaritalStatusChange = (event) => {
        this.setState({
            marital_status: event.target.value
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
        let nic_passport_pathError = '';
        let occupationError = '';
        let date_birthError = '';
        let passwordError = '';
        let cv_pathError = '';
        let diplomas_pathError = '';
        let marital_statusError = '';

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
        event.preventDefault() //Avoid to lose data after submited
        const isValid = this.validate();
        if(isValid){
            console.log(this.state);
            this.setState(initialState); //Clearing Form
        }
        axios.post('/register/doctor', this.state)
             .then(response => {
                 console.log(response)
             })
             .catch(error => {
                 console.log(error)
             })
    }

    render() {
        const{ fullname,email, residence, sex, contact_phone, nic_passport_path, occupation, date_birth,
                password, cv_path, diplomas_path, marital_status } = this.state
        return (
            <div className="base-container mx-auto border shadow p-5">
                <div><br /></div>
                <div className="header">Doctor Registration</div>
                <div className="image">
                        <img alt = "another test" src={loginImg} />
                </div>
                <div className="content">
                    <div><br /></div>
                        <form onSubmit = {this.handleSubmit}>
                            <div class="row">
                                <div class="col-sm">
                                    <div>
                                        <label>Fullname</label>
                                        <input class="form-control" type = "text" name = "fullname" value = {fullname} placeholder = "Names"
                                        onChange = {this.handleFullnameChange} required />
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.fullnameError}</span>
                                    </div>
                                </div>
                                <div class="col-sm">
                                    <div>
                                        <label>Email</label>
                                        <input class="form-control" type = "email" name = "email" value = {email} placeholder = "Email"
                                        onChange = {this.handleEmailChange} required />
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.emailError}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <div>
                                        <label>Residence</label>
                                        <input class="form-control" type = "text" name = "residence" value = {residence} placeholder = "Quater, Town"
                                        onChange = {this.handleResidenceChange} required />
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.residenceError}</span>
                                    </div>
                                </div>
                                <div class="col-sm">
                                    <div>
                                        <label>Sex</label>
                                        <select class="form-control" name = "sex" value = {sex} onChange = {this.handleSexChange} required>
                                            <option value = "">Choose your Sex</option>
                                            <option value = "F">Female</option>
                                            <option value = "M">Male</option>
                                        </select>
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.sexError}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <div>
                                        <label>Contact Phone</label>
                                        <input class="form-control" type = "tel" name = "phone_contact" value = {contact_phone} placeholder = "Ex: 123 456 789"
                                        onChange = {this.handleContactphoneChange} pattern = "[0-9]{3} [0-9]{3} [0-9]{3}" required />
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.contact_phoneError}</span>
                                    </div>
                                </div>
                                <div class="col-sm">
                                    <div>
                                        <label>ID Card or Passport</label>
                                        <span style = {{fontSize: 9, color: 'grey'}}> Valid document</span>
                                        <input class="form-control" type = "file" value = {nic_passport_path} name = "nic_passport_path" onChange = {this.handleNicPassportPathChange} required />
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.nic_passport_pathError}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <div>
                                        <label>Occupation</label>
                                        <input class="form-control" type = "text" value = {occupation} name = "occupation" onChange = {this.handleOccupationChange} required />
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.occupationError}</span>
                                    </div>
                                </div>
                                <div class="col-sm">
                                    <div>
                                        <label>Date of Birth</label>
                                        <input class="form-control" type="date" value = {date_birth} name = "date_birth" onChange = {this.handleDatebirthChange} required />
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.data_birthError}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <div>
                                        <label>Password</label>
                                        <input class="form-control" type = "password" value = {password} name = "password" onChange = {this.handlePasswordChange} required />
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.passwordError}</span>
                                    </div>
                                </div>
                                <div class="col-sm">
                                    <div>
                                        <label>Upload your CV</label>
                                        <input class="form-control" type = "file" name = "cv_path" value = {cv_path} placeholder = "Ex: 123 456 789"
                                        onChange = {this.handleCvPathChange} required />
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.cv_pathError}</span>
                                    </div>
                                </div>
                            </div>
                        <div class="row">
                            <div class="col-sm">
                                <div>
                                    <label>Upload Diplomas</label>
                                    <span style = {{fontSize: 9, color: 'grey'}}> Latest diploma to apply to this role</span>
                                    <input class="form-control" type = "file" name = "diplomas_path" value = {diplomas_path} onChange = {this.handleDiplomasPathChange} required />
                                    <span style = {{fontSize: 12, color: 'red'}}>{this.state.diplomas_pathError}</span>
                                </div>
                            </div>
                            <div class="col-sm">
                                <div>
                                    <label>Marital Status</label>
                                    <select class="form-control" value = {marital_status} name = "marital_status" onChange = {this.handleMaritalStatusChange} required>
                                            <option value = "">Choose your status</option>
                                            <option value = "S">Single</option>
                                            <option value = "M">Married</option>
                                    <span style = {{fontSize: 12, color: 'red'}}>{this.state.marital_statusError}</span>
                                    </select>
                                </div>
                            </div>
                        </div>
                            <div>
                                <input class="form-control btn btn-info" type = "submit" />
                            </div>
                        </form>
                        </div>
                        </div>
        );
    }
}

export default RegisterPatient;