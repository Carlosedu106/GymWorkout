import requests
from flask import Flask, jsonify, request, Blueprint

app = Flask(__name__)

exercicios_bp = Blueprint('exercicios', __name__)

url = 'https://exercisedb.p.rapidapi.com/exercises'

headers = {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': '56e056fbc8msh7068f13bbc68e00p130510jsn9f488476d056'
}
params = {
    'limit': '50'
}

@exercicios_bp.route('/exercises/get', methods = ['GET'])
def getExercicios():
    response = requests.get(url, headers=headers, params=params)

    # Verificando se a requisição foi bem-sucedida
    if response.ok:
        # Retornando os dados como JSON
        return jsonify(response.json())
    else:
        # Se a requisição falhar, retornar uma mensagem de erro
        return 'Erro ao obter os exercícios', response.status_code
