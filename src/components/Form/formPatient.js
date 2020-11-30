import React, {useState} from 'react';

const FormPatient = ({userInput, onFormChange, onFormSubmit})=>{
    const handleChange = (event) => {
        onFormChange(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit()
    }

    return(
        <div>
            <form onSubmit = {this.handleSubmit}>
                <div>
                    <label>Fullname</label>
                    <input type = "text" value = {fullname} placeholder = "Names"
                    onChange = {this.handleFullnameChange} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type = "email" value = {email} placeholder = "Email"
                    onChange = {this.handleEmailChange} required />
                </div>
                <div>
                    <label>Residence</label>
                    <input type = "text" value = {residence} placeholder = "Quater, Town"
                    onChange = {this.handleResidenceChange} required />
                </div>
                <div>
                    <label>Sex</label>
                    <select value = {sex} onChange = {this.handleSexChange} required>
                        <option value = "">Choose your Sex</option>
                        <option value = "F">Female</option>
                        <option value = "M">Male</option>
                    </select>
                </div>
                <div>
                    <label>Contact Phone</label>
                    <input type = "tel" value = {contact_phone} placeholder = "Ex: 123 456 789"
                    onChange = {this.handleContactphoneChange} pattern = "[0-9]{3} [0-9]{3} [0-9]{3}" required />
                </div>
                <div>
                    <label>Blood Group</label>
                    <select value = {blood_group} onChange = {this.handleBloodgroupChange} required>
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
                </div>
                <div>
                    <label>Occupation</label>
                    <input type = "text" value = {occupation} onChange = {this.handleOccupationChange} required />
                </div>
                <div>
                    <label>Date of Birth</label>
                    <input type="date" value = {date_birth} onChange = {this.handleDatebirthChange} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type = "password" value = {password} onChange = {this.handlePasswordChange} required />
                </div>
                <div>
                    <label>Person to contact Phone</label>
                    <input type = "text" value = {person_to_contact_phone} placeholder = "Ex: 123 456 789"
                    onChange = {this.handlePersontophoneChange} pattern = "[0-9]{3} [0-9]{3} [0-9]{3}" required />
                </div>
                <div>
                    <label>Person to Contact Name</label>
                    <input type = "text" value = {person_to_contact_name} onChange = {this.handlePersontonameChange} required />
                </div>
                <div>
                    <input class = "btn btn-info" type = "submit" />
                </div>
            </form>

        </div>
    )
}

export default FormPatient;