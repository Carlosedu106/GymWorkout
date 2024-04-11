from flask import Flask
import os,sys

routes = (os.getcwd()+'/Backend/routes')
sys.path.append(routes)

from Aluno import aluno_bp as aluno_app
from Personal import personal_pb as personal_app 

app = Flask(__name__)

app.register_blueprint(aluno_app)
app.register_blueprint(personal_app)

app.run(port = 5000, host = 'localhost', debug=True)