from flask import Flask, jsonify, request, Blueprint

import os,sys

schemes = (os.getcwd()+'/Backend/schemes')
sys.path.append(schemes)
print(schemes)

from AlunoScheme import * # type: ignore

app = Flask(__name__)

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

