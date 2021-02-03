from flask import Flask, jsonify, g, abort, json, make_response, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy.orm import backref
# from sqlalchemy.orm import relationship
import uuid
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token, 
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity, verify_jwt_in_request, get_jwt_claims)

from flask_mail import Mail, Message
from random import randint

from flask_socketio import SocketIO, send
import os
# from os.path import join, dirname, realpath

import jwt
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta, date
from flask_login import UserMixin, LoginManager, login_user, current_user, logout_user
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import pandas as pd
# from flask_httpauth import HTTPBasicAuth

# from forms import RegistrationForm, LoginForm

# from faker import Faker

# fake = Faker()

app = Flask(__name__)

app.config['SECRET_KEY'] = '\x0em\xfcF\x04\xd614\x7f$\x12\xba\xb9\x81\x9f\xe8w\xc7$\x1b\x01\xcaW\x9f'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///medi.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/medical'
#'sqlite:///medi.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = "example@gmail.com"
app.config['MAIL_PASSWORD'] = 'your Gmail Password'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

app.config["UPLOAD_FOLDER"] = './static/files'
# UPLOADS_PATH = join(dirname(realpath(__file__)), 'static/uploads/..')

ALLOWED_EXTENSIONS = {'pdf'}

db = SQLAlchemy(app)
tok = JWTManager(app)
mail = Mail(app)

#Initialization of Flask-SocketIo
socketio = SocketIO(app)

login_manager = LoginManager()
login_manager.init_app(app)

migrate = Migrate(app, db)


class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    users = db.relationship('User', backref='role', lazy='dynamic')


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    fullname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    residence = db.Column(db.String(100), nullable=False)
    sex = db.Column(db.String(1), nullable=False)
    contact_phone = db.Column(db.Integer)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    parent_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    children = db.relationship("User", backref=db.backref('doctor', remote_side=[user_id]))
    blood_group = db.Column(db.String(3))
    occupation = db.Column(db.String(100), nullable=False)
    marital_status = db.Column(db.String(1))
    date_birth = db.Column(db.Date, nullable=False)
    person_to_contact_name = db.Column(db.String(100))
    person_to_contact_phone = db.Column(db.Integer)
    nic_passport_path = db.Column(db.String(255))
    cv_path = db.Column(db.String(255))
    diplomas_path = db.Column(db.String(255))
    status = db.Column(db.Boolean(1), default=False)
    report_case = db.relationship('ReportCase', backref='author')
    consultation = db.relationship('Consultation', backref='patient')
    past_history = db.relationship('PastHistory', backref='owner')
    consultations = db.relationship('Consultation', backref='owner')
    repot_cases = db.relationship('ReportCase', backref='owner')
    past_history = db.relationship('PastHistory', backref='owner')


class Consultation(db.Model):
    __tablename__ = "consultation"
    consultation_id = db.Column(db.Integer, primary_key=True)
    consultation_date = db.Column(db.Date, nullable=False)
    result1 = db.Column(db.String(255), nullable=False)
    result2 = db.Column(db.String(255), nullable=False)
    result3 = db.Column(db.String(255), nullable=False)
    other_observation = db.Column(db.Text)
    syptoms = db.Column(db.String(255), nullable=False)
    consultation_owner_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))


class ReportCase(db.Model):
    report_case_id = db.Column(db.Integer, primary_key=True)
    report_reason = db.Column(db.Text, nullable=False)
    report_date = db.Column(db.DateTime, default=datetime.utcnow())
    report_case_owner_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    # reported_user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))


class PastHistory(db.Model):
    past_history_id = db.Column(db.Integer, primary_key=True)
    past_history_type = db.Column(db.String(255), nullable=False)
    past_history_particular_observation = db.Column(db.String(255))
    past_history_year = db.Column(db.Date, nullable=False)
    past_history_owner_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))


db.create_all()




# # Here is a custom decorator that verifies the JWT is present in
# # the request, as well as insuring that this user has a role of
# # `admin` in the access token
# def admin_required(fn):
#     @wraps(fn)
#     def wrapper(*args, **kwargs):
#         verify_jwt_in_request()
#         claims = get_jwt_claims()
#         if claims['roles'] != 'admin':
#             return jsonify(msg='Admins only!'), 403
#         else:
#             return fn(*args, **kwargs)
#     return wrapper

# @jwt.user_claims_loader
# def add_claims_to_access_token(identity):
#     if identity == 'admin':
#         return {'roles': 'admin'}
#     else:
#         return {'roles': 'peasant'}


@app.route("/")
def index():
    return render_template("index.html")


# USers
def user_serializer(usersall):
    # for users, roles in users:
    return{
    'user_id': usersall.User.user_id,
    'public_id': usersall.User.public_id,
    'fullname': usersall.User.fullname,
    'occupation': usersall.User.occupation,
    'residence': usersall.User.residence,
    'email': usersall.User.email,
    'role_id': usersall.User.role_id,
    'status': usersall.User.status,
    'role': usersall.Role.name,
    # 'role': Role.query.filter_by(id=users.role_id)
}

@app.route('/users', methods=['GET'])
# @jwt_required
def get_all_users():
    usersall = db.session.query(User, Role).join(Role).all()
    # users = User.query.all()
    return jsonify([*map(user_serializer, usersall)])

@app.route('/stat', methods=['GET'])
@jwt_required
def stat():
    nbr_user = db.session.query(User).count()
    nbr_pending_user = User.query.filter_by(status = False).count()
    nbr_active_user = User.query.filter_by(status = True).count()
    nbr_doctor = User.query.filter_by(role_id = 2).count()
    nbr_patient = User.query.filter_by(role_id=3).count()
    return jsonify({"nbr_user": nbr_user, "nbr_doctor": nbr_doctor,
    "nbr_pending_user": nbr_pending_user, "nbr_active_user": nbr_active_user,
    "nbr_patient": nbr_patient})


# @app.route('/users', methods=['GET'])
# # @jwt_required
# def get_all_users():
#     usersall = db.session.query(User, Role).join(Role).all()
#     output = []
#     for users, roles in usersall:
#         user_data = {}
#         # user_role = {}
#         user_data['user_id'] = users.user_id
#         user_data['public_id'] = users.public_id
#         user_data['fullname'] = users.fullname
#         user_data['occupation'] = users.occupation
#         user_data['residence'] = users.residence
#         user_data['email'] = users.email
#         user_data['role_id'] = users.role_id
#         user_data['status'] = users.status
#         user_data['role'] = roles.name
#         output.append(user_data)
#     # print('output', output)
#     return jsonify({'users': output})
    

#Patient
def patient_serializer(patient):
    return{
        'user_id': patient.user_id,
        'public_id': patient.public_id,
        'fullname': patient.fullname,
        'occupation': patient.occupation,
        'residence': patient.residence,
        'email': patient.email,
        'role_id': patient.role_id,
        'status': patient.status
    }
    
@app.route('/users/patients', methods = ['GET'])
@jwt_required
def get_all_patients():
    patients = User.query.filter_by(role_id = 3)
    return jsonify([*map(patient_serializer, patients)])


#Patients for a specific Doctor
@app.route('/doctor-patients/', methods = ['GET'])
@jwt_required
def get_patients_for_doctor():
    doct_patients = User.query.filter_by(user_id=parent_id)
    return jsonify(*map[patient_serializer, doc_patients])


# Doctor Assignation
@app.route('/patient/assign-doctor/<public_id>', methods = ['PUT'])
@jwt_required
def assign_doctor(public_id):
    user = User.query.filter_by(public_id=public_id).first()
    print(user.email)
    if not user:
        return jsonify({'warn_message': 'No user found!'})
    else:
        data = json.loads(request.data)
        doc_id = data['doc_id']
        user.parent_id = doc_id
        #Sending Email Notification
        # subject = 'Account Activated'
        # mess = "Hello <b>"+user.fullname+"</b>, Your account has been activated<br>Login <a href = 'http://localhost:3000/login'>here</a>"
        # msg = Message(subject, sender="mediagnostic@ubuea.cm", recipients=user.email.split())
        # msg.html = mess
        # with app.open_resource("../src/assets/images/logo.png") as fp:
        #         msg.attach("logo.png", "image/png", fp.read())
        #         mail.send(msg)
        db.session.commit()
        return jsonify({"message": "Doctor assigned successfully"})


#Getting Doctor assigned from Patient Dashboard
@app.route('/doctor-assigned/<email>', methods = ['GET'])
@jwt_required
def doctor_assigned(email):
    user = User.query.filter_by(email = get_jwt_identity()).first()
    doc_user = User.query.filter_by(user_id = user.parent_id, status = True).first()
    return jsonify({
        'user_id': doc_user.user_id,
        'public_id': doc_user.public_id,
        'fullname': doc_user.fullname,
        'occupation': doc_user.occupation,
        'residence': doc_user.residence,
        'email': doc_user.email,
        'role_id': doc_user.role_id,
        'status': doc_user.status,
        'contact_phone': doc_user.contact_phone
    })
    # # if request.method == 'PUT':
    #     patient = User.query.filter_by(public_id=public_id).first()
    #     patient.parent_id = id
    #     return jsonify({'message': 'The Doctor has been assigned'})
    # if not user:
    #     return jsonify({'warn_message': 'No user found!'}) 
    # if user.status == 1:
    #     user.status = False
    #     subject = 'Account Desactivated'
    #     mess = "Hello <b>"+user.fullname+"</b>, Your account has been desactivated<br> You can't anymore accessed to hit"
    #     msg = Message(subject, sender="mediagnostic@ubuea.cm", recipients=user.email.split())
    #     msg.html = mess
    #     with app.open_resource("../src/assets/images/logo.png") as fp:
    #             msg.attach("logo.png", "image/png", fp.read())
    #             mail.send(msg)
    #     db.session.commit()
    #     return jsonify({'message': 'The user status has been updated from Active to Inactive'})
    # else:
    #     user.status = True
    #     subject = 'Account Activated'
    #     mess = "Hello <b>"+user.fullname+"</b>, Your account has been activated<br>Login <a href = 'http://localhost:3000/login'>here</a>"
    #     msg = Message(subject, sender="mediagnostic@ubuea.cm", recipients=user.email.split())
    #     msg.html = mess
    #     with app.open_resource("../src/assets/images/logo.png") as fp:
    #             msg.attach("logo.png", "image/png", fp.read())
    #             mail.send(msg)
    #     db.session.commit()
    #     return jsonify({'message': 'The user status has been updated from Inactive to Active'})


#Consultation
@app.route('/create/consultation', methods=['POST'])
@jwt_required
def create_consultation():
    data = request.get_json()
    symplen = len(data)
    dat = date.today().strftime('%Y-%m-%d')
    da = datetime.strptime(dat, '%Y-%m-%d')
    user = User.query.filter_by(email=get_jwt_identity()).first() # Filter DB by token (email)
    owner = user.user_id #assign the the user_id to owner variable
    if symplen == 0:
        return({"war_message": "Field the form first"}), 201
    else:
        symptoms = ", ".join(data)
        consultation = Consultation(consultation_date=da,
                                    result1='I am a patient too',
                                    result2='Another I am a patient too',
                                    result3='I am a patient too Another',
                                    syptoms=symptoms,
                                    consultation_owner_id=owner
                                    )
        db.session.add(consultation)
        db.session.commit()
        return jsonify({'message': 'Consultation created successfully'})

def consultation_serializer(consult):
    return{
        'consultation_id': consult.consultation_id,
        'consultation_date': consult.consultation_date,
        'result1': consult.result1,
        'result2': consult.result2,
        'result3': consult.result3,
        'other_observation': consult.other_observation,
        'symptoms': consult.syptoms,
        'consultation_owner_id': consult.consultation_owner_id,
    }

@app.route('/consultations/user', methods = ['GET'])
@jwt_required
def get_use_consultation():
    user = User.query.filter_by(email=get_jwt_identity()).first() # Filter DB by token (email)
    consultations = Consultation.query.filter_by(consultation_owner_id = user.user_id)
    return jsonify([*map(consultation_serializer, consultations)])

#Getting specific user consultations/Predictions
@app.route('/consultations/user/<public_id>', methods = ['GET'])
@jwt_required
def get_user_consultations(public_id):
    user = User.query.filter_by(public_id=public_id).first()
    print("===========================> "+str(user.user_id))
    consultations = Consultation.query.filter_by(consultation_owner_id = user.user_id)
    return jsonify([*map(consultation_serializer, consultations)])

#Getting specific user consultations/Predictions passing through consulation_id
@app.route('/user/consultation/<consultation_id>', methods = ['GET'])
@jwt_required
def get_user_consultation(consultation_id):
    consult = Consultation.query.filter_by(consultation_id=consultation_id).first()
    print("===========================> "+str(consult.consultation_id))
    return jsonify(
        {
        'consultation_id': consult.consultation_id,
        'consultation_date': consult.consultation_date,
        'result1': consult.result1,
        'result2': consult.result2,
        'result3': consult.result3,
        'other_observation': consult.other_observation,
        'symptoms': consult.syptoms,
        'consultation_owner_id': consult.consultation_owner_id,
        }
    )

#Update consultation by inserting doctor observation
@app.route('/user/consultation/<consultation_id>', methods = ['PUT'])
@jwt_required
def make_observation(consultation_id):
    consult = Consultation.query.filter_by(consultation_id=consultation_id).first()
    print("====================================> "+str(consult.consultation_id))
    if not consult:
        return jsonify({"message": "This consultation doesn't exist"})
    else:
        data = json.loads(request.data)
        if data['observation'] != '':
            consult.other_observation = data['observation']
            db.session.commit()
            return jsonify({'message': 'Recommendations added successfully!'})
        else:
            return jsonify({'war_message': "Recommendation / Observation can't be empty"}), 201
            

#Doctors
def doctor_serializer(doctor):
    return{
        'user_id': doctor.user_id,
        'public_id': doctor.public_id,
        'fullname': doctor.fullname,
        'occupation': doctor.occupation,
        'residence': doctor.residence,
        'email': doctor.email,
        'role_id': doctor.role_id,
        'status': doctor.status,
        'pending': 'Pending ...',
        'nic': doctor.nic_passport_path,
        'cv': doctor.cv_path,
        'diploma': doctor.diplomas_path
    }

@app.route('/users/doctors', methods = ['GET'])
@jwt_required
def get_all_doctors():
    doctors = User.query.filter_by(role_id = 2, status = True)
    return jsonify([*map(doctor_serializer, doctors)])

#Inactive doctors
@app.route('/users/rev', methods = ['GET'])
@jwt_required
def get_inactive_doctors():
    users = User.query.filter_by(status = False)
    return jsonify([*map(doctor_serializer, users)])


# @app.route('/role/view', methods=['GET'])
# @jwt_required
# def get_all_roles():
#     role = Role.query.all()
#     return jsonify([*map(user_serializer, role)])
#     print(role)

    # users = User.query.all()
    # # print('xdg', users)
    # output = []

    # for user in users:
    #     user_data = {}
    #     user_data['public_id'] = user.public_id
    #     user_data['fullname'] = user.fullname
    #     user_data['password'] = user.password
    #     user_data['occupation'] = user.occupation
    #     output.append(user_data)
    # # print('output', output)
    # return jsonify({'users': output})


#User Profil
def profile_serializer(profile):
    return{
        'fullname': profile.User.fullname,
        'email': profile.User.email,
        'sex': profile.User.sex,
        'occupation': profile.User.occupation,
        'residence': profile.User.residence,
        'contact_phone': profile.User.contact_phone,
        'blood_group': profile.User.blood_group,
        'marital_status': profile.User.marital_status,
        'date_birth': profile.User.date_birth,
        'person_to_contact_name': profile.User.person_to_contact_name,
        'person_to_contact_phone': profile.User.person_to_contact_phone,
        'role_id': profile.User.role_id,
        'status': profile.User.status,
        'role': profile.Role.name
    }
@app.route('/user/<email>/profile', methods = ['GET'])
@jwt_required
def user_profile(email):
    user = db.session.query(User, Role).join(Role).filter(User.email==get_jwt_identity(), User.role_id==Role.id)
    # user = User.query.filter_by(email=get_jwt_identity())# Filter DB by token (email)
    # print(user)
    if user is None:
        abort(404)
        return jsonify({'message': 'This user does not exist!'})
    else:
        return jsonify([*map(profile_serializer, user)])


#Get and Edit individual user

def user_update_serializer(useredit):
    return{
    'user_id': useredit.user_id,
    'public_id': useredit.public_id,
    'fullname': useredit.fullname,
    'occupation': useredit.occupation,
    'email': useredit.email,
    'sex': useredit.sex,
    'residence': useredit.residence,
    'contact_phone': useredit.contact_phone,
    'blood_group': useredit.blood_group,
    'marital_status': useredit.marital_status,
    'date_birth': useredit.date_birth,
    'person_to_contact_name': useredit.person_to_contact_name,
    'person_to_contact_phone': useredit.person_to_contact_phone,
    'status': useredit.status,
    'nic': useredit.nic_passport_path,
    'cv': useredit.cv_path,
    'diploma': useredit.diplomas_path
    }

@app.route('/users/<public_id>', methods=['GET', 'POST'])
# @jwt_required
def get_one_user(public_id):

    user = User.query.filter_by(public_id=public_id)

    if not user:
        return jsonify({'war_message': 'No user found!'})
    else:
        return jsonify([*map(user_update_serializer, user)])


#Create Role
@app.route('/role/create', methods=["POST"])
def roles():
    request_data = json.loads(request.data)
    role = Role(name=request_data['name'])

    db.session.add(role)
    db.session.commit()
    
    return {'200': 'Role created successfully'}

#Update Role
@app.route('/role/update/<public_id>', methods = ['PUT'])
def updrole(public_id):
    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message': 'No user found!'})
    
    user.role_id = 1
    # user.parent_id = 4
    db.session.commit()
    return jsonify({'message': 'The user role has been updated!'})

#Create Symptoms
@app.route('/symptoms/create', methods=["POST"])
def symptoms():
    request_data = json.loads(request.data)
    symptoms = Symptoms(name=request_data['name'])

    db.session.add(symptoms)
    db.session.commit()
    
    return {'201': 'Symptoms created successfully'}


#Update Role
@app.route('/symptom/update/<id>', methods = ['PUT'])
def updsymptom(id):
    sympt = Symptoms.query.filter_by(id=id).first()

    if not sympt:
        return jsonify({'message': 'No symptom found!'})
    
    sympt.name = "anosmia"
    db.session.commit()
    return jsonify({'message': 'Sypmtom has been updated!'})


#create past history
@app.route('/pasthistory/add', methods=['POST'])
@jwt_required
def history():
    data = request.get_json()
    dat = date.today().strftime('%Y-%m-%d')
    da = datetime.strptime(dat, '%Y-%m-%d')
    user = User.query.filter_by(email=get_jwt_identity()).first() # Filter DB by token (email)
    owner = user.user_id #assign the the user_id to owner variable
    if data['past_history_type'] == '':
        return jsonify({"war_message": "Past history type required"}), 201
    elif data['particular_observation'] == '':
        return jsonify({"war_message": "Observation required"}), 201
    else:
        new_history = PastHistory(past_history_type=data['past_history_type'],
                            past_history_particular_observation=data['particular_observation'],
                            past_history_year=da,
                            past_history_owner_id=owner)
        
        db.session.add(new_history)
        db.session.commit()
        return jsonify({'message': 'Your Past History has been created successfully!'})

def pasthistory_serializer(history):
    return{
        'pasthistory_id': history.past_history_id,
        'pasthistory_date': history.past_history_year,
        'pasthistory_observation': history.past_history_particular_observation,
        'pasthistory_type': history.past_history_type
    }

@app.route('/pasthistory/user', methods = ['GET'])
@jwt_required
def get_user_pasthistory():
    user = User.query.filter_by(email=get_jwt_identity()).first() # Filter DB by token (email)
    pasthistory = PastHistory.query.filter_by(past_history_owner_id = user.user_id)
    return jsonify([*map(pasthistory_serializer, pasthistory)])

#     db.session.add(history)
#     db.session.commit()
#     return {'201': 'PastHistory created successfully'}
    
#create past case Reporting
@app.route('/case-reporting/add', methods=['POST'])
@jwt_required
def case_reporting():
    data = request.get_json()
    dat = date.today().strftime('%Y-%m-%d')
    da = datetime.strptime(dat, '%Y-%m-%d')
    user = User.query.filter_by(email=get_jwt_identity()).first() # Filter DB by token (email)
    owner = user.user_id #assign the the user_id to owner variable
    if data['report_case'] == '':
        return jsonify({"war_message": "This form can'y be empty"}), 201
    else:
        new_case_report = ReportCase(report_reason=data['report_case'], report_date=da, 
        report_case_owner_id=owner
        # reported_user_id = 
        )
        manager = User.query.filter_by(role_id=1).first()
    # Sending Email Notification
        subject = 'New Case Reported'
        mess = "<p>Hello <b>"+manager.fullname+"</b></p>,<p>The user "+user.email+"<br/>reported user</p>"
        msg = Message(subject, sender="mediagnostic@ubuea.cm", recipients=manager.email.split())
        msg.html = mess
        with app.open_resource("../src/assets/images/logo.png") as fp:
                msg.attach("logo.png", "image/png", fp.read())
                mail.send(msg)
        db.session.add(new_case_report)
        db.session.commit()
        return jsonify({'message': 'Your case report has been saved successfully!'})



#Get all patients for a specific doctor
def doc_pat_serializer(pat):
    return{
    'public_id': pat.public_id,
    'user_id': pat.user_id,
    'fullname': pat.fullname,
    'occupation': pat.occupation,
    'email': pat.email,
    'sex': pat.sex,
    'residence': pat.residence,
    'contact_phone': pat.contact_phone,
    'blood_group': pat.blood_group,
    'marital_status': pat.marital_status,
    'date_birth': pat.date_birth,
    'person_to_contact_name': pat.person_to_contact_name,
    'person_to_contact_phone': pat.person_to_contact_phone,
    'status': pat.status,
    }
@app.route('/specific-patient-doctor', methods = ['GET'])
@jwt_required
def get_pat_doc():
    doc = User.query.filter_by(email=get_jwt_identity()).first()
    pat = User.query.filter_by(parent_id=doc.user_id)
    return jsonify([*map(doc_pat_serializer, pat)])


#Register a Doctor
@app.route('/auth/register/doctor', methods=["POST"])
def reg_doctor():
    data = request.form

    nic = request.files['nic_passport_path']
    nic_filename = secure_filename(nic.filename)
    nic.save(os.path.join(app.config['UPLOAD_FOLDER'], nic_filename))
    nic_path = 'static/files/'+nic_filename

    cv = request.files['cv_path']
    cv_filename = secure_filename(cv.filename)
    cv.save(os.path.join(app.config['UPLOAD_FOLDER'], cv_filename))
    cv_filepath = 'static/files/'+cv_filename

    diploma = request.files['diplomas_path']
    diploma_filename = secure_filename(diploma.filename)
    diploma.save(os.path.join(app.config['UPLOAD_FOLDER'], diploma_filename))
    diploma_filepath = 'static/files/'+diploma_filename

    hashed_password = generate_password_hash(data['password'], method ='sha256')
    dateB = datetime.strptime(data['date_birth'], '%Y-%m-%d').date()
    new_doctor = User.query.filter_by(email=data['email']).first()
    if not new_doctor:
        # gets inputs
        if data['fullname'] == '':
            return jsonify({"warn_message": "Fullname required"}), 201
        elif len(data['fullname']) < 4:
            return jsonify({"warn_message": "Fullname should be at least 4 characters"}), 201
        elif data['email'] == '':
            return jsonify({"warn_message": "Email required"}), 201
        elif data['residence'] == '':
            return jsonify({"warn_message": "Residence required"}), 201
        elif data['sex'] == '':
            return jsonify({"warn_message": "Gender required"}), 201
        elif data['contact_phone'] == '':
            return jsonify({"warn_message": "Contact phone required"}), 201
        elif request.files['diplomas_path'] == '':
            return jsonify({"warn_message": "Diploma required"}), 201
        elif data['occupation'] == '':
            return jsonify({"warn_message": "Occupation required"}), 201
        elif request.files['nic_passport_path'] == '':
            return jsonify({"warn_message": "Passport or ID Card required"}), 201
        elif request.files['cv_path'] == '':
            return jsonify({"warn_message": "CV required"}), 201
        elif data['date_birth'] == '':
            return jsonify({"warn_message": "Date of birth required"}), 201
        elif data['password'] == '':
            return jsonify({"warn_message": "Password required"}), 201
        elif len(data['password']) < 8:
            return jsonify({"warn_message": "Password should be at least 8 characters"}), 201
        elif data['marital_status'] == '':
            return jsonify({"warn_message": "Marital status required"}), 201
        else:
            new_doctor = User(public_id = str(uuid.uuid4()),
                            fullname = data['fullname'], password = hashed_password, role_id = 2,
                            email = data['email'], residence = data['residence'],
                            sex = data['sex'], contact_phone = data['contact_phone'],
                            occupation = data['occupation'],
                            nic_passport_path = nic_path,
                            cv_path = cv_filepath,
                            diplomas_path = diploma_filepath,
                            marital_status = data['marital_status'], date_birth = dateB
                        )
            subject = 'Welcome to Mediagnostic'
            mess = "Hello <b>"+request.files['fullname']+"</b>, welcome to Mediagnostic. Your registered successfully<br>Login <a href = 'http://localhost:3000/login'>here</a>"
            msg = Message(subject, sender="mediagnostic@ubuea.cm", recipients=request.files['email'].split())
            msg.html = mess
            with app.open_resource("../src/assets/images/logo.png") as fp:
                    msg.attach("logo.png", "image/png", fp.read())
                    mail.send(msg)
            #Insert Doctor
            db.session.add(new_doctor)
            db.session.commit()

            return jsonify({'message': 'Your account has been created!'})
    else:
        # returns 202 if user already exists 
        return jsonify({'warn_message': 'This email already exists. Please Log in.'}), 202

#Register a patient
@app.route('/auth/register/patient', methods=["POST"])
def reg_patient():
    data = json.loads(request.data)
    hashed_password = generate_password_hash(data['password'], method='sha256')
    dateB = datetime.strptime(data['date_birth'], '%Y-%m-%d').date()


    manager = User.query.filter_by(role_id = 1).first() #Getting the manager
    # checking for existing user
    new_patient = User.query.filter_by(email=data['email']).first()
    if not new_patient:
        # gets inputs
        if data['fullname'] == '':
            return jsonify({"warn_message": "Fullname required"}), 201
        elif len(data['fullname']) < 4:
            return jsonify({"warn_message": "Fullname should be at least 4 characters"}), 201
        elif data['email'] == '':
            return jsonify({"warn_message": "Email required"}), 201
        elif data['residence'] == '':
            return jsonify({"warn_message": "Residence required"}), 201
        elif data['sex'] == '':
            return jsonify({"warn_message": "Gender required"}), 201
        elif data['contact_phone'] == '':
            return jsonify({"warn_message": "Contact phone required"}), 201
        elif data['blood_group'] == '':
            return jsonify({"warn_message": "Blood group required"}), 201
        elif data['occupation'] == '':
            return jsonify({"warn_message": "Occupation required"}), 201
        elif data['person_to_contact_name'] == '':
            return jsonify({"warn_message": "Person to contact name required"}), 201
        elif data['person_to_contact_phone'] == '':
            return jsonify({"warn_message": "Person to contact phone required"}), 201
        elif dateB == '':
            return jsonify({"warn_message": "Date of birth required"}), 201
        elif hashed_password == '':
            return jsonify({"warn_message": "Password required"}), 201
        elif len(data['password']) < 8:
            return jsonify({"warn_message": "Password should be at least 8 characters"}), 201
        else:
            new_patient = User(public_id=str(uuid.uuid4()),
                                fullname=data['fullname'], password=hashed_password, role_id=3,
                                email=data['email'], residence=data['residence'],
                                sex=data['sex'], contact_phone=data['contact_phone'],
                                blood_group=data['blood_group'], occupation=data['occupation'],
                                date_birth=dateB,
                                status=1,
                                person_to_contact_name=data['person_to_contact_name'],
                                person_to_contact_phone=data['person_to_contact_phone']
                                )
            subject = 'Welcome to Mediagnostic'
            mess = "Hello <b>"+data['fullname']+"</b>, welcome to Mediagnostic. You registered successfully<br>Login <a href = 'http://localhost:3000/login'>here</a>"
            msg = Message(subject, sender="mediagnostic@ubuea.cm", recipients=data['email'].split())
            msg.html = mess
            with app.open_resource("../src/assets/images/logo.png") as fp:
                msg.attach("logo.png", "image/png", fp.read())
                mail.send(msg)

            subject = 'New Account created'
            mess = "New patient account created in your application.<br> Email: <b>"+data['email']+"</b>"
            msg = Message(subject, sender="mediagnostic@ubuea.cm", recipients=manager.email.split())
            msg.html = mess
            with app.open_resource("../src/assets/images/logo.png") as fp:
                msg.attach("logo.png", "image/png", fp.read())
                mail.send(msg)

            #Insert Patient
            db.session.add(new_patient)
            db.session.commit()
            return jsonify({'message': 'Your account has been created successfully!'}), 200
    else:
        # returns 202 if user already exists 
        return jsonify({'warn_message': 'This email already exists. Please Log in.'}), 202



#Login
@app.route('/auth/login', methods = ['POST'])
def login():
    # print(request.json)
    if not request.is_json:
        return jsonify({"error_message": "Missing JSON in request"}), 400

    username = request.json.get('email', None)
    password = request.json.get('password', None)
    if not username:
        return jsonify({"error_message": "Missing email parameter"}), 400
    if not password:
        return jsonify({"error_message": "Missing password parameter"}), 400

    # if username != 'test' or password != 'test':
    #     return jsonify({"msg": "Bad username or password"}), 401

    user = User.query.filter_by(email=username).first()
    user_data = {}
    user_data['email'] = user.email
    user_data['fullname'] = user.fullname
    user_data['role_id'] = user.role_id
    user_data['status'] = user.status
    user_data['role_id'] = user.role_id

    r = Role.query.filter_by(id=user.role_id).first()
    # roles = Roles.query.filter_by(id = user_data['role_id'])
    role_data = r.name

    if user_data['status'] == 0:
        return({"war_message": "Your account is not active contact adminstrator !"})
    elif user_data['status'] == 1:
    # Identity can be any data that is json serializable
        access_token = create_access_token(identity=username)
        refresh_token = create_refresh_token(identity=username)
        return jsonify({
            'message': 'Logged In Successfully, Welcome '+ user_data['fullname']+ ' !', 
            'token': access_token, 
            'ref_token': refresh_token,
            'user': user_data['fullname'],
            'role_id': user_data['role_id'],
            'email': user_data['email'],
            'role_name': role_data,
            'status': user_data['status']
        })


@app.route('/auth/logout', methods = ['GET'])
@jwt_required
def logout():
    logout_user()
    return {"success": 200}


#Update single user status
@app.route('/user/status/<public_id>', methods=['PUT'])
@jwt_required
def promote_user(public_id):
    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'warn_message': 'No user found!'})

    if user.status == 1:
        user.status = False
        subject = 'Account Desactivated'
        mess = "Hello <b>"+user.fullname+"</b>, Your account has been desactivated<br> You can't anymore accessed to hit"
        msg = Message(subject, sender="mediagnostic@ubuea.cm", recipients=user.email.split())
        msg.html = mess
        with app.open_resource("../src/assets/images/logo.png") as fp:
                msg.attach("logo.png", "image/png", fp.read())
                mail.send(msg)
        db.session.commit()
        return jsonify({'message': 'The user status has been updated from Active to Inactive'})
    else:
        user.status = True
        subject = 'Account Activated'
        mess = "Hello <b>"+user.fullname+"</b>, Your account has been activated<br>Login <a href = 'http://localhost:3000/login'>here</a>"
        msg = Message(subject, sender="mediagnostic@ubuea.cm", recipients=user.email.split())
        msg.html = mess
        with app.open_resource("../src/assets/images/logo.png") as fp:
                msg.attach("logo.png", "image/png", fp.read())
                mail.send(msg)
        db.session.commit()
        return jsonify({'message': 'The user status has been updated from Inactive to Active'})

    # return jsonify({'message': 'The user status has been updated!'})


#Deleting user
@app.route('/user/<public_id>', methods=['DELETE'])
def delete_user(public_id):
    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message': 'No user found!'})
    
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User has been deleted'})

@app.route('/symptoms', methods=['GET'])
@jwt_required
def get_symptoms():
    data = pd.read_csv('DataSetSymptoms.csv')
    df = pd.DataFrame(data)
    cols = df.columns
    cols = cols[1:] #Removing the first column name "Disease"
    output = []
    # print(cols)
    for sym in cols:
        symp_data = {}
        symp_data['symptom_name'] = sym
        output.append(symp_data)
    return jsonify({"symptoms": output})




if __name__ ==  '__main__':
    app.run(debug=True)