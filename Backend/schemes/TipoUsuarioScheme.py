import os, sys
from peewee import *

bdConnection = (os.getcwd()+'/Backend/bd')

sys.path.append(bdConnection)

from Connection import * # type: ignore

class BaseModel(Model): 
    class Meta():
        database = bd

class TipoUsuario(BaseModel):
    descricao = CharField(max_length=15)

bd.connect()
# bd.create_tables([TipoUsuario])
bd.close()

# lista_users = [
#     {'descricao' : 'Aluno'},
#     {'descricao' : 'Personal'},
#     {'descricao' : 'Administrador'}
# ]

# TipoUsuario.insert_many(lista_users).execute()