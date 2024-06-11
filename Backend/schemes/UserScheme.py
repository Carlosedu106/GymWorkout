from flask import Flask
from flask_login import UserMixin
import os, sys
from peewee import *

bdConnection = (os.getcwd()+'/Backend/bd')
sys.path.append(bdConnection)

from TipoUsuarioScheme import *


from Connection import * # type: ignore

class BaseModel(Model): 
    class Meta():
        database = bd

class Usuario(BaseModel, UserMixin):
    name = CharField(max_length=50, unique=True)
    email = CharField(max_length=50, unique=True)
    password = CharField()
    phone = CharField(max_length=11)
    dateOfBirth = DateField()
    tipoUsuario= ForeignKeyField(TipoUsuario, backref="usuarios")
    personal = ForeignKeyField('self', backref="usuarios", null = True)
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'dateOfBirth': str(self.dateOfBirth),  # Convertendo para string
            'typeUser': self.tipoUsuario.descricao  # Obtendo o tipo de usuário
        }

if not bd.is_closed():
    bd.close()

def is_aluno(user_id):
    try:
        usuario = Usuario.get_by_id(user_id)
        return usuario.tipoUsuario.descricao == 'Aluno'
    except Usuario.DoesNotExist:
        return False

bd.connect()
# bd.create_tables([Usuario])
bd.close()
# def cadastrarUsuario(name_user, email_user, phone_user, dateOfBirth_user, password_user, tipoUsuario_user):
#     user1 = Usuario(
#         name = name_user,
#         email = email_user,
#         phone = phone_user,
#         dateOfBirth = dateOfBirth_user,
#         password = password_user,
#         tipoUsuario = TipoUsuario.select().where(TipoUsuario.descricao == tipoUsuario_user).first()
#     )

#     user1.save()
# cadastrarUsuario('Halan Caio', 'hallankayo20@gmail.com', '11111111111', '2001-12-21', '12345678', 'Administrador')
# cadastrarUsuario('Carlos Eduardo', 'carlosed@gmail.com', '22222222222', '2001-06-16', '87654321', 'Personal')
# cadastrarUsuario('Daniel', 'Daniel@gmail.com', '11111111111', '2001-12-21', '12345678', 'Aluno')