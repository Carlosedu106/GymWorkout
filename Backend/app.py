from flask import Flask
from flask_login import LoginManager
import os,sys

routes = (os.getcwd()+'/Backend/routes')
sys.path.append(routes)

from User import user_bp as user_app
from TipoUsuario import tipoUsuario_bp as tipoUsuario_app
from Treinos import exercicios_bp as exercicios_app 
from TreinoAluno import treinoUsuario_bp as treinoAluno_app 

app = Flask(__name__)
loginManager = LoginManager(app)
app.config['SECRET_KEY'] = '@@@@@@@@'

app.register_blueprint(user_app)
app.register_blueprint(tipoUsuario_app)
app.register_blueprint(exercicios_app)
app.register_blueprint(treinoAluno_app)

app.run(port = 5000, host = 'localhost', debug=True)