from flask import Flask, jsonify, request, Blueprint

import os,sys


schemes = (os.getcwd()+'/Backend/schemes')
sys.path.append(schemes)

from TreinoAlunoScheme import * # type: ignore
from UserScheme import *
from TreinoScheme import *
import Treinos

import User

app = Flask(__name__)

treinoUsuario_bp = Blueprint('treinoUsuario', __name__)

# Função para verificar se o usuário é um aluno
# def is_aluno(user_id):
#     try:
        
#         usuario = User.getById(user_id)
#         return usuario.tipoUsuario.descricao == 'Aluno'
#     except User.DoesNotExist:
#         return False

@treinoUsuario_bp.route('/ExerciseUser', methods=['POST'])
def adicionar_usuario_treino():
    data = request.get_json()
    try:
        aluno = Usuario.select().where(Usuario.id == data["alunoId"]).first()
    except User.DoesNotExist:
        return jsonify({'error': 'Aluno não encontrado'}), 404
    try:
        treinoReferente = Treinos.getExercicioById(data["exercicioId"])
    except Exception:
        return jsonify({'error': str("quebrou")}), 400
    print(jsonify(treinoReferente))

    usuario_treino = UsuarioTreino(
        usuarioId=data["alunoId"],
        treinoId=data["exercicioId"],
        repeticoes=data["repeticoes"],
        series=data["series"]
    )
    if is_aluno(data["alunoId"]):
        usuario_treino.save()
        return jsonify({'message': 'Treino adicionado com sucesso'}), 201
    else:
        return jsonify({'error': 'Somente usuários do tipo "Aluno" podem ser vinculados a treinos'}), 400