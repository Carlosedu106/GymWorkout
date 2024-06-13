from peewee import *
import os, sys
bdConnection = (os.getcwd()+'/Backend/bd')
sys.path.append(bdConnection)

from Connection import * # type: ignore

# from User import *
from UserScheme import *
from TreinoScheme import *

class BaseModel(Model): 
    class Meta():
        database = bd
        
class UsuarioTreino(BaseModel):
    usuarioId = ForeignKeyField(Usuario, backref='usuario')
    treinoId = IntegerField()
    repeticoes = IntegerField()
    series = IntegerField()
    
if not bd.is_closed():
    bd.close()

bd.connect()
bd.create_tables([UsuarioTreino])
bd.close()