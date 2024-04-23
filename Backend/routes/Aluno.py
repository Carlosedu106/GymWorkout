from flask import Flask, jsonify, request, Blueprint
from flask_login import login_user, logout_user, LoginManager

import os,sys

schemes = (os.getcwd()+'/Backend/schemes')
sys.path.append(schemes)

from AlunoScheme import * # type: ignore

app = Flask(__name__)
loginManager = LoginManager(app)

aluno_bp = Blueprint('aluno', __name__)

@aluno_bp.route('/aluno/register', methods = ['POST'])
def register():
    data = request.get_json()
    if Aluno.select().where(Aluno.email == data["email"]).exists():
        return "Email Já Cadastrado", 400
    newAluno = Aluno.create( # type: ignore
        name =  data["name"],
        email = data["email"],
        password = data["password"],
        phone = data["phone"],
        dateOfBirth = data["dateOfBirth"],
        height = data["height"],
        weight = data["weight"]
    )
    newAluno.save()
    return jsonify(data)

@aluno_bp.route('/aluno/login', methods = ['POST'])
def login():
    data = request.get_json()

    if not data["email"]:
        return "Email necessita ser preenchido!",400
    
    if not data["password"]:
        return "Password necessita ser preenchido!",400


    if Aluno.select().where(Aluno.email == data["email"]).exists() and Aluno.select().where(Aluno.password == data["password"]).exists():
        user = Aluno.select().where(Aluno.email == data["email"]).first()
        user_info = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "dateOfBirth": str(user.dateOfBirth),  # Convertendo para string
            "height": user.height,
            "weight": float(user.weight)  # Convertendo para float
        }
        login_user(user)
        return jsonify(user_info),200
    else:
        return "Email ou Senha incorretos!", 403
    
@aluno_bp.route('/aluno/logout')
def logout():
    logout_user()
    return "Saindo"

@loginManager.user_loader
def get_user(user_id):
    return Aluno.select().where(Aluno.email == data["email"]).first()