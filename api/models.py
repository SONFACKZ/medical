from flask import Flask, jsonify, json, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
import uuid
from datetime import datetime
from flask_login import UserMixin, LoginManager, login_user, current_user
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash

# from forms import RegistrationForm, LoginForm

# from faker import Faker

# fake = Faker()

app = Flask(__name__)

app.config['SECRET_KEY'] = '\x0em\xfcF\x04\xd614\x7f$\x12\xba\xb9\x81\x9f\xe8w\xc7$\x1b\x01\xcaW\x9f'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///medi.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

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

@app.route("/")
def index():
    return render_template("index.html")

def user_serializer(use):
    return{
        'user_id': use.user_id,
        'public_id': use.public_id,
        'fullname': use.fullname,
        'occupation': use.occupation,
        'residence': use.residence
    }


@app.route('/user', methods=['GET'])
def get_all_users():

    users = User.query.all()
    return jsonify([*map(user_serializer, users)])
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


@app.route('/user/<public_id>', methods=['GET'])
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



@app.route('/role/create', methods=["POST"])
def roles():
    request_data = json.loads(request.data)
    role = Role(name=request_data['name'])

    db.session.add(role)
    db.session.commit()
    
    return {'201': 'Role created successfully'}
    # data = request.get_json()
@app.route('/pasthistory', methods=['POST'])
def history():
    data = json.loads(request.data)
    history = PastHistory(past_history_type=data['past_history_type'],
                          past_history_particular_observation=data['past_history_particular_observation'],
                          past_history_year=data['past_history_year'],
                          past_history_owner_id=2
                          )
    db.session.add(history)
    db.session.commit()
    return {'201': 'PastHistory created successfully'}
    

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

@app.route('/register/doctor', methods=["POST"])
def reg_doctor():
    data = request.get_json()

    x = datetime(data['date_birth'][0], data['date_birth'][1], data['date_birth'][2])
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


@app.route('/register/patient', methods=["POST"])
def reg_patient():
    # request_data = json.loads(request.data)
    # hashed_password = generate_password_hash(request_data['password'], method='sha256')

    # reg_user = User(public_id=str(uuid.uuid4()),
    #                 fullname=request_data['fullname'],
    #                 password=hashed_password, role_id=3,
    #                 email=request_data['email'], residence=request_data['residence'],
    #                 sex=request_data['sex'], contact_phone=request_data['contact_phone'],
    #                 blood_group=request_data['blood_group'], occupation=request_data['occupation'],
    #                 date_birth=request_data['date_birth'],
    #                 person_to_contact_name=request_data['person_to_contact_name'],
    #                 person_to_contact_phone=request_data['person_to_contact_phone']
    #                 )
    # db.session.add(reg_user)
    # db.session.commit()

    # return {'201': 'Patient account created successfully'}

    # x = datetime(data['date_birth'][0], data['date_birth'][1], data['date_birth'][2])
    data = json.loads(request.data)
    hashed_password = generate_password_hash(data['password'], method='sha256')
    dateB = datetime.strptime(data['date_birth'], '%Y-%m-%d').date()
    new_patient = User(public_id=str(uuid.uuid4()),
                        fullname=data['fullname'], password=hashed_password, role_id=3,
                        email=data['email'], residence=data['residence'],
                        sex=data['sex'], contact_phone=data['contact_phone'],
                        blood_group=data['blood_group'], occupation=data['occupation'],
                        date_birth=dateB,
                        status=0,
                        person_to_contact_name=data['person_to_contact_name'],
                        person_to_contact_phone=data['person_to_contact_phone']
                        )
    db.session.add(new_patient)
    db.session.commit()

    return jsonify({'message': 'Your new patient account has been created!'})


@app.route('/login')
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    user = User.query.filter_by(name=auth.username).first()

    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    if check_password_hash(user.password, auth.password):
        token = JWT.encode({'public_id': user.public_id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])

        return jsonify({'token': token.decode('UTF-8')})

    return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})











# @app.route("/login",methods=["GET", "POST"])
# def login():
#     if request.method == "POST":
#         uname = request.form["uname"]
#         passw = request.form["passw"]
        
#         login = user.query.filter_by(fullname=uname, password=passw).first()
#         if login is not None:
#             return redirect(url_for("index"))
#     return render_template("login.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        uname = request.form['uname']
        mail = request.form['mail']
        passw = request.form['passw']
        resi = request.form['resi']
        se = request.form['se']
        contact = request.form['contact']
        rol = request.form['rol']

        register = User(fullname = uname, email = mail, password = passw, residence = resi, sex = se, contact_phone = contact, role_id = rol)
        db.session.add(register)
        db.session.commit()

        return redirect(url_for("login"))
    return render_template("register.html")

if __name__ == "__main__":
    app.run(debug=True)








    #  def __init__(self, name, description, price, qty):
    #     self.name = name
    #     self.description = description
    #     self.price = price
    #     self.qty = qty
