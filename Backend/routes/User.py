from flask import Flask, jsonify, request, Blueprint
from flask_login import login_user, logout_user, LoginManager, current_user
from flask_bcrypt import Bcrypt

import os,sys

schemes = (os.getcwd()+'/Backend/schemes')
sys.path.append(schemes)

from UserScheme import * # type: ignore

app = Flask(__name__)

bcrypt = Bcrypt(app)

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
        return "Email já cadastrado", 400
    hashed_password = bcrypt.generate_password_hash(data["password"]).decode('utf-8')
    newUser = Usuario.create(
        name =  data["name"],
        email = data["email"],
        password = hashed_password,
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
        user = Usuario.get(Usuario.email == data["email"])
        if bcrypt.check_password_hash(user.password, data["password"]):
            user_info = user.to_dict()
            login_user(user)
            return jsonify(user_info),200
        else:
            return "Email ou Senha incorretos!", 403
    except Usuario.DoesNotExist:
        return "Email ou Senha incorretos!", 403

    
@user_bp.route('/user/logout')
def logout():
    if current_user.is_authenticated:
        logout_user()
        return "Saindo"
    else:
        return "Usuário não autenticado", 403

@user_bp.route('/user/<string:id>', methods = ['GET'])
def getById(id):
    try:
        usuario = Usuario.select().where(Usuario.id == id).first()
        return jsonify(usuario.to_dict())
    except Usuario.DoesNotExist:
        return jsonify({'error': 'User not found'}), 404
    
def get_By_Id(id):
    try:
        usuario = Usuario.select().where(Usuario.id == id).first()
        return usuario
    except Usuario.DoesNotExist:
        return None
    
@user_bp.route('/user/personalaluno', methods = ["POST"])
def vincularPersonalAluno():
    data = request.get_json()

    user_id = data.get('userId')
    personal_id = data.get('personalId')
    

    if not user_id or not personal_id:
        return jsonify({'error': 'Os campos userId e personalId são obrigatórios'}), 400

    try:
        usuario = get_By_Id(user_id)
        personal = get_By_Id(personal_id)
        print("-----------------------------------------")
        print(personal)
        
        if personal.tipoUsuario.descricao != 'Personal':
            return {'error': 'O usuário especificado não é um personal trainer'}
        
        usuario.personal = personal
        usuario.save()
        return {'message': 'Personal vinculado com sucesso'}
    except Usuario.DoesNotExist:
        return {'error': 'Usuário ou personal não encontrado'}
    