from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# from faker import Faker

# fake = Faker()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///medi.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

migrate = Migrate(app, db)

# print(fake.name())
# print('------------------------------')
# print(fake.email())
# print('------------------------------')
# print(fake.address())
# print('------------------------------')

class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    permissions = db.Column(db.Integer)
    users = db.relationship('User', backref='role', lazy='dynamic')


def __init__(self, name, persmissions):
        self.name = fake.name()
        self.permissions = fake.random_int(min=10, max=19)


class User(db.Model):
    __tablename__ = "users"
    user_id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50))
    residence = db.Column(db.String(100), nullable=False)
    sex = db.Column(db.String(1), nullable=False)
    contact_phone = db.Column(db.Integer)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    report_case = db.relationship('ReportCase', backref='author')
    consultation = db.relationship('Consultation', backref='patient')
    past_history = db.relationship('PastHistory', backref='owner')
    consultations = db.relationship('Consultation', backref='owner')
    repot_cases = db.relationship('ReportCase', backref='owner')
    past_history = db.relationship('PastHistory', backref='owner')

    __mapper_args__ = {
        'polymorphic_identity': 'users',
        'polymorphic_on': role
    }


class Doctor(User):
    __tablename__ = None
    nic_passport_path = db.Column(db.String(255), nullable=True)
    cv_path = db.Column(db.String(255), nullable=False)
    diplomas_path = db.Column(db.String(255), nullable=False)
    status = db.Column(db.Boolean(1), default=False)

    __mapper_args__ = {
        'polymorphic_identity': 'doctor'
    }


class Patient(User):
    __tablename__ = 'patient'
    blood_group = db.Column(db.String(3))
    occupation = db.Column(db.String(100), nullable=False)
    marital_status = db.Column(db.String(1), nullable=False)
    date_birth = db.Column(db.Date, nullable=False)
    person_to_contact_name = db.Column(db.String(100), nullable=False)
    person_to_contact_phone = db.Column(db.Integer, nullable=False)
    consultation = db.relationship('Consultation', backref='owner')

    __mapper_args__ = {
        'polymorphic_identity': 'patient'
    }


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
    report_date = db.Column(db.Date, nullable=False)
    report_case_owner_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))


class PastHistory(db.Model):
    past_history_id = db.Column(db.Integer, primary_key=True)
    past_history_type = db.Column(db.String(255), nullable=False)
    past_history_particular_observation = db.Column(db.String(255), nullable=False)
    past_history_year = db.Column(db.Date, nullable=False)
    past_history_owner_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))















    #  def __init__(self, name, description, price, qty):
    #     self.name = name
    #     self.description = description
    #     self.price = price
    #     self.qty = qty
