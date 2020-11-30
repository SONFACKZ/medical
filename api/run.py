from flask import Flask

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def api():
    return {
        'userId': 1,
        "fullname": "Sonfack",
        "occupation": "occupation",
        "password": "sha256$UftUSag7$5b53a97c65941b9f3562f31dae5091eae447af6dde1ffcbbeaaf273010aaf5cc",
        "public_id": "5e60516a-83df-4f1f-b680-bb2b22bc3d4a"
        }