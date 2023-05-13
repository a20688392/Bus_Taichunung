from flask_bcrypt import Bcrypt
from hashlib import scrypt
from flask import Flask, redirect, render_template, request, session, url_for
from user import user

from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
 
jwt = JWTManager()
 
app = Flask(__name__)


@app.route('/')
def index():
    if 'access_token' in session:
        return redirect(url_for('/getsession'))
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        account = request.form["account"]
        if user.check_duplicate_username(account):
            return render_template('register.html', check = False)
        password = request.form["password"]
        bcrypt = Bcrypt()
        hashed_password = bcrypt.generate_password_hash(password=password)
        user.register(account, hashed_password)
        return redirect(url_for('/'))
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        account = request.form["account"]
        user_password = user.check(account)
        password = request.form["password"]
        bcrypt = scrypt()
        check = bcrypt.check_password_hash(user_password[0], password)
        if check == True:
            access_token = create_access_token(identity=account)
            session['access_token'] = access_token
            return render_template('login.html')
    return render_template('login.html')

@app.route('/checkjwt')
@jwt_required
def checkjwt():
    name = get_jwt_identity()
    userdata = user.getUserData(name);
    return render_template('index.html' , userdata = userdata)

@app.route('/getsession')
def getsession():
    if 'access_token' in session:
        return session['access_token']
    return "Not logged in!"

if __name__ == '__main__':
    # 設定 JWT 密鑰
    app.config['JWT_SECRET_KEY'] = '12389!)!834913*&*&*&*'
    jwt.init_app(app)
    from database import *
    app.run()
