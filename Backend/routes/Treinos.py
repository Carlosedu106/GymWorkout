import requests
from flask import Flask, jsonify, request, Blueprint
from TreinoScheme import *
import json


app = Flask(__name__)

exercicios_bp = Blueprint('exercicios', __name__)

urlBase = 'https://exercisedb.p.rapidapi.com/exercises'

headers = {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': '56e056fbc8msh7068f13bbc68e00p130510jsn9f488476d056'
}
params = {
    'limit': '50',
}

@exercicios_bp.route('/exercises/', methods = ['GET'])
def getExercicios():
    response = requests.get(urlBase, headers=headers, params=params)

    # Verificando se a requisição foi bem-sucedida
    if response.ok:
        # Retornando os dados como JSON
        return jsonify(response.json())
    else:
        # Se a requisição falhar, retornar uma mensagem de erro
        return 'Erro ao obter os exercícios', response.status_code

@exercicios_bp.route('/exercises/<string:id>', methods = ['GET'])
def getExercicioById(id):
    url = f'{urlBase}/exercise/{id}'
    response = requests.get(url, headers=headers, params=params)
   
    if response.ok:
        # Retornando os dados como JSON
        return response.json()
    else:
        # Se a requisição falhar, retornar uma mensagem de erro
        return 'Erro ao obter os exercícios', response.status_code
    
@exercicios_bp.route('/exercises/name/<string:name>', methods = ['GET'])
def getExercicioByName(name):
    url = f'{urlBase}/name/{name}'
    response = requests.get(url, headers=headers, params=params)
    print(response)
    
    if response.ok:
        # Retornando os dados como JSON
        return jsonify(response.json())
    else:
        # Se a requisição falhar, retornar uma mensagem de erro
        return 'Erro ao obter os exercícios', response.status_code
    
@exercicios_bp.route('/exercises/targetList', methods = ['GET'])
def getTargets():
    url = f'{urlBase}/targetList'
    response = requests.get(url, headers=headers, params=params)
    print(response)
    
    if response.ok:
        # Retornando os dados como JSON
        return jsonify(response.json())
    else:
        # Se a requisição falhar, retornar uma mensagem de erro
        return 'Erro ao obter os dados!', response.status_code
    
@exercicios_bp.route('/equipments', methods = ['GET'])
def getEquipaments():
    url = f'{urlBase}/equipmentList'
    response = requests.get(url, headers=headers, params=params)
    print(response)
    
    if response.ok:
        # Retornando os dados como JSON
        return jsonify(response.json())
    else:
        # Se a requisição falhar, retornar uma mensagem de erro
        return 'Erro ao obter os dados!', response.status_code
    
@exercicios_bp.route('/treino/add', methods=['POST'])
def add_treino():
    data = request.get_json()
    usuario_id = data.get('usuarioId')
    

    # Verifica se os campos obrigatórios estão presentes
    if not usuario_id:
        return jsonify({'error': 'Os campos usuarioId e descricao são obrigatórios'}), 400

    # Cria um novo treino
    treino = Treino.create(usuarioId=usuario_id, descricao=descricao)
    return jsonify(model_to_dict(treino)), 201

# Rota para obter todos os treinos (GET)
@exercicios_bp.route('/treino/get', methods=['GET'])
def get_treinos():
    treinos = Treino.select()
    treinos_list = [model_to_dict(treino) for treino in treinos]
    return jsonify(treinos_list)