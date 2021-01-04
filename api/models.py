from flask import Flask, jsonify, g, abort, json, make_response, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
import uuid
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
# from flask_jwt import JWT, jwt_required
import jwt
from datetime import datetime, timedelta
from flask_login import UserMixin, LoginManager, login_user, current_user, logout_user
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
# from flask_httpauth import HTTPBasicAuth

# from forms import RegistrationForm, LoginForm

# from faker import Faker

# fake = Faker()

app = Flask(__name__)

app.config['SECRET_KEY'] = '\x0em\xfcF\x04\xd614\x7f$\x12\xba\xb9\x81\x9f\xe8w\xc7$\x1b\x01\xcaW\x9f'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///medi.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True

app.config["UPLOAD_FOLDER"] = '/static/image'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

db = SQLAlchemy(app)
tok = JWTManager(app)
# auth = HTTPBasicAuth()


login_manager = LoginManager()
login_manager.init_app(app)

migrate = Migrate(app, db)


class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    permissions = db.Column(db.Integer)
    users = db.relationship('User', backref='role', lazy='dynamic')

    # def __str__(self):
    #     return f'{self.id} {self.name}'


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

    # def set_password (self, password):
    #     self.password = generate_password_hash(password)
    
    # def check_password(self, password):
    #     return check_password_hash(self.password, password)


class Consultation(db.Model):
    __tablename__ = "consultation"
    consultation_id = db.Column(db.Integer, primary_key=True)
    consultation_date = db.Column(db.Date, nullable=False)
    result1 = db.Column(db.String(255), nullable=False)
    result2 = db.Column(db.String(255), nullable=False)
    result3 = db.Column(db.String(255), nullable=False)
    other_observation = db.Column(db.Text, nullable=False)
    syptoms = db.Column(db.String(255), nullable=False)
    consultation_owner_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))


class ReportCase(db.Model):
    report_case_id = db.Column(db.Integer, primary_key=True)
    report_reason = db.Column(db.Text, nullable=False)
    report_date = db.Column(db.DateTime, default=datetime.utcnow())
    report_case_owner_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    def __init__(self, report_reason, report_case_owner_id):
        self.report_reason = report_reason
        self.report_case_owner_id = report_case_owner_id

    def __repr__(self):
        return 'The report_reason is {}, report_case_owner_id{}'.format(self.report_reason, self.report_date, self.report_case_owner_id)


class PastHistory(db.Model):
    past_history_id = db.Column(db.Integer, primary_key=True)
    past_history_type = db.Column(db.String(255), nullable=False)
    past_history_particular_observation = db.Column(db.String(255), nullable=False)
    past_history_year = db.Column(db.Date, nullable=False)
    past_history_owner_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

db.create_all()


# decorator for verifying the JWT 
def token_required(f): 
    @wraps(f) 
    def decorated(*args, **kwargs): 
        token = None
        # jwt is passed in the request header 
        if 'x-access-token' in request.headers: 
            token = request.headers['x-access-token'] 
        # return 401 if token is not passed 
        if not token: 
            return jsonify({'message' : 'Token is missing !!'}), 401
   
        try: 
            # decoding the payload to fetch the stored details 
            data = jwt.decode(token, app.config['SECRET_KEY']) 
            current_user = User.query.filter_by(public_id = data['public_id']).first() 
        except: 
            return jsonify({ 
                'message' : 'Token is invalid !!'
            }), 401
        # returns the current logged in users contex to the routes 
        return  f(current_user, *args, **kwargs) 
   
    return decorated 




@app.route("/")
def index():
    return render_template("index.html")


#Test protected route
@app.route('/pro', methods=['GET'])
@jwt_required
def pro():
 return jsonify({'message': 'Page protected!'})

# db.session.query(Post).select_from(Follow).filter_by(follower_id=self.id)
# .join(Post, Follow.followed_id == Post.author_id)

# Post.query.join(Follow, Follow.followed_id == Post.author_id)
# .filter(Follow.follower_id == self.id)

# User.query.join(Role, role.id == User.user_id).filter(Role, role_id == self.id)

def user_serializer(users):
    return{
        'user_id': users.user_id,
        'public_id': users.public_id,
        'fullname': users.fullname,
        'occupation': users.occupation,
        'residence': users.residence,
        'email': users.email,
        'role_id': users.role_id,
        'status': users.status
    }

@app.route('/users', methods=['GET'])
@jwt_required
def get_all_users():
    # print("header", request.headers)
    # current_user = get_jwt_identity()
    # print(current_user)
    users = User.query.all()
    
    # role  = Role.query.filter_by(id=users.role_id)

    return jsonify([*map(user_serializer, users)])

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

def doctor_serializer(doctor):
    return{
        'user_id': doctor.user_id,
        'public_id': doctor.public_id,
        'fullname': doctor.fullname,
        'occupation': doctor.occupation,
        'residence': doctor.residence,
        'email': doctor.email,
        'role_id': doctor.role_id,
        'status': doctor.status
    }

@app.route('/users/doctors', methods = ['GET'])
@jwt_required
def get_all_doctors():
    doctors = User.query.filter_by(role_id = 2)
    return jsonify([*map(doctor_serializer, doctors)])

#Inactive doctors
@app.route('/users/doctors/rev', methods = ['GET'])
@jwt_required
def get_inactive_doctors():
    doctors = User.query.filter_by(status == 0)
    return jsonify([*map(doctor_serializer, doctors)])


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
# @app.route('/user/<public_id>')
# def user(username):
# user = User.query.filter_by(public_id = public_id).first()
# if user is None:
# abort(404)
# return jsonify({'message': 'This user does not exist!'})


# #User Profil Edit
# @app.route('/edit-profile', methods=['GET', 'POST'])
# @login_required
# def edit_profile():
#     form = EditProfileForm()
#     if form.validate_on_submit():
#         current_user.name = form.name.data
#         current_user.location = form.location.data
#         current_user.about_me = form.about_me.data
#         db.session.add(user)
#         flash('Your profile has been updated.')
#         return redirect(url_for('.user', username=current_user.username))
# form.name.data = current_user.name
# form.location.data = current_user.location
# form.about_me.data = current_user.about_me
# return render_template('edit_profile.html', form=form)


#Get individual user
@app.route('/users/<public_id>', methods=['GET'])
def get_one_user(public_id):

    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message': 'No user found!'})

    user_data = {}
    user_data['public_id'] = user.public_id
    user_data['fullname'] = user.fullname
    user_data['password'] = user.password
    user_data['occupation'] = user.occupation

    return jsonify({'user': user_data})


#Create Role
@app.route('/role/create', methods=["POST"])
def roles():
    request_data = json.loads(request.data)
    role = Role(name=request_data['name'])

    db.session.add(role)
    db.session.commit()
    
    return {'201': 'Role created successfully'}

#Update Role
@app.route('/role/update/<public_id>', methods = ['PUT'])
def updrole(public_id):
    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message': 'No user found!'})
    
    user.role_id = 3
    db.session.commit()

    return jsonify({'message': 'The user role has been updated!'})



#create past history
@app.route('/pasthistory/add', methods=['POST'])
def history():
    data = request.get_json()
    new_history = PastHistory(past_history_type=data['past_history_type'],
                          past_history_particular_observation=data['past_history_particular_observation'],
                          past_history_year=data['past_history_year'],
                          past_history_owner_id=2)
    
    db.session.add(new_history)
    db.session.commit()
    return jsonify({'message': 'Your Past History has been created successfully!'})


#     db.session.add(history)
#     db.session.commit()
#     return {'201': 'PastHistory created successfully'}
    

# @login_manager.user_loader
# def load_user(user_id):
#     return User.query.get(user_id)

#Register a Doctor
@app.route('/auth/register/doctor', methods=["POST"])
def reg_doctor():
    data = request.get_json()

    dateB = datetime.strptime(data['date_birth'], '%Y-%m-%d').date()

    # file = data['nic_passport_path']
    # filename = secure_filename(file.filename)
    # file.save((os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    # filepath = 'static/images/'+file.filename

    hashed_password = generate_password_hash(data['password'], method='sha256')
    dateB = datetime.strptime(data['date_birth'], '%Y-%m-%d').date()
    new_doctor = User(public_id=str(uuid.uuid4()),
                        fullname=data['fullname'], password=hashed_password, role_id=2,
                        email=data['email'], residence=data['residence'],
                        sex=data['sex'], contact_phone=data['contact_phone'],
                        occupation=data['occupation'],
                        nic_passport_path=data['nic_passport_path'],
                        cv_path=data['cv_path'], diplomas_path=data['diplomas_path'],
                        marital_status=data['marital_status'], date_birth=dateB
                       )
    db.session.add(new_doctor)
    db.session.commit()

    return jsonify({'message': 'Your new doctor account has been created!'})

#Register a patient
@app.route('/auth/register/patient', methods=["POST"])
def reg_patient():
    
    data = json.loads(request.data)
    hashed_password = generate_password_hash(data['password'], method='sha256')
    dateB = datetime.strptime(data['date_birth'], '%Y-%m-%d').date()



    # checking for existing user
    new_patient = User.query.filter_by(email=data['email']).first()

    if not new_patient:
    # gets inputs
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

        #Insert patient
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
    user_data['fullname'] = user.fullname
    user_data['role_id'] = user.role_id
    user_data['status'] = user.status

    if user_data['status'] == 0:
        return({"war_message": "Your account is not active contact adminstrator !"})
    elif user_data['status'] == 1:
    # Identity can be any data that is json serializable
        access_token = create_access_token(identity=username)
        return jsonify({
            'message': 'Successful login, Welcome !', 
            'token': access_token, 
            'user': user_data['fullname'],
            'role_id': user_data['role_id'],
            'status': user_data['status']
        })


@app.route('/auth/logout')
@jwt_required
def logout():
    logout_user()
    return {"success": 200}



#Update single record
@app.route('/user/status/<public_id>', methods=['PUT'])
def promote_user(public_id):
    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message': 'No user found!'})

    if user.status == 1:
        user.status = False
        db.session.commit()
        return jsonify({'message': 'The user status updated from Active to Inactive'})
    else:
        user.status = True
        db.session.commit()
        return jsonify({'message': 'The user status updated from Inactive to Active'})

    # return jsonify({'message': 'The user status has been updated!'})


#Deleting record
@app.route('/user/<public_id>', methods=['DELETE'])
def delete_user(public_id):
    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message': 'No user found!'})
    
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User has been deleted'})



if __name__ ==  '__main__':
    # db.create_all()
    app.run(debug=True)