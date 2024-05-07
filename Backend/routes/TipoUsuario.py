from flask import Flask, jsonify, request, Blueprint

import os,sys

schemes = (os.getcwd()+'/Backend/schemes')
sys.path.append(schemes)

from TipoUsuarioScheme import * # type: ignore

app = Flask(__name__)

tipoUsuario_bp = Blueprint('tipo', __name__)

@tipoUsuario_bp.route('/tipoUsuario', methods = ['GET'])
def getTipos():
    tipos = [tipo.descricao for tipo in TipoUsuario.select()]
    return jsonify(tipos)

