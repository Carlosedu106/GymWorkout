from flask import Flask, jsonify, request, Blueprint
from flask_login import login_user, logout_user, LoginManager, current_user

import os,sys

schemes = (os.getcwd()+'/Backend/schemes')
sys.path.append(schemes)

from UserScheme import * # type: ignore

app = Flask(__name__)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return Usuario.get_by_id(int(user_id))

user_bp = Blueprint('user', __name__)

@user_bp.route('/user/register', methods = ['POST'])
def register():
    data = request.get_json()
    if Usuario.select().where(Usuario.email == data["email"]).exists():
        return "Email Já Cadastrado", 400
    newUser = Usuario.create(
        name =  data["name"],
        email = data["email"],
        password = data["password"],
        phone = data["phone"],
        dateOfBirth = data["dateOfBirth"],
        height = data["height"],
        weight = data["weight"],
        tipoUsuario_id = data["typeUser"]
    )
    newUser.save()
    return jsonify(data)

@user_bp.route('/user/login', methods = ['POST'])
def login():
    data = request.get_json()

    if not data["email"]:
        return "Email necessita ser preenchido!",400
    
    if not data["password"]:
        return "Password necessita ser preenchido!",400

    try:
        user = Usuario.select().where(Usuario.email == data["email"], Usuario.password == data["password"]).get()
        user_info = user.to_dict()
        login_user(user)
        return jsonify(user_info),200
    except Usuario.DoesNotExist:
        return "Email ou Senha incorretos!", 403
    
@user_bp.route('/user/logout')
def logout():
    if current_user.is_authenticated:
        logout_user()
        return "Saindo"
    else:
        return "Usuário não autenticado", 403
