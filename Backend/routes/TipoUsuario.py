from flask import Flask, jsonify, request, Blueprint

import os,sys

schemes = (os.getcwd()+'/Backend/schemes')
sys.path.append(schemes)

from TipoUsuarioScheme import * # type: ignore

app = Flask(__name__)

tipoUsuario_bp = Blueprint('tipo', __name__)

# @personal_pb.route('/tipoUsuario', methods = ['GET'])
# def getTipos():
#     data = request.get_json()
#     if Personal.select().where(Personal.email == data["email"]).exists():
#         return "Email Já Cadastrado", 400
#     newPersonal = Personal.create( # type: ignore
#         name =  data["name"],
#         email = data["email"],
#         password = data["password"],
#         phone = data["phone"]
#     )
#     newPersonal.save()
#     return jsonify(data)
