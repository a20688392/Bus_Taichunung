import json
import os
from urllib import response
from flask.testing import FlaskClient
from flask_bcrypt import Bcrypt
from hashlib import scrypt
from flask import Flask, jsonify, redirect, render_template, request, session, url_for
from user import user
from QA import QA

from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required



jwt = JWTManager()
 
app = Flask(__name__)
app.secret_key = os.urandom(24)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST': 
        name = request.form["name"]
        if user.check_duplicate_username(name):
            return render_template('register.html', check = False)
        account = request.form["account"]
        password = request.form["password"]
        phone = request.form["phone"]
        email = request.form["email"]
        bcrypt = Bcrypt()
        hashed_password = bcrypt.generate_password_hash(password=password)
        user.register(name,account, hashed_password,phone,email)
        return redirect("/")
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        account = request.form["account"]
        user_password = user.check(account)
        password = request.form["password"]
        bcrypt = Bcrypt()
        check = bcrypt.check_password_hash(user_password[0], password)
        if check == True:
            access_token = create_access_token(identity=account)
            session['access_token'] = access_token
            return redirect(url_for('index'))
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('access_token',None)
    return render_template('index.html')

@app.route('/checkjwt', methods=['POST'])
@jwt_required()
def checkjwt():
    account = get_jwt_identity()
    userdata = user.getUserData(account);
    return jsonify({'userdata': userdata})

@app.route('/userpage')
def userpage():
    if 'access_token' in session:
        response =  client.post(url_for('checkjwt'), headers={
            'Authorization': 'Bearer ' + session['access_token']
        })
        userdata = json.loads(response.get_data())['userdata']
        print(userdata);
    return render_template('userpage.html', userdata = userdata)

@app.route('/aboutus')
def aboutus():
    return render_template('aboutus.html')

@app.route('/QandA')
def QandA():
    QAs = QA.getAll()
    return render_template('QandA.html', QAs = QAs)

@app.route('/busWay')
def bus():
    return render_template('busWay.html',Zh_tw=1,En=1)

if __name__ == '__main__':
    # 設定 JWT 密鑰
    client = FlaskClient(app, response_wrapper=app.response_class)
    app.config['JWT_SECRET_KEY'] = '12389!)!834913*&*&*&*'
    jwt.init_app(app)
    from database import *
    app.run()
