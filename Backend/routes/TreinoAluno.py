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

@treinoUsuario_bp.route('/ExerciseUser', methods=['POST'])
def adicionar_usuario_treino():
    data = request.get_json()
    try:
        Usuario.select().where(Usuario.id == data["alunoId"]).first()
    except User.DoesNotExist:
        return jsonify({'error': 'Aluno não encontrado'}), 404
    try:
        Treinos.getExercicioById(data["exercicioId"])
    except Exception:
        return jsonify({'error': str("Exercício não encontrado")}), 400

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
    
@treinoUsuario_bp.route('/ExerciseUser', methods=['DELETE'])
def excluir_treino_aluno():
    data = request.get_json()
    try: 
        Usuario.select().where(Usuario.id == data["alunoId"]).first()
    except User.DoesNotExist:
        return jsonify({'error': 'Aluno não encontrado'}), 404
    try:
        Treinos.getExercicioById(data["exercicioId"])
    except Exception:
        return jsonify({'error': str("Exercício não encontrado")}), 400
    
    treino_usuario = UsuarioTreino.delete().where(
        UsuarioTreino.usuarioId_id == data["alunoId"] and UsuarioTreino.usuarioId_id == data["alunoId"])
    treino_usuario.execute()
    return jsonify({'message': 'TREINO REMOVIDO DO USUÁRIO'}), 200


@treinoUsuario_bp.route('/ExerciseUser', methods=['GET'])
def get_treinos_aluno():
    data = request.get_json()
    try: 
        Usuario.select().where(Usuario.id == data["alunoId"]).first()
    except User.DoesNotExist:
        return jsonify({'error': 'Aluno não encontrado'}), 404
    
    treino_usuario = UsuarioTreino.delete().where(
        UsuarioTreino.usuarioId_id == data["alunoId"] and UsuarioTreino.usuarioId_id == data["alunoId"])
    treino_usuario.execute()
    return jsonify({'message': 'TREINO REMOVIDO DO USUÁRIO'}), 200