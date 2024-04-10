import os, sys
from peewee import *

bdConnection = (os.getcwd()+'/Backend/bd')

sys.path.append(bdConnection)

from Connection import * # type: ignore

class BaseModel(Model): 
    class Meta():
        database = bd

   

class Aluno(BaseModel):
    id = AutoField()
    name = CharField(max_length=50)
    email = CharField(max_length=50)
    password = CharField(max_length=50)
    phone = CharField(max_length=11)
    dateOfBirth = DateField()
    height = IntegerField()
    weight = FloatField()

bd.connect()
bd.create_tables([Aluno])
bd.close()