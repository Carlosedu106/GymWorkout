from peewee import *
import os, sys
bdConnection = (os.getcwd()+'/Backend/bd')

sys.path.append(bdConnection)

from Connection import * # type: ignore

# from User import *
from UserScheme import *

class BaseModel(Model): 
    class Meta():
        database = bd
        
class Treino(BaseModel):
     usuarioId = ForeignKeyField(Usuario, backref='usuario')
    
    
# Conectando ao banco de dados e criando as tabelas
if not bd.is_closed():
    bd.close()

bd.connect()
# bd.create_tables([Treino])
bd.close()