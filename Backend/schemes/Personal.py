import os, sys 

bdConnection = (os.getcwd()+'/Backend/bd')

sys.path.append(bdConnection)

from Connection import * # type: ignore

class BaseModel(Model): 
    class Meta():
        database = bd

   

class Personal(BaseModel):
    id = AutoField()
    name = CharField(max_length=50)
    email = CharField(max_length=50)
    password = CharField(max_length=50)
    phone = CharField(max_length=11)

bd.connect()
bd.create_tables([Personal])
bd.close()